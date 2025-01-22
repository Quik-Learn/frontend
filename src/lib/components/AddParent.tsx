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

const AddParent = ({ onOpen, onClose, isOpen, neww, setNew, wards }: any) => {
  const toast = useToast();
  const formRef = useRef(null);
  const [addWard, { data, isSuccess, isError, error, isLoading }] =
    useAddWardMutation();
  const [connectWard, connectWardDetails] = useConnectWardMutation();
  const [searchWard, serachWardData] = useLazySearchWardQuery();
  const [addSubjectForWard, addSubjectForWardData] =
    useAddSubjectForWardMutation();
  const [filteredWards, setFilteredWards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [id, setId] = useState([]);
  const [successData, setSuccessData] = useState({
    title: '',
    description: '',
    buttonText: '',
  });
  const {
    isOpen: isOpenn,
    onOpen: onOpenn,
    onClose: onClosee,
  } = useDisclosure();
  const {
    isOpen: isOpenSubject,
    onOpen: onOpenSubject,
    onClose: onCloseSubject,
  } = useDisclosure();

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setNew('');
      onClose();
      setId(data?.data?.user?.id);
      onOpenSubject();
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

  useEffect(() => {
    const { data, isSuccess, isError, error, isLoading } = connectWardDetails;
    if (isSuccess) {
      setNew('');
      onClose();

      setSuccessData({
        title: 'Successful!',
        description: 'An email as been sent to ward with his login details',
        buttonText: 'Close',
      });
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
  }, [connectWardDetails]);
  useEffect(() => {
    const { isSuccess, isError, error } = addSubjectForWardData;
    if (isSuccess) {
      onCloseSubject();

      setSuccessData({
        title: 'Successful!',
        description: 'An email as been sent to parent ',
        buttonText: 'Close',
      });
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
  }, [addSubjectForWardData]);
  useEffect(() => {
    const { data, isSuccess, isError, error, isLoading } = serachWardData;
    if (isSuccess) {
      console.log(data);

      setFilteredWards(data?.data);
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
  }, [serachWardData]);
  const onSubmit = () => {
    onClose();
    setSuccessData({
      title: 'Successful!',
      description: 'An email as been sent to parent ',
      buttonText: 'Close',
    });
    onOpenn();
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
            <Button bg="#0A52A8" text="Submit" onClick={onSubmit} />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SuccessModal
        onClose={onClosee}
        isOpen={isOpenn}
        title={successData?.title}
        description={successData?.description}
        buttonText={successData?.buttonText}
      />
    </>
  );
};

export default AddParent;
