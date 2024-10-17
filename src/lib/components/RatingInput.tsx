import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const RatingInput = ({
  rate,
  handleClick,
}: {
  rate: number;
  handleClick: (index: number) => void;
}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rate * 2) / 2;
          return (
            <Box
              as="span"
              key={i}
              onClick={() => handleClick(i + 1)} // Set rating to the clicked star index
              cursor="pointer" // Add pointer cursor to indicate clickable stars
            >
              {roundedRating - i >= 1 ? (
                <BsStarFill
                  style={{ marginLeft: '1' }}
                  color="#E9AB2B"
                  size={16}
                />
              ) : roundedRating - i === 0.5 ? (
                <BsStarHalf
                  style={{ marginLeft: '1' }}
                  color="#E9AB2B"
                  size={16}
                />
              ) : (
                <BsStar
                  style={{ marginLeft: '1' }}
                  color="#ccc" // Empty stars should be greyed out
                  size={16}
                />
              )}
            </Box>
          );
        })}
    </Box>
  );
};

export default RatingInput;
