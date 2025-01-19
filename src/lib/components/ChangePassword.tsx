import {
  Box,
  Heading,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Button from './ui/button';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useChangePasswordMutation } from '../services/user-service';
const ChangePassword = () => {
  const toast = useToast();
  const [changePassword, { isLoading, isError, isSuccess, error }] =
    useChangePasswordMutation();
  const [passwords, setPasswords] = useState<{
    current: string;
    new: string;
    confirm: string;
  }>({
    current: '',
    new: '',
    confirm: '',
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState<{
    current: boolean;
    new: boolean;
    confirm: boolean;
  }>({
    current: false,
    new: false,
    confirm: false,
  });
  // Handle password input changes
  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };
  const handlePasswordSave = () => {
    changePassword({
      old_password: passwords.current,
      new_password: passwords.new,
      new_password2: passwords.confirm,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Successful!',
        description: 'Password updated successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
    if (isError) {
      toast({
        title: error?.data?.error?.message || 'An error occured',
        description: 'An Error occured.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [isSuccess, isError]);
  return (
    <Box flex="1" w={'100%'}>
      <Heading color={'#1D2026'} fontWeight={600} fontSize={'xl'} my={8}>
        Change password
      </Heading>
      <Stack spacing={4} mb={6} w={'100%'}>
        <InputGroup>
          <Input
            type={showPassword.current ? 'text' : 'password'}
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) => handlePasswordChange('current', e.target.value)}
          />
          <InputRightElement>
            {showPassword.current ? (
              <LuEyeOff
                onClick={() => togglePasswordVisibility('current')}
                cursor={'pointer'}
              />
            ) : (
              <LuEye
                onClick={() => togglePasswordVisibility('current')}
                cursor={'pointer'}
              />
            )}
          </InputRightElement>
        </InputGroup>
        <InputGroup>
          <Input
            type={showPassword.new ? 'text' : 'password'}
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) => handlePasswordChange('new', e.target.value)}
          />
          <InputRightElement>
            {showPassword.new ? (
              <LuEyeOff
                onClick={() => togglePasswordVisibility('new')}
                cursor={'pointer'}
              />
            ) : (
              <LuEye
                onClick={() => togglePasswordVisibility('new')}
                cursor={'pointer'}
              />
            )}
          </InputRightElement>
        </InputGroup>
        <InputGroup>
          <Input
            type={showPassword.confirm ? 'text' : 'password'}
            placeholder="Confirm new password"
            value={passwords.confirm}
            onChange={(e) => handlePasswordChange('confirm', e.target.value)}
          />
          <InputRightElement>
            {showPassword.confirm ? (
              <LuEyeOff
                onClick={() => togglePasswordVisibility('confirm')}
                cursor={'pointer'}
              />
            ) : (
              <LuEye
                onClick={() => togglePasswordVisibility('confirm')}
                cursor={'pointer'}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Button
        bg={'#FF8C00'}
        color={'white'}
        isLoading={isLoading}
        width={158}
        onClick={handlePasswordSave}
        text="Save"
      />
    </Box>
  );
};

export default ChangePassword;
