import {
  HStack,
  VStack,
  Text,
  Select,
  Flex,
  Icon,
  Box,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { FaComment, FaShoppingCart, FaStar } from 'react-icons/fa';

const RecentActivity = ({ activitiesData }: { activitiesData: any }) => {
  const data = [
    {
      id: 1,
      icon: <FaComment />,
      user: 'Kevin',
      action: 'comments on your lecture',
      lecture: 'What is ux',
      course: '2021 ui/ux design with figma',
      time: 'Just now',
    },
    {
      id: 2,
      icon: <FaStar />,
      user: 'John',
      action: 'give a 5 star rating on your course',
      course: '2021 ui/ux design with figma',
      time: '5 mins ago',
    },
    {
      id: 3,
      icon: <FaShoppingCart />,
      user: 'Sraboni',
      action: 'purchase your course',
      course: '2021 ui/ux design with figma',
      time: '6 mins ago',
    },
    {
      id: 4,
      icon: <FaShoppingCart />,
      user: 'Arif',
      action: 'purchase your course',
      course: '2021 ui/ux design with figma',
      time: '7 mins ago',
    },
  ];
  return (
    <VStack bg={'#fff'} w={'100%'}>
      <HStack
        paddingX={'16px'}
        w={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={'1px'}
        borderColor={'#E9EAF0'}
      >
        <Text color={'#1D2026'} fontSize={16} fontWeight={500}>
          Recent Activity
        </Text>
        <Select
          w={'150px'}
          placeholder="Today"
          color="#6E7485"
          _placeholder={{
            color: '#6E7485',
            fontWeight: '400',
            fontSize: 12,
          }}
        >
          <option>Today</option>
          <option>This week</option>
          <option>This month</option>
          <option>This year</option>
        </Select>
      </HStack>

      <Stack w={'100%'} minH={'320px'}>
        {activitiesData?.length === 0 ? (
          <Stack
            w={'100%'}
            h={'250px'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text
              color={'#1D2026'}
              fontWeight={500}
              textAlign={'center'}
              fontSize={'3xl'}
            >
              No Recent Activity
            </Text>
            <Text color={'#6E7485'} fontSize={12}>
              You will see your recent activity here
            </Text>
          </Stack>
        ) : (
          <>
            {activitiesData?.map((item: any) => (
              <Flex
                key={item.id}
                alignItems="flex-start"
                justifyContent={'flex-start'}
                mb="3"
                gap={3}
              >
                <IconButton
                  aria-label="icon"
                  icon={item.icon}
                  borderRadius={'50%'}
                  w={'32px'}
                  h={'32px'}
                  bg="#FF6636"
                  color={'#fff'}
                />
                <Box>
                  <Text fontSize="sm" color={'#1D2026'}>
                    <Text as="span" fontWeight="bold">
                      {item.user?.first_name} {item.user?.last_name}
                    </Text>{' '}
                    {item.action}{' '}
                    <Text as="span" fontWeight="bold">
                      {item.activity_type && `${item.activity_type}`}
                    </Text>{' '}
                    in{' '}
                    <Text as="span" fontWeight="bold">
                      {item.description}
                    </Text>
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {moment(item.created_at).format('DD MMMM YYYY')}
                  </Text>
                </Box>
              </Flex>
            ))}
          </>
        )}
      </Stack>
    </VStack>
  );
};

export default RecentActivity;
