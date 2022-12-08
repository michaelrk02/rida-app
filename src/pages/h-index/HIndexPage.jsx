import {
  useEffect,
  useRef,
  useState
} from 'react';

import {
  Button,
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label as ChartLabel,
  Legend as ChartLegend,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis
} from 'recharts';

import axios from '../../utils/axios';

import HomeLayout from '../../components/HomeLayout';

export default function HIndexPage() {
  const [fakultasList, setFakultasList] = useState([]);

  const [fakultasId, setFakultasId] = useState('');
  const [chartData, setChartData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const fakultasRef = useRef(null);

  useEffect(() => {
    axios.get('/fakultas').then(res => {
      setFakultasList(res.data.data);
      populateChart('');
      populateTable();
    });
  }, []);

  useEffect(() => {
    populateChart(fakultasId);
  }, [fakultasId]);

  const handleFilter = () => {
    setFakultasId(fakultasRef.current.value);
  };

  const populateChart = (fakultasId) => {
    setChartData(null);
    axios.get('/peneliti/chart?fakultas_id=' + fakultasId).then(res => {
      setChartData(res.data.data);
    });
  };

  const populateTable = () => {
    setTableData(null);
    axios.get('/peneliti/table').then(res => {
      setTableData(res.data);
    });
  };

  return (
    <HomeLayout>
      <Flex direction="row" wrap="wrap" align="center" mb={8}>
        <VStack grow={1} w={{base: '100%', lg: '25%'}} spacing={4} align="start" mb={8}>
          <Heading size="lg">Filter</Heading>
          <FormControl>
            <FormLabel>Unit:</FormLabel>
            <Select ref={fakultasRef} variant="filled">
              <option value="">Universitas</option>
              {fakultasList.map(fakultas => (<option value={fakultas.id}>{fakultas.nama}</option>))}
            </Select>
          </FormControl>
          <Button colorScheme="teal" onClick={handleFilter}>Filter</Button>
        </VStack>
        <Box grow={1} w={{base: '100%', lg: '75%'}} mb={8}>
          {
            chartData === null ? (
              <Center w="100%" h="100%">
                <Spinner color="teal" size="xl" />
              </Center>
            ) : (
              <VStack spacing={8}>
                <Heading w="100%" size="lg" textAlign="center">H-Indeks Penelitian Dan Pengabdian Kepada Masyarakat</Heading>
                <Center w="100%" overflow="auto">
                  <BarChart width={960} height={480} data={chartData} >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="h_index" />
                    <YAxis />
                    <ChartTooltip />
                    <ChartLegend />
                    <Bar dataKey="jumlah" fill="#25aa5a" name="Jumlah" />
                  </BarChart>
                </Center>
              </VStack>
            )
          }
        </Box>
      </Flex>
      <Flex direction="row" wrap="wrap" mb={8}>
        <Box grow={1} w={{base: '100%', lg: '25%'}} mb={8}/>
        <Box grow={1} w={{base: '100%', lg: '75%'}} mb={8}>
          {tableData === null ? (
            <Center w="100%" h="100%">
              <Spinner color="teal" size="xl" />
            </Center>
          ) : (
            <VStack spacing={8}>
              <Heading size="lg">Tabel H-Indeks Penelitian Dan Pengabdian Kepada Masyarakat</Heading>
              <Box w="100%" bg="white" borderRadius={16} p={4}>
                <TableContainer w="100%">
                  <Table>
                    <TableCaption>Tabel H-Index Peneliti</TableCaption>
                    <Thead>
                      <Tr>
                        <Th scope="col" rowspan={2} colspan={2}>H-Index</Th>
                        <Th scope="col" colspan={tableData.headers.length}>Fakultas</Th>
                        <Th scope="col" rowspan={2}>Jumlah</Th>
                      </Tr>
                      <Tr>
                        {tableData.headers.map(header => (<Th scope="col">{header}</Th>))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableData.rows.map(row => (
                        <>
                          <Tr>
                            <Th scope="row" rowspan={2} isNumeric={true}>{row.h_index}</Th>
                            <Th scope="row">Jumlah</Th>
                            {row.columns.map(column => (
                              <>
                                <Td isNumeric={true}>{column.jumlah}</Td>
                              </>
                            ))}
                            <Td isNumeric={true}>{row.jumlah}</Td>
                          </Tr>
                          <Tr>
                            <Th scope="row">Persentase</Th>
                            {row.columns.map(column => (
                              <>
                                <Td isNumeric={true}>{Math.round(column.persentase * 100) / 100}%</Td>
                              </>
                            ))}
                            <Td isNumeric={true}>{Math.round(row.persentase * 100) / 100}%</Td>
                          </Tr>
                        </>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th scope="col" colspan={2}>Total</Th>
                        {tableData.footers.map(footer => (<Td isNumeric={true}>{footer}</Td>))}
                        <Td isNumeric={true}>{tableData.total}</Td>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Box>
            </VStack>
          )}
        </Box>
      </Flex>
    </HomeLayout>
  );
}
