'use client';

import React from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { cardsData } from '~/lib/utils/nav';
import ParentContainer from '~/lib/layout/ParentContainer';

const Resources = () => {
  return (
    <ParentContainer>
      <Box p={8} bg="gray.50" minH="100vh">
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {cardsData.map((card) => (
            <Box
              key={card.id}
              borderRadius="lg"
              boxShadow="md"
              overflow="hidden"
              bg="white"
            >
              <Image
                src={card.image}
                alt={card.title}
                w="100%"
                h="200px"
                objectFit="cover"
              />

              <Box p={4}>
                <Badge
                  colorScheme={card.category === 'Guide' ? 'blue' : 'orange'}
                  mb={2}
                >
                  {card.category}
                </Badge>

                <Heading
                  as="h3"
                  size="md"
                  mb={2}
                  _hover={{ textDecoration: 'underline' }}
                >
                  {card.title}
                </Heading>

                <Text color="gray.600" fontSize="sm" noOfLines={2} mb={4}>
                  {card.description}
                </Text>

                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.500">
                    {card.date}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {card.readTime}
                  </Text>
                </HStack>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </ParentContainer>
  );
};

export default Resources;
