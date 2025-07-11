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

const Reviews = ({ id }: any) => {
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetSubjectReviewsQuery();
  const [reviews, setReviews] = useState<any>([]);
  const toast = useToast();
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

  useEffect(() => {
    trigger(id);
  }, [id]);
  console.log(data?.data, 'dataYY');
  useEffect(() => {
    if (isSuccess) {
      setReviews(data?.data);
      console.log(data, 'dataYY');
    } else if (isError) {
      toast({
        //@ts-ignore
        title: error?.data?.error?.message || 'An error occurred',
        description: 'An Error occurred.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess]);

  return (
    <VStack spacing={6} align="stretch" w="100%">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
          {reviews.length === 0 ? (
            <Text>No reviews found</Text>
          ) : (
            <VStack spacing={6} align="stretch">
              {reviews.map((review: any) => (
                <HStack key={review.id} spacing={4} p={4} borderRadius="lg">
                  <Avatar
                    name={review?.student || 'N/A'}
                    src={review?.image || undefined}
                    size="md"
                  />
                  <VStack align="flex-start" flex={1}>
                    <HStack>
                      <Text fontWeight="bold">{review.name}</Text>
                      <Text color="#6E7485">
                        {moment(review?.created_at).utc().fromNow()}
                      </Text>
                    </HStack>

                    <HStack spacing={1}>
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={index}
                          as={FaStar}
                          color={
                            index < review?.rating ? 'yellow.400' : 'gray.200'
                          }
                        />
                      ))}
                    </HStack>
                    <Text color="gray.600">{review?.review}</Text>
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

export default Reviews;
