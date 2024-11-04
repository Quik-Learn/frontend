import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import React from 'react';

const Availability = () => {
  return (
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
        {/* <Tbody borderColor={'#EBE8E6'}>
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
        </Tbody> */}
      </Table>
    </Box>
  );
};

export default Availability;
