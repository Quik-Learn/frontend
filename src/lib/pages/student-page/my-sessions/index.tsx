'use client';

import { Text, useToast } from '@chakra-ui/react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useRouter } from 'next/navigation';
import CalenderComponent from '~/lib/components/CalenderComponent';
import {
  useLazyGetStudentCalenderQuery,
  useLazyGetStudentSessionQuery,
} from '~/lib/services/student-mutation';
import { useEffect, useState } from 'react';
import { formatData } from '~/lib/helpers/paths';

const MySessions = () => {
  const router = useRouter();
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetStudentCalenderQuery();
  useEffect(() => {
    if (isSuccess) {
      setEvents(formatData(data?.data));
      console.log(data?.data, formatData(data?.data));
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess, data, isError]);
  useEffect(() => {
    trigger({});
  }, []);

  return (
    <ParentContainer>
      <Text color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
        My Sessions
      </Text>

      <CalenderComponent events={events} />
    </ParentContainer>
  );
};

export default MySessions;
