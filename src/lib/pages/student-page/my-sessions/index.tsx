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
import moment from 'moment';

const MySessions = () => {
  const router = useRouter();
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetStudentSessionQuery();
  const [range, setRange] = useState<{ start: any; end: any }>({
    start: moment().startOf('week').toDate(),
    end: moment().endOf('week').toDate(),
  });
  // const [triggerSession, sessionData] = useLazyGetStudentSessionQuery();
  useEffect(() => {
    if (isSuccess) {
      setEvents(formatData(data?.data));
      console.log(data?.data, formatData(data?.data));
    }
    if (isError) {
      console.log(error);
      toast({
        //@ts-ignore
        title: error?.data?.error?.message || 'An error occured',
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
  console.log(range);
  // Fetch sessions when the range changes
  useEffect(() => {
    if (range?.start && range?.end) {
      const params = {
        start_date: moment(range?.start).format('YYYY-MM-DD'),
        end_date: moment(range?.end).format('YYYY-MM-DD'),
      };
      trigger(params);
    }
  }, [range]);

  return (
    <ParentContainer>
      <Text color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
        My Sessions
      </Text>

      <CalenderComponent
        events={events}
        trigger={trigger}
        setRange={setRange}
      />
    </ParentContainer>
  );
};

export default MySessions;
