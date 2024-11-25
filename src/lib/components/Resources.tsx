import { SimpleGrid, VStack, Box, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { TbFileSearch } from 'react-icons/tb';

const Resources = () => {
  return (
    <VStack spacing={8} align="stretch" w="100%">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <VStack key={item} spacing={3} align="center">
            <Box
              as="button"
              p={2}
              bg="gray.100"
              borderRadius="lg"
              _hover={{ bg: 'gray.200' }}
              onClick={() => window.open('#', '_blank')}
              cursor="pointer"
              w="100%"
              aspectRatio={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={TbFileSearch} boxSize={50} color="#9E9E9E" />
            </Box>
            <Text fontSize="sm" color="gray.700" fontWeight="medium">
              Resource Document {item}.pdf
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Resources;
