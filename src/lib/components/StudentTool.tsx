import { Flex, Text, IconButton, Select } from '@chakra-ui/react';
import React from 'react';
import { GrFormNext } from 'react-icons/gr';
import { IoChevronBackOutline } from 'react-icons/io5';
import Button from './ui/button';

const StudentTool = ({
  label,
  onNavigate,
  onView,
  view,
  Views,
  router,
}: any) => {
  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Flex>
        <Text mx={6} color={'#7D8DA6'} fontSize={18}>
          {label}
        </Text>
        <IconButton
          w={33}
          h={33}
          borderRadius={5}
          onClick={() => onNavigate('PREV')}
          mr={2}
          icon={<IoChevronBackOutline color="#7D8DA6" />}
          aria-label={''}
        ></IconButton>
        <IconButton
          w={33}
          h={33}
          borderRadius={5}
          onClick={() => onNavigate('NEXT')}
          mr={4}
          icon={<GrFormNext color="#7D8DA6" />}
          aria-label={''}
        ></IconButton>
        <Select
          value={view}
          onChange={(e) => onView(e.target.value)}
          width="120px"
          backgroundColor={'transparent'}
          borderColor={'transparent'}
          color={'#7D8DA6'}
          mr={4}
        >
          <option value={Views?.WEEK}>Weekly</option>
          <option value={Views?.MONTH}>Monthly</option>
        </Select>
      </Flex>
      <Flex align="center">
        <Button
          width={'262px'}
          text="Book New session"
          bg="#0177FB"
          onClick={() => router.push('/student/book-session')}
        />
      </Flex>
    </Flex>
  );
};

export default StudentTool;
