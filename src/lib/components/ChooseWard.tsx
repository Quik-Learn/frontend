import {
  Avatar,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useGetWardsQuery } from '../services/parent-mutation';
import { useRouter } from 'next/navigation';
import Button from './ui/button';

const ChooseWard = ({ isOpen, onClose, handleSelectHandler }: any) => {
  const router = useRouter();
  const [wardData, setWardData] = useState<any>([]);
  const toast = useToast();
  const {
    data: wards,
    isLoading: wardsLoading,
    isError: isWardsError,
    error: wardsError,
    isSuccess: isWardsDuccess,
  } = useGetWardsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isWardsDuccess) {
      setWardData(wards?.data);
    }
    if (isWardsError) {
      toast({
        //@ts-ignore
        title: wardsError?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isWardsDuccess, wards, isWardsError, wardsError]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'2xl'} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a student</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {wardsLoading ? (
            <Stack
              w={'100%'}
              h={'350px'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Spinner size={'large'} />
            </Stack>
          ) : (
            <>
              {wardData?.length === 0 ? (
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
                  </VStack>
                </VStack>
              ) : (
                <Grid templateColumns="repeat(2, 1fr)" gap={6} my={6} px={6}>
                  {wardData?.map((item: any) => (
                    <GridItem
                      key={item.id}
                      colSpan={[3, 2, 1]}
                      // w={{lg: 410}}
                      h={{ lg: 300 }}
                      bg={'#fff'}
                      borderRadius={29}
                      minH={200}
                      padding={5}
                      boxShadow={'base'}
                      display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'space-around'}
                      alignItems={'center'}
                      onClick={() => {}}
                    >
                      <Avatar
                        w={'128px'}
                        h={'128px'}
                        fontSize={'md'}
                        src={item?.user?.image}
                        name={`${item?.user?.firstname} ${item?.user?.lastname}`}
                      />
                      <VStack>
                        <Text
                          color="#272727"
                          fontSize={14}
                          fontWeight={700}
                          textAlign={'center'}
                          textTransform={'capitalize'}
                        >
                          {item?.user?.firstname} {item?.user?.lastname}
                        </Text>
                        <Text color="#272727" fontSize={12} fontWeight={700}>
                          {item.class}
                        </Text>
                      </VStack>
                      <HStack>
                        <Button
                          border="#0A52A8"
                          color="#0A52A8"
                          text="Select"
                          variant="outline"
                          onClick={() => handleSelectHandler(item?.user)}
                        />
                      </HStack>
                    </GridItem>
                  ))}
                </Grid>
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChooseWard;
