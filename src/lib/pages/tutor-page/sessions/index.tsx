'use client';

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useRouter, useSearchParams } from 'next/navigation';
import CalenderComponent from '~/lib/components/CalenderComponent';
import {
  useLazyGetStudentCalenderQuery,
  useLazyGetStudentSessionQuery,
  useLeaveMeetingMutation,
} from '~/lib/services/student-mutation';
import { useEffect, useState } from 'react';
import { formatData } from '~/lib/helpers/paths';
import moment from 'moment';
import { useAppSelector } from '~/lib/store';
import { meetingIdState } from '~/lib/store/reducers/meeting-id-slice';
import Events from '~/lib/components/Events';
import StudentTool from '~/lib/components/StudentTool';
import TutorTool from '~/lib/components/TutorTool';
const students = [
  { id: 1, name: 'Emily Adams' },
  { id: 2, name: 'James Anderson' },
  { id: 3, name: 'Matthew Armstrong' },
  { id: 4, name: 'Aiden Atkinson' },
  { id: 5, name: 'Natalie Brooks' },
];
const Sessions = () => {
  const toast = useToast();
  const [events, setEvents] = useState([]);

  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetStudentSessionQuery();
  const [range, setRange] = useState<{ start: any; end: any }>({
    start: moment().startOf('week').toDate(),
    end: moment().endOf('week').toDate(),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        onOpen={onOpen}
        setRange={setRange}
        EventsComponent={(props) => (
          <Events
            {...props}
            trigger={trigger}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
        ToolbarComponent={(props) => <TutorTool {...props} />}
      />
      <Heading color={'#1D2026'} fontWeight={600} fontSize={'20px'} mb={10}>
        Students
      </Heading>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
      >
        {students?.map((item) => (
          <GridItem
            key={item.id}
            justifyItems={'center'}
            alignItems={'center'}
            display={'flex'}
          >
            <Box w={'50px'} h={'50px'} borderRadius={'5px'} />
            <Text color={'#5F5F5F'} fontSize={'20px'}>
              {item.name}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </ParentContainer>
  );
};

export default Sessions;
