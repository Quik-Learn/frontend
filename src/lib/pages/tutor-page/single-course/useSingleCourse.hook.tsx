import { useEffect, useState } from 'react';
import {
  useCreateTopicMutation,
  useLazyGetCourseTopicsQuery,
} from '~/lib/services/tutor-mutation';
import { useToast } from '@chakra-ui/react';

const useSingleCourseHook = (id: string, callback: () => void) => {
  const toast = useToast();
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState<any>(null);
  const [getCourseTopics, { data, isLoading, isSuccess }] =
    useLazyGetCourseTopicsQuery();
  const [createTopic, createTopicData] = useCreateTopicMutation();
  useCreateTopicMutation();
  const fetchData = () => {
    getCourseTopics(id);
  };
  const createTopicFunction = (body: any) => {
    createTopic({ id, body });
  };
  useEffect(() => {
    getCourseTopics(id);
  }, [id]);

  useEffect(() => {
    const { isSuccess, isError, error, data } = createTopicData;
    if (isSuccess) {
      callback();
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
  }, [createTopicData]);

  useEffect(() => {
    if (isSuccess) {
      setCourse(data?.data);
      setSubject(data?.subject);
    }
  }, [data, isSuccess]);
  return {
    fetchData,
    course,
    isLoading,
    createTopicFunction,
    createLoading: createTopicData.isLoading,
    isSuccess,
    subject,
  };
};

export default useSingleCourseHook;
