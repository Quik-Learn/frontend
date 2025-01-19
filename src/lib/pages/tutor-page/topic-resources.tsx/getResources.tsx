import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  useLazyGetResourcesQuery,
  useCreateResourceMutation,
} from '~/lib/services/tutor-mutation';

const useGetResources = (id: string) => {
  const [resources, setResources] = useState([]);
  const [topic, setTopic] = useState('');
  const toast = useToast();
  const [trigger, { isLoading, isSuccess, data, isError, error }] =
    useLazyGetResourcesQuery();
  const [
    createResource,
    {
      isLoading: createLoading,
      isSuccess: createSuccess,
      isError: isCreateError,
      error: createError,
    },
  ] = useCreateResourceMutation();
  const uploadResources = (body: any) => {
    createResource({ body, id });
  };
  useEffect(() => {
    trigger(id);
  }, [id]);
  useEffect(() => {
    if (isSuccess) {
      setResources(data?.data);
      setTopic(data?.topic);
    }
    if (isError) {
      toast({
        title: 'Error!',
        //@ts-ignore
        description: error?.data?.error?.message || 'An error occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [data]);
  useEffect(() => {
    if (createSuccess) {
      toast({
        title: 'Resource created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      trigger(id);
    }
    if (isCreateError) {
      toast({
        title: 'Error!',
        //@ts-ignore
        description: createError?.data?.error?.message || 'An error occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [createSuccess, createError, isCreateError]);
  return {
    resources,
    isLoading,
    topic,
    createResource: uploadResources,
    createLoading,
    isSuccess: createSuccess,
  };
};

export default useGetResources;
