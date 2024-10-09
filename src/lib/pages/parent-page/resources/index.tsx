'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  Badge,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { button, cardsData } from '~/lib/utils/nav';
import ParentContainer from '~/lib/layout/ParentContainer';
import Button from '~/lib/components/ui/button';
import { useLazyGetResourcesQuery } from '~/lib/services/parent-mutation';

const Resources = () => {
  const toast = useToast();
  const [resourceData, setResourceData] = useState<any>([]);
  const [trigger, { data, isLoading, isError, error, isSuccess }] =
    useLazyGetResourcesQuery();

  useEffect(() => {
    trigger({});
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(data?.data);
      setResourceData(data?.data);
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess, data, isError, error]);
  return (
    <ParentContainer>
      <Box p={8} bg="gray.50" minH="100vh" mt={5}>
        <HStack justifyContent={'center'} alignItems={'center'} gap={5}>
          {button?.map((item) => (
            <Button bg={item.color} width={145} text={item.name} />
          ))}
        </HStack>
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
          mt={8}
        >
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
                  fontSize={17}
                  p={2}
                  color={'#242424'}
                  fontWeight={400}
                  borderRadius={9}
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
