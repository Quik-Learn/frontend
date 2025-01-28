import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  ModalBody,
  ModalFooter,
  Stack,
} from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';
import moment from 'moment';

import React, { useRef, useState } from 'react';
import { BiSolidFilePdf } from 'react-icons/bi';
import { MdDownload } from 'react-icons/md';
import { TbFileSearch } from 'react-icons/tb';
import html2pdf from 'html2pdf.js';

import { IoIosCheckmarkCircle } from 'react-icons/io';
interface Invoice {
  id: string;
  user: string;
  plan: string;
  subscription: string;
  amount: number;
  payment_mode: string;
  payment_chanel: string;
  status: string;
  created_at: string;
}
const InvoicesData = ({ data }: any) => {
  const invoiceRef = useRef<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handlePreview = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    onOpen();
  };

  //   const handleDownload = (invoice: Invoice) => {
  //     const element = invoiceRef.current;
  //     console.log(invoice, element);
  //     const options = {
  //       margin: 0.5,
  //       filename: `Invoice_${invoice.id}.pdf`,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
  //     };
  //     html2pdf().from(element).set(options).save();
  //   };
  const handleDownload = (invoice: Invoice) => {
    setSelectedInvoice(invoice); // Populate content in hidden div

    const options = {
      margin: 0.5,
      filename: `Invoice_${invoice.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
    };

    // Generate PDF from the hidden div content
    html2pdf().from(invoiceRef.current).set(options).save();
  };

  const InvoiceContent = ({
    invoice,
    isPreview,
  }: {
    invoice: Invoice;
    isPreview?: boolean;
  }) => (
    <div
      ref={invoiceRef}
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',

        maxWidth: '600px',
        margin: 'auto',

        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          marginBottom: '10px',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#19213D',
          }}
        >
          Quik Learn
        </h1>
        <div>
          <div style={{}}>
            <p style={{ fontSize: '8px', color: '#868DA6' }}>Invoice Number:</p>
            <p
              style={{
                fontSize: '10px',
                color: '#19213D',
                fontWeight: '600',
              }}
            >
              000027
            </p>
          </div>
          <div>
            <p style={{ fontSize: '8px', color: '#868DA6' }}>Issued: </p>
            <p
              style={{
                fontSize: '10px',
                color: '#19213D',
                fontWeight: '600',
              }}
            >
              {moment(selectedInvoice?.created_at).format('MMMM DD, YYYY')}
            </p>
          </div>
        </div>
        <img src={'/images/tutor-logo.png'} width={100} height={100} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          borderRadius: '16px',
          margin: '20px',
          gap: '10px',
          boxShadow: ' 0px 3px 9px 5px #19213D0D',
          height: '160px',
        }}
      >
        <Stack h={'100%'}>
          <Flex gap={3} align={'center'} mb={2}>
            <IoIosCheckmarkCircle color="#2388FF" />
            <Text color={'#868DA6'} fontSize={8} fontWeight={500}>
              BILL TO
            </Text>
          </Flex>
          <Box bg={'#F6F8FC'} borderRadius={12} p={3}>
            <Flex gap={3} align={'center'}>
              <MdPerson color="#2388FF" />
              <Text fontSize={12} color={'#19213D'} fontWeight={600}>
                {selectedInvoice?.user}
              </Text>
            </Flex>
            <Text fontSize={10} color={'#19213D'}>
              (612) 856 - 0989
            </Text>
            <Text fontSize={8} color={'#868DA6'}>
              contact@quiklearn.com
            </Text>
            <Text fontSize={8} color={'#868DA6'}>
              Pablo Alto, San Francisco, CA 92102, United Kingdom
            </Text>
          </Box>
        </Stack>
        <Stack h={'100%'}>
          <Flex gap={3} align={'center'} mb={2}>
            <IoIosCheckmarkCircle color="#2388FF" />
            <Text color={'#868DA6'} fontSize={8} fontWeight={500}>
              BILL FROM
            </Text>
          </Flex>
          <Box h={'100%'} bg={'#F6F8FC'} borderRadius={12} p={3}>
            <Flex gap={3} align={'center'}>
              <MdPerson color="#2388FF" />
              <Text fontSize={12} color={'#19213D'} fontWeight={600}>
                Quik Learn
              </Text>
            </Flex>

            <Text fontSize={8} color={'#868DA6'}>
              (684) 879 - 0102
            </Text>
            <Text fontSize={8} color={'#868DA6'}>
              Pablo Alto, San Francisco, CA 92102, United Kingdom
            </Text>
          </Box>
        </Stack>
        <Stack h={'100%'}>
          <Flex gap={3} align={'center'} mb={2}>
            <IoIosCheckmarkCircle color="#2388FF" />
            <Text color={'#868DA6'} fontSize={8} fontWeight={500}>
              AMOUNT DUE
            </Text>
          </Flex>
          <Box
            style={{
              textAlign: 'center',
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <Text fontSize={10} fontWeight={600}>
              Pounds
            </Text>
            <Text fontSize={18} fontWeight={600}>
              £ {selectedInvoice?.amount}
            </Text>
            <Text fontSize={10} fontWeight={600}>
              {moment(selectedInvoice?.created_at)
                .add(0, 'days')
                .format('MMMM DD, YYYY')}
            </Text>
          </Box>
        </Stack>
      </div>

      {/* Invoice Table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th
              style={{
                textAlign: 'left',
                padding: '8px',
                textTransform: 'capitalize',
                fontSize: '8px',
                color: '#868DA6',
              }}
            >
              Description
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '8px',
                textTransform: 'capitalize',
                fontSize: '8px',
                color: '#868DA6',
              }}
            >
              QTY
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '8px',
                textTransform: 'capitalize',
                fontSize: '8px',
                color: '#868DA6',
              }}
            >
              PRICE
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '8px',
                textTransform: 'capitalize',
                fontSize: '8px',
                color: '#868DA6',
              }}
            >
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{
              border: '0.6px solid #EBEFF6',
              borderRadius: '16px',
              marginTop: '18px',
            }}
          >
            <td
              style={{
                padding: '8px',
                fontSize: '10px',
                color: '#19213D',
                fontWeight: 600,
              }}
            >
              Subscription
            </td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              1
            </td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              £ {selectedInvoice?.amount}
            </td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              £ {selectedInvoice?.amount}
            </td>
          </tr>
          <tr
            style={{
              border: '0.6px solid #EBEFF6',
              borderRadius: 16,
              marginTop: '18px',
            }}
          >
            <td
              style={{
                padding: '8px',
                fontSize: '10px',
                color: '#19213D',
                fontWeight: '600',
              }}
            >
              Taxes
            </td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            ></td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            ></td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            ></td>
          </tr>
          <tr
            style={{
              border: '0.6px solid #EBEFF6',
              borderRadius: '16px',
              marginTop: '18px',
            }}
          >
            <td
              style={{
                padding: '8px',
                fontSize: '10px',
                color: '#19213D',
                fontWeight: '600',
              }}
            >
              Charges
            </td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            ></td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            ></td>
            <td
              style={{
                textAlign: 'center',
                padding: '8px',
                color: '#868DA6',
                fontSize: '10px',
                fontWeight: 600,
              }}
            ></td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          textAlign: 'right',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Text color={'#868DA6'} fontSize={8} fontWeight={500}>
          TOTAL AMOUNT
        </Text>
        <Text>£ {selectedInvoice?.amount}</Text>
      </div>

      <p style={{ fontSize: '12px', color: '#888', marginTop: '20px' }}>
        Terms & Conditions: Fees and payment terms will be established in the
        contract or agreement prior to the commencement of the project. An
        initial deposit will be required before any design work begins. We
        reserve the right to suspend or halt work in the event of non-payment.
      </p>
    </div>
  );
  return (
    <Box p={8} borderRadius="md" boxShadow="sm">
      <Heading as="h3" color="#5F5F5F" fontSize={24} fontWeight={500} mb={4}>
        Invoices ({data?.length})
      </Heading>
      <VStack align="stretch" spacing={4}>
        {data?.map((invoice: any) => (
          <Flex
            key={invoice?.id}
            justify="space-between"
            align="center"
            p={4}
            bg="white"
            borderRadius="5px"
            onClick={() => setSelectedInvoice(invoice)}
          >
            <HStack spacing={3}>
              <Icon as={BiSolidFilePdf} w={6} h={6} />
              <Text color="#5F5F5F" fontSize={15} fontWeight={500}>
                {invoice?.id}.pdf
              </Text>
            </HStack>
            <Text
              color="#5F5F5F"
              fontSize={15}
              fontWeight={500}
              textAlign={'start'}
            >
              Date Of Invoice:{moment(invoice?.created_at).format('LL')}
            </Text>

            <HStack spacing={4}>
              <Icon
                as={TbFileSearch}
                w={6}
                h={6}
                color="#5F5F5F"
                onClick={() => handlePreview(invoice)}
              />
              <Icon
                as={MdDownload}
                w={6}
                h={6}
                color="#5F5F5F"
                onClick={() => handleDownload(invoice)}
              />
            </HStack>
          </Flex>
        ))}
      </VStack>

      {/* Invoice Layout */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invoice Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InvoiceContent invoice={selectedInvoice} />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Hidden div for PDF download */}
      <div style={{ display: 'none' }}>
        {selectedInvoice && (
          <div ref={invoiceRef}>
            <InvoiceContent invoice={selectedInvoice} />
          </div>
        )}
      </div>
    </Box>
  );
};

export default InvoicesData;
