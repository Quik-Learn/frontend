import React, { useState, useEffect } from 'react';
import { HStack, IconButton, Button as ChakraButton } from '@chakra-ui/react';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Pagination = ({
  totalPages = 0,
  onPageChange,
  next,
  isLoading,
  previous,
  currentPage,
}: any) => {
  const handlePreviousPage = () => {
    if (previous) {
      onPageChange(previous);

      //   onPageChange?.(newPage); // Optional callback when page changes
    }
  };

  const handleNextPage = () => {
    if (next) {
      onPageChange(next);
      // Optional callback when page changes
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };
  useEffect(() => {
    onPageChange(1);
  }, []);

  return (
    <HStack spacing={2} justifyContent={'flex-end'} p={10} w="100%">
      {/* Previous Button */}
      <IconButton
        aria-label="Previous page"
        icon={<MdKeyboardDoubleArrowLeft />}
        colorScheme="gray"
        variant="ghost"
        onClick={handlePreviousPage}
        isDisabled={!previous || isLoading}
      />

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <ChakraButton
          key={index}
          color={'white'}
          bg={index + 1 === currentPage ? '#02659C' : 'gray'}
          variant={index + 1 === currentPage ? 'solid' : 'outline'}
          onClick={() => handlePageClick(index + 1)}
          isDisabled={isLoading}
        >
          {index + 1}
        </ChakraButton>
      ))}

      {/* Next Button */}
      <IconButton
        aria-label="Next page"
        icon={<MdKeyboardDoubleArrowRight />}
        colorScheme="blue"
        variant="ghost"
        onClick={handleNextPage}
        isDisabled={!next || isLoading}
      />
    </HStack>
  );
};

export default Pagination;
