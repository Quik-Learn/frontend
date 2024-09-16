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
                  bg={'#FBA333'}
                  mb={2}
                  fontSize={10}
                  p={3}
                  fontWeight={400}
                  textTransform={'capitalize'}
                >
                  {card.category}
                </Badge>

                <Heading
                  as="h3"
                  size="md"
                  mb={2}
                  color={'#5F5F5F'}
                  _hover={{ textDecoration: 'underline' }}
                >
                  {card.title}
                </Heading>

                <Text color="#242424" fontSize="sm" noOfLines={2} mb={4}>
                  {card.description}
                </Text>

                <HStack justify="space-between" mt={10}>
                  <Text fontSize="sm" color="#515151">
                    {card.date}
                  </Text>
                  <Text fontSize="sm" color="#515151">
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
