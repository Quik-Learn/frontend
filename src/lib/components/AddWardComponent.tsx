import { Modal, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SuccessModal from './ui/success-modal';
import { AddRegistered, AddWard, NewWard } from './AddWard';
import * as yup from 'yup';
import {
  useAddWardMutation,
  useConnectWardMutation,
  useLazySearchWardQuery,
} from '../services/parent-mutation';

const AddWardComponent = ({
  onOpen,
  onClose,
  isOpen,
  neww,
  setNew,
  wards,
}: any) => {
  const toast = useToast();
  const formRef = useRef(null);
  const [addWard, { data, isSuccess, isError, error, isLoading }] =
    useAddWardMutation();
  const [connectWard, connectWardDetails] = useConnectWardMutation();
  const [searchWard, serachWardData] = useLazySearchWardQuery();
  const [filteredWards, setFilteredWards] = useState([]);
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
  const [value, setValue] = useState('');
  const signInSchema = yup.object().shape({
    firstname: yup.string().required('Please enter first name'),

    lastname: yup.string().required('Please enter last name'),
    state: yup.string().required('Please enter state '),
    sex: yup.string().required('Please enter  gender'),
    email: yup.string().required('Please enter  email address'),
    DOB: yup.string().required('Please enter date of birth '),
    address: yup.string().required('Please enter  address'),
    password: yup.string().required('Please enter password'),
  });

  const initialValues: any = {
    firstname: '',
    lastname: '',
    state: '',
    sex: '',
    email: '',
    DOB: '',
    address: '',
    password: '',
  };
  const oldData = [
    { id: 1, name: 'Nick Jonas ', email: 'Nickjonas34@gmail.com' },
    { id: 2, name: 'Nick Jonas ', email: 'Nickjonas34@gmail.com' },
    { id: 3, name: 'Nick Jonas ', email: 'Nickjonas34@gmail.com' },
  ];

  const filterSubjects = useCallback(
    (filterText: string) => {
      const result = wards?.filter(
        (item: any) =>
          item?.user?.firstname
            ?.toLowerCase()
            .includes(filterText?.toLowerCase()) ||
          item?.user?.email?.toLowerCase().includes(filterText?.toLowerCase())
      );
      console.log(result);
      setFilteredWards(result);
    },
    [wards]
  );
  useEffect(() => {
    if (value) {
      searchWard({ Ward: value });
    }
  }, [value]);

  useEffect(() => {
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
  }, [isError, error, isSuccess]);
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        {neww === '' ? <AddWard setNew={setNew} /> : null}
        {neww === 'new' ? (
          <NewWard
            initialValues={initialValues}
            signInSchema={signInSchema}
            formRef={formRef}
            addWard={addWard}
            isLoading={isLoading}
          />
        ) : null}
        {neww === 'old' ? (
          <AddRegistered
            value={value}
            setValue={setValue}
            wards={filteredWards}
            connectWard={connectWard}
          />
        ) : null}
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

export default AddWardComponent;
