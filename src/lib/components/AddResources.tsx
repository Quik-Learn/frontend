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

const AddResources = ({
  isOpen,
  onClose,
  createResource,
  createLoading,
  isSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  createResource: (body: any) => void;
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
      if (file.type !== 'application/pdf') {
        alert('Please select only PDF or DOC files');
        e.target.value = ''; // Reset input
        return;
      }
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
    }
  }, [isSuccess]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={'#161736'} textAlign={'center'}>
          Create a New Resource
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel color={'#161736'}>Enter Resource Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload Resource File</FormLabel>

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
              <Text color={'#161736'}>Drop files to upload</Text>
              <Text color={'#161736'}>or</Text>
              <Button
                text="Select Files"
                width={'100px'}
                bg={'#0A52A8'}
                onClick={handleClick}
              />
            </Stack>
          </FormControl>
          <HStack justifyContent={'flex-end'} flexWrap={'wrap'}>
            <Text color={'#161736'} fontSize={{ base: '10px', md: '12px' }}>
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
                  createResource({ file, title });
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

export default AddResources;
