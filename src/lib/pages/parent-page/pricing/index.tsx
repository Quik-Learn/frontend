'use client';

import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';

import { IoMdCheckmark } from 'react-icons/io';

import { LiaWindowCloseSolid } from 'react-icons/lia';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useSubscribeMutation,
  useGetAllPlansQuery,
} from '~/lib/services/parent-mutation';
import ParentContainer from '~/lib/layout/ParentContainer';
import { pricingData } from '~/lib/utils/nav';
interface Props {
  children: React.ReactNode;
}

function PriceWrapper({ children, bgColor }: any) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderRadius={'xl'}
      bg={bgColor}
      borderColor={bgColor}
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  );
}
export default function Pricing() {
  const toast = useToast();
  const [plans, setPlans] = useState<any>([]);
  const [subscribe, { data, isSuccess, isError, error, reset }] =
    useSubscribeMutation();

  const searchParams = useSearchParams();
  const ward_id = searchParams.get('ward_id');

  const plansData = useGetAllPlansQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      window.open(data?.data?.payment_url);
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.error?.message || error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (plansData?.data?.data) {
      setPlans(plansData?.data?.data);
    }
  }, [plansData?.data?.data]);

  return (
    <ParentContainer>
      <Box
        py={{ lg: 70 }}
        fontFamily="heading"
        bg="#F9F9F9"
        minH={'100vh'}
        padding={{ base: 5, md: 10, lg: 20 }}
      >
        <VStack spacing={2} textAlign="center" pt={5} pb={{ base: 10, lg: 20 }}>
          <Heading
            fontSize={{
              base: 25,
              sm: 25,
              md: 51,
            }}
            color="#000000"
            fontFamily="heading"
            fontWeight="600"
            textAlign="center"
          >
            Our Pricing
          </Heading>
          {/* <Text color="black" textAlign="center" w={{ md: '50%' }}>
          Transparent pricing for quality education. Choose the plan that suits
          your needs and start your academic journey.
        </Text> */}
        </VStack>
        {/* <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      > */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
          spacing={10}
          alignItems="center"
        >
          {plans.map((tier: any, index: number) => {
            return (
              <PriceWrapper
                key={index}
                bgColor={
                  index === 1 ? '#F2F2F2' : index === 2 ? '#FBA333' : '#FFFFFF'
                }
              >
                <Box
                  position="relative"
                  color={
                    index === 1 ? 'black' : index === 2 ? 'white' : 'black'
                  }
                >
                  <Box
                    py={4}
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Text
                      fontWeight="700"
                      fontSize={{ base: 24, sm: 28, md: 35, lg: 40 }}
                      my={3}
                      fontFamily="heading"
                    >
                      {tier?.name}
                    </Text>
                    <HStack
                      justifyContent="center"
                      bg="#FFFBE9"
                      flex={0}
                      p={4}
                      height={47}
                      borderRadius={7}
                      borderWidth={0.5}
                      borderColor="#FBA333"
                    >
                      <Text
                        fontSize={{ base: 18, sm: 20, md: 23, lg: 25 }}
                        fontWeight="600"
                        color="#0A52A8"
                        fontFamily="Inter"
                      >
                        ₦{tier?.amount}/
                      </Text>
                      <Text
                        fontSize={{ base: 12, sm: 12, md: 14, lg: 14 }}
                        color="black"
                        fontFamily="heading"
                      >
                        {tier.duration}
                      </Text>
                    </HStack>
                  </Box>
                  <VStack py={6} borderBottomRadius={'xl'}>
                    <Text
                      fontWeight="500"
                      fontSize={{ base: 14, sm: 14, md: 16, lg: 16 }}
                      textAlign="start"
                      fontFamily="heading"
                      display="flex"
                    >
                      Available Features
                    </Text>
                    <List spacing={3} textAlign="start" px={12}>
                      {pricingData[index]?.features?.map(
                        (feature: any, idx: any) => (
                          <ListItem
                            key={idx}
                            fontFamily="heading"
                            fontSize={{ base: 12, sm: 12, md: 14, lg: 18 }}
                          >
                            <ListIcon
                              as={
                                feature.available
                                  ? IoMdCheckmark
                                  : LiaWindowCloseSolid
                              }
                              bg={feature.available ? '#FFD599' : 'transparent'}
                              color="#000"
                              fontSize={{ base: 12, sm: 12, md: 14, lg: 18 }}
                            />
                            {feature.feature}
                          </ListItem>
                        )
                      )}
                    </List>
                    <Box w="80%" pt={7}>
                      <Button
                        w="full"
                        mb={4}
                        bg={
                          index === 1
                            ? '#0A52A8'
                            : index === 2
                              ? 'white'
                              : '#0A52A8'
                        }
                        color={
                          index === 1
                            ? 'white'
                            : index === 2
                              ? '#0A52A8'
                              : 'white'
                        }
                        onClick={() =>
                          subscribe({ ward_id, plan_id: tier?.id })
                        }
                        variant={'solid'}
                      >
                        Get Started
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              </PriceWrapper>
            );
          })}
        </SimpleGrid>
      </Box>
    </ParentContainer>
  );
}
