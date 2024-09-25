import { Box } from '@chakra-ui/react';
import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const Rating = ({ rate }: { rate: number }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rate * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rate ? '#E9AB2B' : '#fff'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return (
              <BsStarHalf
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rate ? '#E9AB2B' : '#fff'}
              />
            );
          }
          return (
            <BsStar
              key={i}
              style={{ marginLeft: '1' }}
              color={i < rate ? '#E9AB2B' : '#E9AB2B'}
            />
          );
        })}
    </Box>
  );
};

export default Rating;
