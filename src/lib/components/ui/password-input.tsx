import React from 'react';

import {
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
const PasswordInput = ({ onChange, value, error, label, placeholder }: any) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl w="full">
      <FormLabel fontSize={14} color="#262626" fontWeight={500}>
        {label}
      </FormLabel>
      <InputGroup
        color="#1D2026"
        _placeholder={{ color: '#8C94A3' }}
        bg="#FCFCFD"
        borderWidth={1}
        borderRadius={10}
        borderColor="#F1F1F3"
      >
        <Input
          placeholder={placeholder}
          type={show ? 'text' : 'password'}
          value={value}
          fontSize={14}
          onChange={onChange}
          border="none"
        />
        <InputRightElement width="4.5rem">
          <Icon onClick={handleClick} as={show ? IoMdEye : IoMdEyeOff} />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage fontSize={10} color={'red'}>
        {error || ''}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInput;
