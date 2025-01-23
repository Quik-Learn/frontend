import {
  Input,
  ModalCloseButton,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  FormControl,
  FormLabel,
  Stack,
  Image,
  Text,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Button from './ui/button';
const AddTopic = ({
  isOpen,
  onClose,
  createTopic,
  createLoading,
  isSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  createTopic: (body: any) => void;
  createLoading: boolean;
  isSuccess: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>('');
  const [title, setTitle] = useState<any>('');
  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger click on file input
  };
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const formData = {
          image: base64String,
        };

        setFile(base64String);
      };
    }
  };

  const allowedFiles = [
    'png',
    'jpg',
    'jpeg',
    '.pdf',
    '.docx',
    '.doc',
    '.xls',
    '.xlsx',
  ]
    .map((x) => '.' + x)
    .join(',');

  useEffect(() => {
    if (isSuccess) {
      setFile('');
      setTitle('');
    }
  }, [isSuccess]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Create a New Topic</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Enter Topic Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload Topic Image</FormLabel>

            <Stack
              p={6}
              borderWidth={2}
              borderStyle={'dashed'}
              borderColor={'#4C535F'}
              borderRadius={8}
              justifyContent={'center'}
              alignItems={'center'}
              mb={4}
            >
              <Input
                ref={fileInputRef}
                onChange={handleSelectFile}
                type={'file'}
                name={'logo-upload'}
                id={'logo-upload'}
                display={'none'}
                zIndex={200}
              />
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                w={'80px'}
                h={'80px'}
              >
                {file ? (
                  <Image src={file} />
                ) : (
                  <Image src={'/images/upload.svg'} />
                )}
              </Stack>
              <Text>Drop files to upload</Text>
              <Text>or</Text>
              <Button
                text="Select Files"
                width={'100px'}
                bg={'#0A52A8'}
                onClick={handleClick}
              />
            </Stack>
          </FormControl>
          <HStack justifyContent={'flex-end'}>
            <Text fontSize={{ base: '10px', md: '12px' }}>
              Maximum upload file size: 10 MB.
            </Text>
            <HStack>
              <Button
                variant="outline"
                color={'#0065FF'}
                border={'#0065FF'}
                text="Cancel"
                width={100}
              />
              <Button
                onClick={() => {
                  if (!title) {
                    alert('Please enter a title');
                    return;
                  }
                  if (!file) {
                    alert('Please upload an image');
                    return;
                  }
                  createTopic({ title, file });
                }}
                width={100}
                text="Save"
                bg={'#0065FF'}
                isLoading={createLoading}
              />
            </HStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTopic;
