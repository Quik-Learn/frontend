'use client';

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { addRandomSoftColorsToEvents, formatData } from '~/lib/helpers/paths';
import moment from 'moment';
import Events from '~/lib/components/Events';
import TutorTool from '~/lib/components/TutorTool';
import TutorContainer from '~/lib/layout/TutorContainer';
import useSessionsHook from './sessions.hook';
import ScheduleModal from '~/lib/components/ScheduleModal';
import StudentsHook from '../student/students.hook';
import CalenderComponent from '~/lib/components/CalenderComponent';

const Sessions = () => {
  const toast = useToast();
  const { students, isLoading: isStudentLoading, getStudents } = StudentsHook();
  const [availability, setAvailability] = useState<any>([
    {
      time: 'Pre 12pm',
      availability: [false, false, false, false, false, false, false],
    },
    {
      time: '12 - 5pm',
      availability: [false, false, false, false, false, false, false],
    },
    {
      time: 'After 5pm',
      availability: [false, false, false, false, false, false, false],
    },
  ]);
  const { isLoading, sessionsData, triggerSessions } = useSessionsHook();
  const [range, setRange] = useState<{ start: any; end: any }>({
    start: moment().startOf('week').toDate(),
    end: moment().endOf('week').toDate(),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSchedule,
    onOpen: onOpenSchedule,
    onClose: onCloseSchedule,
  } = useDisclosure();
  console.log(range);
  // Fetch sessions when the range changes
  useEffect(() => {
    if (range?.start && range?.end) {
      const params = {
        start_date: moment(range?.start).format('YYYY-MM-DD'),
        end_date: moment(range?.end).format('YYYY-MM-DD'),
      };
      triggerSessions(params);
    }
  }, [range]);

  return (
    <TutorContainer>
      <Text color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
        My Sessions
      </Text>

      <CalenderComponent
        events={sessionsData}
        onOpen={onOpen}
        setRange={setRange}
        EventsComponent={(props) => (
          <Events
            {...props}
            trigger={triggerSessions}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
        ToolbarComponent={(props) => (
          <TutorTool onOpenSchedule={onOpenSchedule} {...props} />
        )}
      />
      <Heading
        px={4}
        color={'#1D2026'}
        fontWeight={600}
        fontSize={'20px'}
        mb={5}
      >
        Students
      </Heading>
      {isStudentLoading ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(5, 1fr)',
          }}
          px={4}
        >
          {['', '', '', '']?.map((item) => (
            <Skeleton w={'50px'} h={'50px'} borderRadius={'5px'} />
          ))}
        </Grid>
      ) : (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            xl: 'repeat(5, 1fr)',
          }}
          px={4}
        >
          {addRandomSoftColorsToEvents(students)?.map((item: any) => (
            <GridItem
              key={item?.id}
              justifyItems={'center'}
              alignItems={'center'}
              display={'flex'}
              gap={2}
            >
              <Box bg={item.color} w={'50px'} h={'50px'} borderRadius={'5px'} />
              <Text color={'#5F5F5F'} fontSize={['14px', '16px', '18px']}>
                {item?.student?.firstname} {item?.student?.lastname}
              </Text>
            </GridItem>
          ))}
        </Grid>
      )}
      <ScheduleModal
        isOpen={isOpenSchedule}
        onClose={onCloseSchedule}
        availability={availability}
        setAvailability={setAvailability}
      />
    </TutorContainer>
  );
};

export default Sessions;
