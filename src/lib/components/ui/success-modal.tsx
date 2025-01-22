import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '~/lib/store';
import { clearSuccess, uiState } from '~/lib/store/reducers/ui-slice';
import Button from './button';
import { FaCircleCheck } from 'react-icons/fa6';

const SuccessModal = ({
  isOpen,
  title,
  description,
  buttonText,
  onClose,
  closeFunction = () => {},
}: any) => {
  const dispatch = useAppDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent textAlign="center" bg="#fff" px={6} py={10}>
        {/* <ModalHeader>{title}</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {/* Success Icon */}
            <Icon
              as={FaCircleCheck}
              w={20}
              h={20}
              borderRadius={50}
              color="#009933"
            />

            {/* Success Message */}
            <Text fontWeight={900} fontSize="31px" color={'#00190B'}>
              {title}
            </Text>

            {/* Sub-message */}
            <Text fontSize="18px" color="#5F5F5FD1">
              {description}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {/* Close button */}
          <Button
            bg="#0A52A8"
            onClick={() => {
              onClose();
              closeFunction();
            }}
            text={buttonText}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
