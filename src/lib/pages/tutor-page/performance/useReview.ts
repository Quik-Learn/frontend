import React, { useEffect, useState } from 'react';

import { useLazyGetRatingsQuery } from '~/lib/services/tutor-mutation';

const useReviews = () => {
  const [ratingsData, setRatingsData] = useState<any>();

  const [triggerRatings, ratingsDetails] = useLazyGetRatingsQuery();

  useEffect(() => {
    triggerRatings({});
  }, []);

  useEffect(() => {
    if (ratingsDetails.isSuccess) {
      setRatingsData(ratingsDetails?.data?.data);
    }
  }, [ratingsDetails.isSuccess]);

  return {
    ratingsData,

    ratingsLoading: ratingsDetails.isLoading,
  };
};

export default useReviews;
