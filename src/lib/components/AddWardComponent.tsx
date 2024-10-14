import { Modal, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
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

  const {
    data: subjects,
    isLoading: isLoadingSubject,
    setFilterText,
    filterText,
  } = useSetSubjectHook();
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

  useEffect(() => {
    if (value) {
      searchWard({ Ward: value });
    }
  }, [value]);

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

      <AddSubject
        data={subjects}
        isOpen={isOpenSubject}
        onClose={onCloseSubject}
        selected={selected}
        filterText={filterText}
        setFilterText={setFilterText}
        isLoading={isLoadingSubject}
        setSelected={setSelected}
        isLoadingSubmit={addSubjectForWardData?.isLoading}
        handleSubmit={() => {
          const subjects = selected?.map((item: any) => {
            return item?.id;
          });
          addSubjectForWard({
            id,
            body: { subjects },
          });
        }}
      />
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
