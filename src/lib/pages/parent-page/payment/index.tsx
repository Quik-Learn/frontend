'use client';

import {
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  Button as ChakraButton,
  useDisclosure,
  Heading,
  Progress,
  SimpleGrid,
  Box,
  HStack,
  List,
  ListItem,
  ListIcon,
  Stack,
  useToast,
  Avatar,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import * as yup from 'yup';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import Button from '~/lib/components/ui/button';
import SuccessModal from '~/lib/components/ui/success-modal';

import ParentContainer from '~/lib/layout/ParentContainer';
import { useAppDispatch, useAppSelector } from '~/lib/store';
import {
  clearSuccess,
  setSuccess,
  uiState,
} from '~/lib/store/reducers/ui-slice';
import { pricingData } from '~/lib/utils/nav';
import { useRouter } from 'next/navigation';
import { useGetAllWardsQuery } from '~/lib/services/parent-mutation';
import AddWardComponent from '~/lib/components/AddWardComponent';
import ProgressBar from '~/lib/components/ui/progress-bar';
const data = [
  {
    id: 1,
    name: 'Joseph Doe',
    plan: 'Basic Plan',
    img: '/images/ward.svg',
    count: 20,
    allocation: 30,
  },
  {
    id: 2,
    name: 'Simisola James',
    plan: 'Standard Plan',
    img: '/images/girl.svg',
    count: 12,
    allocation: 35,
  },
  {
    id: 3,
    name: 'George Doe',
    plan: 'Premium Plan',
    img: '/images/ward.svg',
    count: 0,
    allocation: 45,
  },
];

const Payment = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [successData, setSuccessData] = useState({
    title: '',
    description: '',
    buttonText: '',
  });
  const [neww, setNew] = useState('');
  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const {
    isSuccess: { title, description, buttonText },
  } = useAppSelector(uiState);
  const [wardData, setWardData] = useState<any>([]);
  const {
    data: wards,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetAllWardsQuery(null, {
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
        w={{ base: '100%', md: '300px', lg: '348px' }}
      >
        {children}
      </Box>
    );
  }
  return (
    <ParentContainer>
      {isLoading ? (
        <Stack justifyContent={'center'} alignItems={'center'} flex={1}>
          <Spinner size="xl" />
        </Stack>
      ) : (
        <Stack padding={6} bg={'#fafafa'}>
          {/* <Heading color={'#000'} fontSize={32} fontWeight={700} mb={8}>
            Subscriptions
          </Heading> */}
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
              <GridItem
                bg={'#fff'}
                borderRadius={29}
                minH={400}
                padding={5}
                w={350}
                boxShadow={'sm'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-around'}
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
                  // w={{lg: 410}}

                  bg={'#fff'}
                  borderRadius={29}
                  minH={400}
                  padding={5}
                  w={350}
                  boxShadow={'sm'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <Avatar
                    w={'228px'}
                    h={'228px'}
                    fontSize={'xx-large'}
                    mb={5}
                    src={item?.profile_image}
                    name={`${item?.firstname} ${item?.lastname}`}
                  />
                  <VStack>
                    <Text
                      color="#272727"
                      fontSize={20}
                      fontWeight={700}
                      textAlign={'center'}
                      textTransform={'capitalize'}
                    >
                      {item?.firstname} {item?.lastname}
                    </Text>
                    {item?.subscription?.plan_name ? (
                      <Text color="#272727" fontSize={17} fontWeight={300}>
                        {item?.subscription?.plan_name}
                      </Text>
                    ) : null}
                  </VStack>
                  {!item?.subscription?.plan_name ? (
                    <Stack w={'100%'} my={5}>
                      <Progress
                        value={0}
                        size="lg"
                        bg={true ? '#5F5F5F' : '#5F5F5F'}
                        borderRadius="8px"
                        transition="all 0.3s ease-in-out"
                      />
                    </Stack>
                  ) : (
                    <Stack w={'100%'}>
                      <ProgressBar
                        firstPercentage={`${(item?.subscription?.hours_watched / item?.subscription?.total_hours) * 100}%`}
                        secondPercentage={`${(item?.subscription?.total_hours / item?.subscription?.total_hours) * 100}%`}
                      />
                      {/* <Progress
                      value={
                        ((+item?.subscription?.total_hours -
                          +item?.subscription?.hours_watched) /
                          +item?.subscription?.total_hours) *
                        100
                      }
                      size="lg"
                      bg={true ? '#FFC727' : '#0065FF'}
                      borderRadius="8px"
                      transition="all 0.3s ease-in-out"
                    /> */}
                    </Stack>
                  )}
                  {item?.subscription?.plan_name ? (
                    <Text color="#5F5F5F" fontSize={16} fontWeight={500}>
                      {item.subscription?.hours_watched} out of{' '}
                      {item?.subscription?.total_hours} hours this week
                    </Text>
                  ) : (
                    <Text color="#5F5F5F" fontSize={16} fontWeight={700}>
                      No Active Plan
                    </Text>
                  )}

                  <Button
                    border="#0A52A8"
                    color="#0A52A8"
                    text={
                      item?.subscription?.plan_name ? 'Manage Plan' : 'Add Plan'
                    }
                    variant="outline"
                    onClick={() => {
                      if (!item?.subscription?.plan_name) {
                        router.push(`/parent/pricing?ward_id=${item?.id}`);
                      } else {
                        router.push(`/parent/payment/${item?.id}`);
                      }
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          )}
          {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {neww === '' ? <AddWard setNew={setNew} /> : null}
        {neww === 'new' ? (
          <NewWard
            initialValues={initialValues}
            signInSchema={signInSchema}
            formRef={formRef}
            successFunction={() => {
              setNew('');
              onClose();

              setSuccessData({
                title: 'Successful!',
                description:
                  'An email as been sent to ward with his login details',
                buttonText: 'Close',
              });
              onOpenn();
            }}
          />
        ) : null}
        {neww === 'old' ? (
          <AddRegistered
            value={value}
            setValue={setValue}
            data={oldData}
            successFunction={() => {
              setNew('');
              onClose();

              setSuccessData({
                title: 'Successful!',
                description:
                  'An email as been sent to ward with his login details',
                buttonText: 'Close',
              });
              onOpenn();
            }}
          />
        ) : null}
      </Modal> */}
          <SuccessModal
            onClose={onClosee}
            isOpen={isOpenn}
            title={successData?.title}
            description={successData?.description}
            buttonText={successData?.buttonText}
          />
          <AddWardComponent
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            neww={neww}
            setNew={setNew}
            wards={wardData}
          />
        </Stack>
      )}
    </ParentContainer>
  );
};

export default Payment;
