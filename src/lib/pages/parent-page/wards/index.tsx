'use client';

import {
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { AddRegistered, AddWard, NewWard } from '~/lib/components/AddWard';
import AddWardComponent from '~/lib/components/AddWardComponent';
import Button from '~/lib/components/ui/button';
import ParentContainer from '~/lib/layout/ParentContainer';
import { useGetWardsQuery } from '~/lib/services/parent-mutation';

const data = [
  { id: 1, name: 'Joseph Doe', class: 'K6', img: '/images/ward.svg' },
  { id: 2, name: 'Simisola James', class: 'K8', img: '/images/ward-2.svg' },
];

const Wards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [wardData, setWardData] = useState<any>([]);
  const {
    data: wards,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetWardsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setWardData(wards?.data);
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
  }, [isSuccess, wards, isError, error]);

  const [neww, setNew] = useState('');

  return (
    <ParentContainer>
      {wardData.length === 0 ? (
        <VStack
          w={'100%'}
          h={'80%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <VStack w={'60%'} alignSelf={'center'} spacing={10}>
            <Text
              color={'#5F5F5F'}
              fontSize={'48px'}
              fontWeight={700}
              textAlign={'center'}
            >
              You Currently have no Ward Register
            </Text>
            <Button
              width={{ lg: 386 }}
              text="Add a Ward "
              bg="#0A52A8"
              onClick={() => {
                setNew('');
                onOpen();
              }}
            />
          </VStack>
        </VStack>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} my={6} px={6}>
          {/* Welcome Section */}
          <GridItem
            colSpan={[3, 2, 1]}
            // w={{lg: 410}}
            h={{ lg: 500 }}
            bg={'#fff'}
            borderRadius={29}
            boxShadow={'base'}
            display={'flex'}
            onClick={() => {
              setNew('');
              onOpen();
            }}
            flexDirection={'column'}
            justifyContent={'space-around'}
            padding={5}
            alignItems={'center'}
          >
            <Text></Text>
            <Image src="/images/add.svg" alt="add" />
            <Text color="#5F5F5F" fontSize={24} fontWeight={500}>
              Add Ward
            </Text>
          </GridItem>

          {wardData?.map((item: any) => (
            <GridItem
              key={item.id}
              colSpan={[3, 2, 1]}
              // w={{lg: 410}}
              h={{ lg: 500 }}
              bg={'#fff'}
              borderRadius={29}
              minH={300}
              padding={5}
              boxShadow={'base'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-around'}
              alignItems={'center'}
              onClick={() => {}}
            >
              <Avatar
                src={item?.user?.image}
                name={`${item?.user?.firstname} ${item?.user?.lastname}`}
              />
              <VStack>
                <Text color="#272727" fontSize={20} fontWeight={700}>
                  {item?.user?.firstname} {item?.user?.lastname}
                </Text>
                <Text color="#272727" fontSize={20} fontWeight={700}>
                  {item.class}
                </Text>
              </VStack>

              <Button
                border="#0A52A8"
                color="#0A52A8"
                text="Manage"
                variant="outline"
                onClick={() => router.push('/parent/subscription')}
              />
            </GridItem>
          ))}
        </Grid>
      )}
      <AddWardComponent
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        neww={neww}
        setNew={setNew}
        wards={wardData}
      />
    </ParentContainer>
  );
};

export default Wards;
