import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SuccessModal from './ui/success-modal';
import { AddRegistered, AddWard, NewWard } from './AddWard';
import * as yup from 'yup';
import {
  useAddSubjectForWardMutation,
  useAddWardMutation,
  useConnectWardMutation,
  useLazySearchWardQuery,
} from '../services/parent-mutation';
import { useSetSubjectHook } from '../pages/auth/subject/useSetSubject';
import { AddSubject } from './AddSubject';
import Button from './ui/button';
import { useInviteParentMutation } from '../services/student-mutation';

const AddParent = ({ onClose, isOpen }: any) => {
  const toast = useToast();
  const [inviteParent, { data, isSuccess, isError, error, isLoading }] =
    useInviteParentMutation();

  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isSuccess) {
      onClose();
      onOpenn();
    }
    if (isError) {
      toast({
        //@ts-ignore
        title: error?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isError, error, isSuccess, data]);

  const onSubmit = () => {
    inviteParent({ email });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={'white'} p={6}>
          <ModalHeader
            color={'#5F5F5F'}
            fontSize={32}
            fontWeight={700}
            textAlign={'center'}
          >
            Add a Parent or a Guardian
          </ModalHeader>
          <ModalCloseButton borderColor={'#fff'} />
          <ModalBody>
            <Text color={'#5F5F5F'} fontSize={20} textAlign={'center'}>
              Enter your parents email address to notify them
            </Text>
            <FormControl mb={5} mt={5}>
              <Input
                placeholder="Enter your parents email address"
                bg="#ffffff"
                borderWidth={1}
                borderColor="#E9EAF0"
                value={email}
                p={5}
                color="#1D2026"
                _placeholder={{ color: '#8C94A3' }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter flexDir={'column'} gap={5}>
            <Button
              isLoading={isLoading}
              bg="#0A52A8"
              text="Submit"
              onClick={onSubmit}
              isDisabled={!email}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SuccessModal
        onClose={onClosee}
        isOpen={isOpenn}
        title={'Success'}
        description={'An Invite has been successfully sent to your parent!'}
        buttonText={'Close'}
      />
    </>
  );
};

export default AddParent;
