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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import { AddRegistered, AddWard, NewWard } from '~/lib/components/AddWard';
import AddWardComponent from '~/lib/components/AddWardComponent';
import Button from '~/lib/components/ui/button';
import ParentContainer from '~/lib/layout/ParentContainer';

const data = [
  { id: 1, name: 'Joseph Doe', class: 'K6', img: '/images/ward.svg' },
  { id: 2, name: 'Simisola James', class: 'K8', img: '/images/ward-2.svg' },
];

const Wards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [neww, setNew] = useState('');

  return (
    <ParentContainer>
      {false ? (
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
            <Button width={{ lg: 386 }} text="Add a Ward " bg="#0A52A8" />
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
              boxShadow={'base'}
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
                <Text color="#272727" fontSize={20} fontWeight={700}>
                  {item.class}
                </Text>
              </VStack>

              <Button
                border="#0A52A8"
                color="#0A52A8"
                text="Manage"
                variant="outline"
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
      />
    </ParentContainer>
  );
};

export default Wards;
