import {
  Heading,
  HStack,
  Select,
  VStack,
  Image,
  Text,
  Box,
  Stack,
  Avatar,
} from '@chakra-ui/react';
import React from 'react';
import Rating from './Rating';
import { timeAgo } from '../helpers/paths';

const Review = ({ ratings }: any) => {
  const reviewArray = [
    {
      id: 1,
      name: 'Guy Hawkins',
      desc: 'I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.',
      duration: '1 week ago',
      rating: 4,
    },
    {
      id: 2,
      name: 'Dianne Russell',
      desc: 'This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgable and I was never getting bored throughout the course. This course meets more than my expectation and, I made the best investment of time to learn and practice what I am passionate about. Thank you so much to our excellent instructor Vako!! Highly recommend this course! Take the next step..',
      duration: '51 mins ago',
      rating: 5,
    },
    {
      id: 3,
      name: 'Bessie Cooper',
      desc: 'Webflow course was good, it coves design secrtes, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Vako.',
      duration: '51 mins ago',
      rating: 5,
    },
    {
      id: 4,
      name: 'Eleanor Pena',
      desc: 'I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.',
      duration: '51 mins ago',
      rating: 5,
    },
  ];
  return (
    <Box>
      <HStack alignItems={'center'} justifyContent={'space-between'} mb={4}>
        <Heading fontWeight={500} fontSize={14} color={'#1D2026'}>
          Students Feedback
        </Heading>
        <VStack>
          {/* <Text>Mode</Text> */}
          <Select color={'#4E5566'} placeholder="Mode" bg="#fff">
            <option color={'#4E5566'} value="anytime">
              5 Star Rating
            </option>
          </Select>
        </VStack>
      </HStack>
      <Stack>
        {ratings?.map((item: any, index: number) => (
          <HStack
            key={index}
            gap={4}
            justifyContent={'flex-start'}
            mb={4}
            flex={0}
          >
            <Avatar
              src={item?.reviewer?.profile_image}
              name={`${item?.reviewer?.firstname} ${item?.reviewer?.lastname}`}
              color={'white'}
            />
            <VStack
              gap={2}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
            >
              <HStack>
                <Text color={'#1D2026'} fontSize={15} fontWeight={500}>
                  {item?.reviewer?.firstname} {item?.reviewer?.lastname}
                </Text>
                <Text color={'#6E7485'} fontSize={15} fontWeight={500}>
                  {timeAgo(item?.created_at)}
                </Text>
              </HStack>
              <Rating rate={item?.rating} />
              <Stack>
                <Text color={'#4E5566'} fontSize={14} whiteSpace="normal">
                  {item?.review}
                </Text>
              </Stack>
            </VStack>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
};

export default Review;
