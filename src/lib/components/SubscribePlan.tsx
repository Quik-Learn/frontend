import React from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Modal,
  ModalOverlay,
} from '@chakra-ui/react';

import Button from './ui/button';

import { useRouter } from 'next/navigation';

export const SubscribePlan = ({ isOpen, onClose }: any) => {
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={'white'} p={6}>
        <ModalHeader
          color={'#5F5F5F'}
          fontSize={32}
          fontWeight={700}
          textAlign={'center'}
        >
          Subscribe to a Plan
        </ModalHeader>
        <ModalCloseButton borderColor={'#fff'} />
        <ModalBody>
          <Text color={'#5F5F5F'} fontSize={20} textAlign={'center'}>
            You are yet to add a course for your newly added ward, Click on the
            button below to View available Plans
          </Text>
        </ModalBody>

        <ModalFooter flexDir={'column'} gap={5}>
          <Button
            bg="#0A52A8"
            text="View Plans"
            onClick={() => router.push('/parent/wards')}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
