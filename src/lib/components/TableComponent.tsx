import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Button from './ui/button';

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableComponentProps {
  columns: Column[];
  data: any[];
  maxHeight?: string;
  minWidth?: string;
  handleRowClick: (row: any) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  maxHeight,
  minWidth = '100%',
  handleRowClick = () => {},
}) => {
  const router = useRouter();
  const evenRowBg = useColorModeValue('gray.50', 'gray.700');
  const oddRowBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('white', 'gray.800');

  return (
    <TableContainer maxH={maxHeight} overflowY="auto" minW={minWidth}>
      <Table variant="simple">
        <Thead position="sticky" top={0} bg={headerBg} zIndex={1}>
          <Tr>
            <Th
              fontSize={14}
              textTransform={'capitalize'}
              fontWeight={700}
              key={''}
            >
              Profile Image
            </Th>
            {columns.map((column) => (
              <Th
                fontSize={14}
                textTransform={'capitalize'}
                fontWeight={700}
                key={column.key}
              >
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              onClick={() => handleRowClick(row)}
              bg={rowIndex % 2 === 0 ? evenRowBg : oddRowBg}
              _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
            >
              {row?.hasProfile && (
                <Td>
                  <Avatar src={row?.profile} size={'sm'} name={row?.name} />
                </Td>
              )}
              {columns.map((column) => (
                <Td key={`${rowIndex}-${column.key}`}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </Td>
              ))}
              {row?.extra && (
                <Td>
                  <Button
                    py={2}
                    px={4}
                    text="New"
                    bg="#FF8C00"
                    width={'59px'}
                  />
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
