import { Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import SuccessModal from './ui/success-modal';
import { AddRegistered, AddWard, NewWard } from './AddWard';
import * as yup from 'yup';

const AddWardComponent = ({ onOpen, onClose, isOpen, neww, setNew }: any) => {
  const formRef = useRef(null);
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
    age: yup.string().required('Please enter age '),
    sex: yup.string().required('Please enter  gender'),
    email: yup.string().required('Please enter  email address'),
    DOB: yup.string().required('Please enter date of birth '),
    address: yup.string().required('Please enter  address'),
    password: yup.string().required('Please enter password'),
  });

  const initialValues: any = {
    firstname: '',
    lastname: '',
    age: '',
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
