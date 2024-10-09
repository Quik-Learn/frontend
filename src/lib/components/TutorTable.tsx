import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Checkbox,
} from '@chakra-ui/react';

const TutorTable = ({
  general_availability,
  qualifications,
  subjects,
}: any) => {
  // Data for availability
  // const availability = [
  //   {
  //     time: 'Pre 12pm',
  //     availability: [false, false, false, true, true, false, false],
  //   },
  //   {
  //     time: '12 - 5pm',
  //     availability: [true, false, true, false, false, false, false],
  //   },
  //   {
  //     time: 'After 5pm',
  //     availability: [true, true, true, false, true, false, false],
  //   },
  // ];
  const availability = [
    {
      time: 'Pre 12pm',
      availability: general_availability?.map((day: any) => day.morning),
    },
    {
      time: '12 - 5pm',
      availability: general_availability?.map((day: any) => day.afternoon),
    },
    {
      time: 'After 5pm',
      availability: general_availability?.map((day: any) => day.evening),
    },
  ];
  console.log(availability, general_availability);
  // Data for subjects offered

  return (
    <Box p={3}>
      {/* Qualifications Section */}
      <Box mb={4}>
        <Text fontSize={18} mb={2} color={'#242424'} fontWeight={300}>
          Qualifications
        </Text>
        <Table variant="simple" bg={'#FFFFFF'}>
          <Thead borderColor={'#EBE8E6'}>
            <Tr borderColor={'#EBE8E6'}>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Subject
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Qualification
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Grade
              </Th>
            </Tr>
          </Thead>
          <Tbody borderColor={'#EBE8E6'}>
            {qualifications?.map((qual: any, index: number) => (
              <Tr key={index} borderColor={'#EBE8E6'}>
                <Td
                  borderColor={'#EBE8E6'}
                  fontSize={14}
                  color={'#000000'}
                  fontWeight={300}
                >
                  {qual.subject}
                </Td>
                <Td
                  borderColor={'#EBE8E6'}
                  fontSize={14}
                  color={'#000000'}
                  fontWeight={300}
                >
                  {qual.Qualification}
                </Td>
                <Td
                  borderColor={'#EBE8E6'}
                  fontSize={14}
                  color={'#000000'}
                  fontWeight={300}
                >
                  {qual.Grade}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* General Availability Section */}
      <Box my={4}>
        <Text fontSize={18} mb={4} color={'#242424'} fontWeight={300}>
          General Availability
        </Text>
        <Table variant="simple">
          <Thead borderColor={'#EBE8E6'}>
            <Tr borderColor={'#EBE8E6'}>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Time
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Mon
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Tue
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Wed
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Thu
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Fri
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Sat
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Sun
              </Th>
            </Tr>
          </Thead>
          <Tbody borderColor={'#EBE8E6'}>
            {availability?.map((slot, index) => (
              <Tr key={index} borderColor={'#EBE8E6'}>
                <Td
                  borderColor={'#EBE8E6'}
                  fontSize={14}
                  color={'#000000'}
                  fontWeight={300}
                >
                  {slot?.time}
                </Td>
                {slot?.availability?.map((available: any, idx: number) => (
                  <Td
                    key={idx}
                    bg={available ? '#FFF' : '#F5F5F5'}
                    borderColor={'#EBE8E6'}
                    borderWidth={availability ? 1 : 0}
                    border={availability ? '#EBE8E6' : 'none'}
                  >
                    <Checkbox
                      iconColor="black.400"
                      isChecked={available}
                      isReadOnly
                      value={available}
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Subjects Offered Section */}
      <Box mt={10}>
        <Text fontSize={18} mb={4} color={'#242424'} fontWeight={300}>
          Subjects Offered
        </Text>
        <Table variant="simple">
          <Thead borderColor={'#EBE8E6'}>
            <Tr>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Subject
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Qualification
              </Th>
              <Th
                color={'#000000'}
                fontSize={17}
                fontWeight={300}
                borderColor={'#EBE8E6'}
                textTransform={'capitalize'}
              >
                Price
              </Th>
            </Tr>
          </Thead>
          <Tbody borderColor={'#EBE8E6'}>
            {subjects?.map((subject: any, index: number) => (
              <Tr key={index} borderColor={'#EBE8E6'}>
                <Td
                  color={'#000000'}
                  fontSize={17}
                  fontWeight={300}
                  borderColor={'#EBE8E6'}
                  textTransform={'capitalize'}
                >
                  {subject.subject}
                </Td>
                <Td
                  color={'#000000'}
                  fontSize={17}
                  fontWeight={300}
                  borderColor={'#EBE8E6'}
                  textTransform={'capitalize'}
                >
                  {subject.qualification}
                </Td>
                <Td
                  color={'#000000'}
                  fontSize={17}
                  fontWeight={300}
                  borderColor={'#EBE8E6'}
                  textTransform={'capitalize'}
                >
                  {subject.price}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TutorTable;
