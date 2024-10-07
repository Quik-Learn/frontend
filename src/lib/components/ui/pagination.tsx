import React, { useState, useEffect } from 'react';
import { HStack, IconButton, Button as ChakraButton } from '@chakra-ui/react';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Pagination = ({
  totalPages = 10,
  onPageChange,
  next,
  isLoading,
  previous,
  refetch,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    if (previous) {
      setCurrentPage(previous);
      //   onPageChange?.(newPage); // Optional callback when page changes
    }
  };

  const handleNextPage = () => {
    if (next) {
      setCurrentPage(next);
      // Optional callback when page changes
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, []);
  useEffect(() => {
    if (currentPage) {
      onPageChange(currentPage);
    }
  }, [currentPage]);

  // Change page to a specific number
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // onPageChange?.(pageNumber); // Optional callback when page changes
  };

  return (
    <HStack spacing={2}>
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
          colorScheme={index + 1 === currentPage ? 'blue' : 'gray'}
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
