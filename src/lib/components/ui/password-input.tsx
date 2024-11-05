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
const PasswordInput = ({
  onChange,
  value,
  error,
  label,
  placeholder = 'Enter Password',
}: any) => {
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
        bg="#ffffff"
        borderWidth={1}
        borderColor="#E9EAF0"
        borderRadius={10}
      >
        <Input
          placeholder={placeholder}
          type={show ? 'text' : 'password'}
          value={value}
          fontSize={14}
          onChange={onChange}
          border="none"
          color="#1D2026"
          _placeholder={{ color: '#8C94A3' }}
        />
        <InputRightElement width="4.5rem">
          <Icon onClick={handleClick} as={show ? IoMdEye : IoMdEyeOff} />
        </InputRightElement>
      </InputGroup>
      <Text fontSize={10} color={'red'}>
        {error || ''}
      </Text>
    </FormControl>
  );
};

export default PasswordInput;
