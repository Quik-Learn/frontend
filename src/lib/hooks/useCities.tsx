import { useEffect, useState } from 'react';
import { useLazyGetCitiesQuery } from '../services/user-service';

const useGetCities = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [getCities, { isSuccess, data, isLoading, error }] =
    useLazyGetCitiesQuery();

  useEffect(() => {
    getCities({});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setCities(data?.data);
    }
  }, [isSuccess, data]);
  return { cities, isLoading };
};
export default useGetCities;
