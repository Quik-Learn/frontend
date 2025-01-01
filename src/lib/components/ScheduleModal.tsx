import {
  Box,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Checkbox,
  TableCaption,
} from '@chakra-ui/react';
import React from 'react';

const ScheduleModal = ({
  isOpen,
  onClose,
  availability,
  setAvailability,
}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'lg', md: '2xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>
          <Text fontSize={{ base: 20, md: 24 }} mb={4} fontWeight={700}>
            Schedule Weekly Availability
          </Text>
          <Text fontSize={{ base: 16, md: 20 }} mb={4} fontWeight={300}>
            Kindly check the boxes for your availability, Leave off days
            unchecked
          </Text>
        </ModalHeader>
        <ModalBody overflowY={'scroll'}>
          <Box my={4}>
            <Text fontSize={{ base: 16, md: 20 }} fontWeight={300}>
              General Availability
            </Text>
            <Table variant="simple">
              <Thead borderColor={'#EBE8E6'}>
                <Tr borderColor={'#EBE8E6'}>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Time
                  </Th>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Mon
                  </Th>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Tue
                  </Th>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Wed
                  </Th>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Thu
                  </Th>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Fri
                  </Th>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Sat
                  </Th>
                  <Th
                    color={'#000000'}
                    fontSize={{ base: 14, md: 16 }}
                    fontWeight={300}
                    borderColor={'#EBE8E6'}
                    textTransform={'capitalize'}
                  >
                    Sun
                  </Th>
                </Tr>
              </Thead>
              <Tbody borderColor={'#EBE8E6'}>
                {availability?.map((slot: any, index: number) => (
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
                          value={available}
                          onChange={(e) => {
                            const newAvailability = [...availability];
                            newAvailability[index].availability[idx] =
                              e.target.checked;
                            setAvailability(newAvailability);
                          }}
                        />
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleModal;
