import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useOnboardStudentMutation } from '~/lib/services/student-mutation';
import { useGetSubjectsQuery } from '~/lib/services/user-service';

export const useSetSubjectHook = () => {
  const toast = useToast();
  const router = useRouter();
  const [filterText, setFilterText] = useState('');
  const [filteredSubject, setFilteredSubject] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { data, isSuccess, isError, error, isLoading } = useGetSubjectsQuery(
    null,
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const [onboardStudent, onboardStudentDetails] = useOnboardStudentMutation();
  const filterSubjects = useCallback(
    (filterText: string) => {
      const result = subjects?.filter((item: any) =>
        item?.name?.toLowerCase().includes(filterText?.toLowerCase())
      );
      console.log(result);
      setFilteredSubject(result);
    },
    [subjects]
  );
  useEffect(() => {
    if (filterText) {
      filterSubjects(filterText);
    }
  }, [filterText]);

  useEffect(() => {
    if (isSuccess) {
      setSubjects(data?.data);
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occured!',
        description: 'Try Again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      console.log(data);
    }
  }, [isError, error, data?.data, isSuccess]);
  useEffect(() => {
    const { data, isSuccess, isError, error, reset } = onboardStudentDetails;
    if (isSuccess) {
      toast({
        //@ts-ignore
        title: data?.message || 'Details submitted succesfully',
        description:
          'Successfully updated you details, proceed to the dashboard.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      router.push('/student');
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occured!',
        description: 'Try Again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [onboardStudentDetails, router]);

  return {
    data: filteredSubject,
    isLoading,
    setFilterText,
    filterText,
    onboardStudent,
    isStudentLoading: onboardStudentDetails?.isLoading,
  };
};
