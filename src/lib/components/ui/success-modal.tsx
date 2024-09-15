import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose, title, message, buttonText }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent textAlign="center">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {/* Success Icon */}
            <Icon as={FaCheck} w={16} h={16} color="green.500" />

            {/* Success Message */}
            <Text fontWeight="bold" fontSize="lg">
              Successful
            </Text>

            {/* Sub-message */}
            <Text fontSize="md" color="gray.500">
              {message}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {/* Close button */}
          <Button colorScheme="blue" onClick={onClose} w="full">
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
