import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import Button from './ui/button';
export const AddSubject = ({
  data,
  selected,
  filterText,
  setFilterText,
  isLoading,
  setSelected,
  handleSubmit,
  isLoadingSubmit,
  isOpen,
  onClose,
}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={'#fff'} maxH={'80vh'} overflowY={'auto'}>
        <ModalHeader
          color={'#5F5F5F'}
          fontSize={32}
          fontWeight={700}
          textAlign={'center'}
        >
          Add Subject for Ward
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selected?.length ? (
            <HStack
              flexWrap={'wrap'}
              gap={4}
              mb={10}
              justifyContent={'flex-start'}
              alignItems={'flex-start'}
              alignSelf={'flex-start'}
            >
              {selected?.map((item: any) => (
                <Stack
                  onClick={() => {}}
                  borderWidth={1.5}
                  borderColor={'#FBA333'}
                  bg={'white'}
                  px={'14px'}
                  py={'10px'}
                  borderRadius={20}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Text color={'#FBA333'}>{item?.name}</Text>
                </Stack>
              ))}
            </HStack>
          ) : null}
          <FormControl
            gridColumn="span 3"
            alignItems="flex-start"
            justifyContent="flex-start"
            mb={5}
          >
            <FormLabel fontSize={14} color="#1D2026">
              Select 5 Subject of Interest
            </FormLabel>

            <Input
              placeholder="Search"
              bg="#ffffff"
              borderWidth={1}
              borderColor="#E9EAF0"
              value={filterText}
              p={5}
              color="#1D2026"
              _placeholder={{ color: '#8C94A3' }}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Text>{''}</Text>
          </FormControl>
          {isLoading ? (
            <HStack justifyContent={'center'} alignItems={'center'}>
              <Spinner />
              <Text>Loading subjects</Text>
            </HStack>
          ) : (
            <HStack flexWrap={'wrap'} gap={4} mb={10}>
              {data?.map((item: any) => (
                <Stack
                  onClick={() => {
                    console.log(selected, item);
                    if (
                      selected?.length &&
                      selected?.find((itemm: any) => itemm?.name === item?.name)
                    ) {
                      const lastSelectedIndex = selected.lastIndexOf(item);
                      const updatedSelected = [...selected];
                      updatedSelected.splice(lastSelectedIndex, 1); // Remove the last selected item
                      setSelected(updatedSelected);
                    } else {
                      setSelected((prev: any) => [...prev, item]);
                    }
                  }}
                  borderWidth={1.5}
                  bgColor={'#5F5F5F'}
                  bg={
                    selected.find((itemm: any) => itemm?.name === item.name)
                      ? '#0065FF'
                      : 'white'
                  }
                  px={'14px'}
                  py={'10px'}
                  borderRadius={20}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Text
                    color={
                      selected.find((itemm: any) => itemm?.name === item?.name)
                        ? 'white'
                        : '#5F5F5F'
                    }
                  >
                    {item?.name}
                  </Text>
                </Stack>
              ))}
            </HStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            text="Submit"
            bg="#0065FF"
            isLoading={isLoadingSubmit}
            isDisabled={isLoadingSubmit || selected?.length === 0}
            onClick={handleSubmit}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
