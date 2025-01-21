'use client';

import {
  Grid,
  HStack,
  GridItem,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Avatar,
  Image,
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
import { GetServerSideProps } from 'next';
import { requireAuthentication } from '~/lib/helpers/auth';
import { usePastSessions } from '~/lib/hooks/usePastSession';
import { Session } from '~/lib/types/data';

const MySessions = () => {
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { pastSessions, isLoading: isSessionsLoading } = usePastSessions();
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
        EventsComponent={(props) => {
          console.log('propsevent', props)
          return <Events
         event={props.event}
            isOpen={isOpen}
            onClose={onClose}
       
          />}
        }
        ToolbarComponent={(props) => <StudentTool router={router} {...props} />}
      />
      <Text color={'black'} m={6} fontSize={'26px'} fontWeight={500}>
        Previous Sessions
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} p={6}>
        {pastSessions?.map((session: Session) => (
          <GridItem
            key={session.id}
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="md"
          >
            <HStack spacing={4}>
              <Image
                src={session.subject?.thumbnail}
                alt={session.subject?.title}
                boxSize="60px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="flex-start" spacing={2}>
                <Text fontWeight="bold" fontSize="lg">
                  {session.title}
                </Text>
                <HStack spacing={2}>
                  <Avatar
                    size="sm"
                    name={session.instructor.name}
                    src={session.instructor.name}
                  />
                  <Text fontSize="sm" color="gray.600">
                    {session.instructor.name}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </GridItem>
        ))}
      </Grid>
    </ParentContainer>
  );
};

export default MySessions;
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);
