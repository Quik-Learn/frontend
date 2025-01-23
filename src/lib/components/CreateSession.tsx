import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Checkbox,
  HStack,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './ui/button';

const CreateSession = ({
  isOpen,
  onClose,
  createSession,
  createSessionLoading,
  type,
  id,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  createSession: (values: any) => void;
  createSessionLoading: boolean;
  id: any;
  type?: 'Create' | 'Edit';
  data?: any;
}) => {
  const formRef = useRef<any>(null);
  const signInSchema = yup.object().shape({
    title: yup.string().required('Please enter your title'),
    notes: yup.string().required('Please enter your description'),
    date: yup.string().required('Please enter your date'),
    start_time: yup.string().required('Please enter your start time'),
    end_time: yup.string().required('Please enter your end time'),
    repeat: yup.boolean().optional(),
  });
  const handleSubmit = () => {
    if (formRef.current) {
      formRef?.current?.handleSubmit();
    }
  };
  const [initialValues, setInitialValues] = useState({
    title: '',
    notes: '',
    date: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    if (type === 'Edit' && data) {
      setInitialValues({
        title: data?.title,
        notes: data?.notes,
        date: data?.date,
        start_time: data?.start_time,
        end_time: data?.end_time,
      });
    }
  }, [type, data]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type} a Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            innerRef={formRef}
            onSubmit={(values) => {
              if (type === 'Create') {
                createSession({ body: values, id });
              } else {
                createSession({ body: values, id: data?.id });
              }
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={signInSchema}
          >
            {({ errors, setFieldValue, values }: any) => (
              <Stack gap={4}>
                <FormControl>
                  <Input
                    placeholder="Topic"
                    bg="#ffffff"
                    borderWidth={1}
                    borderColor="#E9EAF0"
                    p={5}
                    color="#1D2026"
                    _placeholder={{ color: '#8C94A3' }}
                    value={values.title}
                    onChange={(e) => setFieldValue('title', e.target.value)}
                  />
                  <Text color={'red'} fontSize={8}>
                    {errors.title || ''}
                  </Text>
                </FormControl>
                <FormControl>
                  <Textarea
                    placeholder="Type the note here..."
                    bg="#ffffff"
                    borderWidth={1}
                    borderColor="#E9EAF0"
                    value={values.notes}
                    p={5}
                    color="#1D2026"
                    _placeholder={{ color: '#8C94A3' }}
                    onChange={(e) => setFieldValue('notes', e.target.value)}
                  />
                  <Text color={'red'} fontSize={8}>
                    {errors.notes || ''}
                  </Text>
                </FormControl>
                <FormControl>
                  <Input
                    placeholder="Date"
                    type="date"
                    bg="#ffffff"
                    min={new Date().toISOString().split('T')[0]}
                    borderWidth={1}
                    borderColor="#E9EAF0"
                    value={values.date}
                    p={5}
                    sx={{
                      input: {
                        border: 'none',
                        boxSizing: 'border-box',
                        outline: '0',
                        position: 'relative',
                      },
                      '::-webkit-calendar-picker-indicator': {
                        background: 'transparent',
                        bottom: '0',
                        color: 'transparent',
                        cursor: 'pointer',
                        height: 'auto',
                        left: '0',
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        width: 'auto',
                      },
                    }}
                    color="#1D2026"
                    _placeholder={{ color: '#8C94A3' }}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

                      if (selectedDate >= today) {
                        setFieldValue('date', e.target.value);
                      } else {
                        alert('Please select today or a future date');
                      }
                    }}
                  />
                  <Text color={'red'} fontSize={8}>
                    {errors.date || ''}
                  </Text>
                </FormControl>
                <HStack>
                  <FormControl>
                    <Input
                      placeholder="Start Time"
                      bg="#ffffff"
                      type="time"
                      borderWidth={1}
                      borderColor="#E9EAF0"
                      value={values.start_time}
                      min="09:00"
                      max="16:00"
                      p={5}
                      sx={{
                        input: {
                          border: 'none',
                          boxSizing: 'border-box',
                          outline: '0',
                          position: 'relative',
                        },
                        '::-webkit-calendar-picker-indicator': {
                          background: 'transparent',
                          bottom: '0',
                          color: 'transparent',
                          cursor: 'pointer',
                          height: 'auto',
                          left: '0',
                          position: 'absolute',
                          right: '0',
                          top: '0',
                          width: 'auto',
                        },
                      }}
                      color="#1D2026"
                      _placeholder={{ color: '#8C94A3' }}
                      onChange={(e) => {
                        const time = e.target.value;
                        const [hours] = time.split(':');
                        const hourNum = parseInt(hours);
                        console.log(hourNum);
                        if (hourNum >= 9 && hourNum <= 16) {
                          setFieldValue('start_time', time);
                        } else {
                          alert('Start time must be between 09:00 and 14:00');
                        }
                      }}
                    />
                    <Text color={'red'} fontSize={8}>
                      {errors.start_time || ''}
                    </Text>
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="End Time"
                      bg="#ffffff"
                      type="time"
                      borderWidth={1}
                      borderColor="#E9EAF0"
                      value={values.end_time}
                      min="10:00"
                      max="17:00"
                      p={5}
                      sx={{
                        input: {
                          border: 'none',
                          boxSizing: 'border-box',
                          outline: '0',
                          position: 'relative',
                        },
                        '::-webkit-calendar-picker-indicator': {
                          background: 'transparent',
                          bottom: '0',
                          color: 'transparent',
                          cursor: 'pointer',
                          height: 'auto',
                          left: '0',
                          position: 'absolute',
                          right: '0',
                          top: '0',
                          width: 'auto',
                        },
                      }}
                      color="#1D2026"
                      _placeholder={{ color: '#8C94A3' }}
                      onChange={(e) => {
                        const time = e.target.value;
                        const [hours] = time.split(':');
                        const hourNum = parseInt(hours);
                        if (hourNum >= 10 && hourNum <= 17) {
                          setFieldValue('end_time', time);
                        } else {
                          alert('End time must be between 10:00 and 17:00');
                        }
                      }}
                    />
                    <Text color={'red'} fontSize={8}>
                      {errors.end_time || ''}
                    </Text>
                  </FormControl>
                </HStack>
                {type === 'Create' && (
                  <FormControl>
                    <Select
                      placeholder="Repeat"
                      bg="#ffffff"
                      borderWidth={1}
                      borderColor="#E9EAF0"
                      value={values.repeat}
                      p={5}
                      color="#1D2026"
                      _placeholder={{ color: '#8C94A3' }}
                      onChange={(e) => {
                        setFieldValue('repeat', e.target.value);
                      }}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Select>
                    <Text color={'red'} fontSize={8}>
                      {errors.repeat || ''}
                    </Text>
                  </FormControl>
                )}
              </Stack>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#0065FF"
            text="Save"
            onClick={handleSubmit}
            isLoading={createSessionLoading}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateSession;
