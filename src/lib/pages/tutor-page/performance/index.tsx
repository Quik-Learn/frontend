'use client';

import { HStack, Select, Skeleton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import OverallRating from '~/lib/components/OverallRating';
import Rating from '~/lib/components/Rating';
import Reviews from '~/lib/components/Reviews';
import TutorContainer from '~/lib/layout/TutorContainer';
import useReviews from './useReview';
import TutorReviews from '~/lib/components/TutorReviews';

const Performance = () => {
  const { ratingsData, ratingsLoading } = useReviews();
  console.log(ratingsData, 'ratingsData');
  return (
    <TutorContainer>
      <Stack p={{ base: 4, md: 8 }}>
        {ratingsLoading ? (
          <Skeleton height="200px" />
        ) : (
          <Stack justifyContent={'center'} alignItems={'center'}>
            <OverallRating ratingsData={ratingsData} />
          </Stack>
        )}
        <Stack height={'30px'}></Stack>
        {ratingsLoading ? (
          <Skeleton height="200px" />
        ) : (
          <TutorReviews
            isLoading={ratingsLoading}
            reviews={ratingsData?.reviews}
          />
        )}
      </Stack>
    </TutorContainer>
  );
};

export default Performance;
