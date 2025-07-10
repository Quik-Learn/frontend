import {
  Avatar,
  VStack,
  HStack,
  Select,
  Heading,
  Text,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useLazyGetSubjectReviewsQuery } from '~/lib/services/student-mutation';
import Loader from './Loader';
import moment from 'moment';

const TutorReviews = ({ reviews, isLoading }: any) => {
  const ratingOptions = [5, 4, 3, 2, 1].map((rating) => ({
    value: rating.toString(),
    label: `${rating} Star${rating === 1 ? '' : 's'}`,
  }));
  console.log(reviews, 'reviews');
  return (
    <VStack spacing={6} align="stretch" w="100%">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HStack justify="space-between" align="center">
            <Heading size="lg">Your Reviews</Heading>
            <Select maxW="200px" placeholder="Filter by rating">
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </HStack>
          {reviews.length === 0 ? (
            <Text>No reviews found</Text>
          ) : (
            <VStack spacing={6} align="stretch">
              {reviews.map((review: any) => (
                <HStack key={review.id} spacing={4} p={4} borderRadius="lg">
                  <Avatar
                    name={review?.name || 'N/A'}
                    src={review?.image || undefined}
                    size="md"
                  />
                  <VStack align="flex-start" flex={1}>
                    <HStack>
                      <Text fontWeight="bold">{review.name}</Text>
                      <Text color="#6E7485">
                        {moment(review.created_at).fromNow()}
                      </Text>
                    </HStack>

                    <HStack spacing={1}>
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={index}
                          as={FaStar}
                          color={
                            index < review.rating ? 'yellow.400' : 'gray.200'
                          }
                        />
                      ))}
                    </HStack>
                    <Text color="gray.600">{review.review}</Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          )}
        </>
      )}
    </VStack>
  );
};

export default TutorReviews;
