'use client';

import { Heading, Text } from '@chakra-ui/react';
import {
  Input,
  Icon,
  InputLeftElement,
  InputGroup,
  Select,
  HStack,
  Stack,
} from '@chakra-ui/react';
import TutorTable from '~/lib/components/TutorTable';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import TutorContainer from '~/lib/layout/TutorContainer';
import TopNavTutor from '~/lib/layout/TopNavTutor';
import Button from '~/lib/components/ui/button';
import { useRouter } from 'next/navigation';
import TableComponent from '~/lib/components/TableComponent';
import StudentsHook from './students.hook';
const dummyTutorData = [
  {
    id: 1,
    name: 'John Doe',
    subject: 'Mathematics',
    class: 'K6',
    email: 'john.doe@example.com',
    gender: 'Male',
    extra: true,
  },
  {
    id: 2,
    name: 'Jane Doe',
    subject: 'English',
    class: 'K7',
    email: 'jane.doe@example.com',
    gender: 'Female',
    extra: false,
  },
  {
    id: 3,
    name: 'John Doe',
    subject: 'Mathematics',
    class: 'K6',
    email: 'john.doe@example.com',
    gender: 'Male',
    extra: true,
  },

  {
    id: 4,
    name: 'Jane Doe',
    subject: 'English',
    class: 'K7',
    email: 'jane.doe@example.com',
    gender: 'Female',
    extra: true,
  },
  {
    id: 1,
    name: 'John Doe',
    subject: 'Mathematics',
    class: 'K6',
    email: 'john.doe@example.com',
    gender: 'Male',
    extra: true,
  },
  {
    id: 2,
    name: 'Jane Doe',
    subject: 'English',
    class: 'K7',
    email: 'jane.doe@example.com',
    gender: 'Female',
    extra: false,
  },
  {
    id: 3,
    name: 'John Doe',
    subject: 'Mathematics',
    class: 'K6',
    email: 'john.doe@example.com',
    gender: 'Male',
    extra: false,
  },
  {
    id: 4,
    name: 'Jane Doe',
    subject: 'English',
    class: 'K7',
    email: 'jane.doe@example.com',
    gender: 'Female',
    extra: true,
  },
];
const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'subject', header: 'Subject' },
  { key: 'class', header: 'Class' },
  { key: 'email', header: 'Email Address' },
  { key: 'gender', header: 'Gender' },
];
const Students = () => {
  const { students, isLoading, getStudents } = StudentsHook();
  const router = useRouter();
  const [tutorData, setTutorData] = useState<any>([]);
  const handleRowClick = (row: any) => {
    router.push(`/tutor/students/${row.id}`);
  };
  return (
    <TutorContainer>
      <Stack p={[4, null, 8]} mt={3}>
        {/* <HStack w="full" spacing={4}>
          <Select maxW="200px" placeholder="Filter by subject">
            <option value="mathematics">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
          </Select>
          <InputGroup flex={1}>
            <InputLeftElement>
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input placeholder="Search for a tutors by name or email" />
          </InputGroup>
        </HStack> */}

        {students?.length === 0 ? (
          <Stack
            h="60vh"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Heading size="md">No Students at this time</Heading>
            <Text color="gray.500">
              Students will appear here after they are added.
            </Text>
          </Stack>
        ) : (
          <Stack mt={3}>
            <TableComponent
              columns={columns}
              data={students?.map((student: any) => ({
                id: student.id,
                name: `${student?.student?.firstname} ${student?.student?.lastname}`,
                subject: student.subject || '-',
                class: student.k_level || '-',
                email: student?.student?.email,
                gender: student.gender || '-',
                extra: student.is_new,
              }))}
              maxHeight="60vh"
              handleRowClick={handleRowClick}
            />
          </Stack>
        )}
      </Stack>
    </TutorContainer>
  );
};

export default Students;
