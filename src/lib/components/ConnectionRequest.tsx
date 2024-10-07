import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import Button from './ui/button';

const ConnectionRequest = ({
  isOpen,
  onClose,
  receieveConnection,
  connectionData,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg={'#fff'} padding={10}>
        <ModalHeader
          color={'#5F5F5F'}
          fontSize={22}
          fontWeight={700}
          textAlign={'center'}
        >
          You have a new connection!
        </ModalHeader>

        <ModalBody>
          <Text color={'#5F5F5F'} fontSize={18} textAlign={'center'} mb={5}>
            You have a connection request from {connectionData?.parent?.name}(
            {connectionData?.parent?.email})
          </Text>
          <HStack justifyContent={'center'} alignItems={'center'} gap={10}>
            <Button
              width={86}
              bg="#0A52A8"
              text="Accept"
              onClick={() => {
                receieveConnection({
                  accept: true,
                });
              }}
            />
            <Button
              width={86}
              border="#0A52A8"
              variant="outline"
              text="Reject"
              onClick={() => {
                receieveConnection({
                  accept: false,
                });
              }}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectionRequest;
