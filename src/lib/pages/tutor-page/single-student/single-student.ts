import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { sortEventsByDateTime } from '~/lib/helpers/paths';
import {
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useEditSessionMutation,
  useLazyGetStudentSessionsQuery,
} from '~/lib/services/tutor-mutation';

const useSingleStudent = (
  id: string,
  onClose: () => void,
  onEditClose: () => void
) => {
  const [sessions, setSessions] = useState<any>([]);
  const toast = useToast();
  const [trigger, { data, isLoading, error, isSuccess, isError }] =
    useLazyGetStudentSessionsQuery();
  const [
    createSession,
    {
      isLoading: createSessionLoading,
      isSuccess: isCreateSessionSuccess,
      isError: isCreateSessionError,
      error: createSessionError,
    },
  ] = useCreateSessionMutation();
  const [
    editSession,
    {
      isLoading: editSessionLoading,
      isSuccess: isEditSessionSuccess,
      isError: isEditSessionError,
      error: editSessionError,
    },
  ] = useEditSessionMutation();
  const [
    deleteSession,
    {
      isLoading: deleteSessionLoading,
      isSuccess: isDeleteSessionSuccess,
      isError: isDeleteSessionError,
      error: deleteSessionError,
    },
  ] = useDeleteSessionMutation();
  useEffect(() => {
    trigger(id);
  }, [id]);
  useEffect(() => {
    if (isSuccess) {
      const sortedEvents = sortEventsByDateTime(data?.data);
      setSessions(sortedEvents);
      onEditClose();
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
  }, [isSuccess, data, isError, error]);
  useEffect(() => {
    if (isCreateSessionSuccess) {
      onClose();
      toast({
        title: 'Success!',
        description: 'Session created successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      trigger(id);
    }
    if (isCreateSessionError) {
      toast({
        title: 'Error!',
        description:
          //@ts-ignore
          createSessionError?.data?.error?.message || 'An error occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isCreateSessionSuccess, createSessionError, isCreateSessionError]);
  useEffect(() => {
    if (isEditSessionSuccess) {
      toast({
        title: 'Success!',
        description: 'Session edited successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      trigger(id);
    }
    if (isEditSessionError) {
      toast({
        title: 'Error!',
        description:
          //@ts-ignore
          editSessionError?.data?.error?.message || 'An error occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isEditSessionSuccess, editSessionError, isEditSessionError]);
  useEffect(() => {
    if (isDeleteSessionSuccess) {
      toast({
        title: 'Success!',
        description: 'Session deleted successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      trigger(id);
    }
    if (isDeleteSessionError) {
      toast({
        title: 'Error!',
        description:
          //@ts-ignore
          deleteSessionError?.data?.error?.message || 'An error occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isDeleteSessionSuccess, deleteSessionError, isDeleteSessionError]);
  return {
    sessions,
    isLoading,
    createSession,
    createSessionLoading,
    editSession,
    editSessionLoading,
    deleteSession,
    deleteSessionLoading,
  };
};

export default useSingleStudent;
