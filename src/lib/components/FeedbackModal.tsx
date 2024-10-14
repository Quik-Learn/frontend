import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Stack,
  useDisclosure,
  VStack,
  Text,
  Image,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import Rating from './Rating';
import Button from './ui/button';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { TiArrowForwardOutline } from 'react-icons/ti';
const FeedbackModal = ({ isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        textAlign="center"
        bg="#fff"
        px={6}
        py={10}
        position={'absolute'}
        borderRadius={15}
        overflow={'hidden'}
      >
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={'center'} justifyContent={'center'}>
            <Text fontWeight={900} fontSize="31px" color={'#00190B'} mb={3}>
              Session feedback
            </Text>

            <Text fontSize="18px" color="#5F5F5FD1" mb={3}>
              Please rate your experience with our Tutor below
            </Text>
            <Rating rate={4} />
            <Text
              mb="2px"
              textAlign={'left'}
              alignSelf={'flex-start'}
              color={'#6B7280'}
            >
              Additional feedback
            </Text>
            <Textarea
              value={''}
              onChange={() => {}}
              placeholder="My feedback!!"
              size="sm"
              w={'100%'}
            />

            <Button
              width={'100%'}
              bg={'#02659C'}
              text="Submit feedback"
              my={5}
              onClick={() => onClose()}
            />
            <Text color={'#6B7280'}>OR</Text>
            <HStack gap={5} my={0}>
              <Button
                width={'100%'}
                bg={'#fff'}
                text="Home"
                border="#D0D5DD"
                color="#344054"
                my={5}
                variant="outline"
                borderRadius={11}
                icon={<RiHomeSmile2Line color="#9CA3AF" />}
                onClick={() => onClose()}
              />
              <Button
                width={'100%'}
                bg={'#fff'}
                text="Rejoin session"
                my={5}
                border="#D0D5DD"
                icon={<TiArrowForwardOutline color="#9CA3AF" />}
                color="#344054"
                onClick={() => onClose()}
                borderRadius={11}
                variant="outline"
              />
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
