import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';

const BookError = ({ isOpen, onClose, description, hasAction, actionText, actionFunction }: { isOpen: boolean, onClose: () => void, description: string, hasAction: boolean, actionText?: string, actionFunction?: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Activate Subscription</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>
        <ModalFooter justifyContent={'center'} gap={2} >   
            <Button bg={'primary'} color='red'  onClick={onClose}>Close</Button>
            {hasAction && <Button onClick={actionFunction}>{actionText}</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BookError