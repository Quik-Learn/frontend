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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
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

  const [value, setValue] = useState('');
  const signInSchema = yup.object().shape({
    first_name: yup.string().required('Please confirm password'),

    last_name: yup.string().required('Please confirm password'),
    age: yup.string().required('Please confirm password'),
    gender: yup.string().required('Please confirm password'),
    email_address: yup.string().required('Please confirm password'),
  });

  const initialValues: any = {
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    email_address: '',
  };
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
      <Stack padding={6} bg={'#fafafa'}>
        <Heading color={'#000'} fontSize={32} fontWeight={700} mb={8}>
          Subscriptions
        </Heading>
        {false ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
            spacing={6}
            alignItems="center"
          >
            {pricingData.map((tier, index) => {
              return (
                <PriceWrapper key={index} bgColor={tier.bgColor}>
                  <Box position="relative" color={tier.textColor}>
                    <Box
                      py={4}
                      alignItems="center"
                      display="flex"
                      flexDirection="column"
                    >
                      <Text
                        fontWeight="700"
                        fontSize={{ base: 24, sm: 18, md: 25, lg: 30 }}
                        my={3}
                        fontFamily="heading"
                      >
                        {tier.title}
                      </Text>
                      <HStack
                        justifyContent="center"
                        bg="#FFFBE9"
                        w={130}
                        height={47}
                        borderRadius={7}
                        borderWidth={0.5}
                        borderColor="#FBA333"
                      >
                        <Text
                          fontSize={{ base: 18, sm: 22, md: 28, lg: 31 }}
                          fontWeight="600"
                          color="#0A52A8"
                          fontFamily="Inter"
                        >
                          {tier.price}
                        </Text>
                        <Text
                          fontSize={{ base: 14, sm: 14, md: 16, lg: 16 }}
                          color="black"
                          fontFamily="heading"
                        >
                          {tier.period}
                        </Text>
                      </HStack>
                    </Box>
                    <VStack py={6} borderBottomRadius={'xl'}>
                      <Text
                        fontWeight="500"
                        fontSize={{ base: 14, sm: 14, md: 18, lg: 18 }}
                        textAlign="start"
                        fontFamily="heading"
                        display="flex"
                      >
                        Available Features
                      </Text>
                      <List spacing={3} textAlign="start" px={12}>
                        {tier.features.map((feature: any, idx: any) => (
                          <ListItem
                            key={idx}
                            fontFamily="heading"
                            fontSize={{ base: 12, sm: 12, md: 14, lg: 14 }}
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
                        ))}
                      </List>
                      <Box w="80%" pt={7}>
                        <ChakraButton
                          w="full"
                          mb={4}
                          borderRadius={10}
                          p={6}
                          onClick={() => {
                            setSuccessData({
                              title: 'Successful!',
                              description:
                                'You habe successfukky subscribed for a basic plan',
                              buttonText: 'Close',
                            });
                            onOpenn();
                          }}
                          bg={tier.buttonColorScheme}
                          color={tier.buttonText}
                          variant={tier.buttonVariant || 'solid'}
                        >
                          Select
                        </ChakraButton>
                      </Box>
                    </VStack>
                  </Box>
                </PriceWrapper>
              );
            })}
          </SimpleGrid>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} my={6} px={6}>
            {data?.map((item) => (
              <GridItem
                key={item.id}
                colSpan={[3, 2, 1]}
                // w={{lg: 410}}
                h={{ lg: 500 }}
                bg={'#fff'}
                borderRadius={29}
                minH={300}
                padding={5}
                boxShadow={'sm'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <Image src={item.img} alt="add" />
                <VStack>
                  <Text color="#272727" fontSize={20} fontWeight={700}>
                    {item.name}
                  </Text>
                  <Text color="#272727" fontSize={17} fontWeight={300}>
                    {item.plan}
                  </Text>
                </VStack>
                {item.count === 0 ? (
                  <Stack w={'100%'}>
                    <Progress
                      value={item.count}
                      size="lg"
                      bg={true ? '#5F5F5F' : '#5F5F5F'}
                      borderRadius="8px"
                      transition="all 0.3s ease-in-out"
                      marginTop={10}
                    />
                  </Stack>
                ) : (
                  <Stack w={'100%'}>
                    <Progress
                      value={item.count}
                      size="lg"
                      bg={true ? '#FFC727' : '#0065FF'}
                      borderRadius="8px"
                      transition="all 0.3s ease-in-out"
                      marginTop={10}
                    />
                  </Stack>
                )}

                <Text color="#5F5F5F" fontSize={16} fontWeight={500}>
                  {item.count} out of {item.allocation} hours this week
                </Text>

                <Button
                  border="#0A52A8"
                  color="#0A52A8"
                  text="Manage Plan"
                  variant="outline"
                  onClick={() => router.push('parent/payment/1')}
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
      </Stack>
    </ParentContainer>
  );
};

export default Payment;
