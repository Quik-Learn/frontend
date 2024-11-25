import {
  Avatar,
  VStack,
  HStack,
  Select,
  Heading,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import React from 'react';

const Reviews = () => {
  const dummyReviews = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      comment:
        'This course was excellent! The instructor explained everything clearly and the content was very comprehensive.',
      image: null,
    },
    {
      id: 2,
      name: 'Sarah Smith',
      rating: 4,
      comment:
        'Great course overall. Would have liked more practical examples but the theory was well explained.',
      image: null,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rating: 5,
      comment:
        "One of the best online courses I've taken. The instructor was very knowledgeable and engaging.",
      image: null,
    },
  ];

  const ratingOptions = [5, 4, 3, 2, 1].map((rating) => ({
    value: rating.toString(),
    label: `${rating} Star${rating === 1 ? '' : 's'}`,
  }));

  return (
    <VStack spacing={6} align="stretch" w="100%">
      <HStack justify="space-between" align="center">
        <Heading size="lg">Student Reviews</Heading>
        <Select maxW="200px" placeholder="Filter by rating">
          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </HStack>

      <VStack spacing={6} align="stretch">
        {dummyReviews.map((review) => (
          <HStack key={review.id} spacing={4} p={4} borderRadius="lg">
            <Avatar
              name={review.name}
              src={review.image || undefined}
              size="md"
            />
            <VStack align="flex-start" flex={1}>
              <HStack>
                <Text fontWeight="bold">{review.name}</Text>
                <Text color="#6E7485">3 weeks ago</Text>
              </HStack>

              <HStack spacing={1}>
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    as={FaStar}
                    color={index < review.rating ? 'yellow.400' : 'gray.200'}
                  />
                ))}
              </HStack>
              <Text color="gray.600">{review.comment}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Reviews;
