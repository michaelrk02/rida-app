import {
  Component,
  useEffect,
  useRef,
  useState
} from 'react';

import {
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Skeleton,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';

import axios from '../utils/axios';

export default function DataSource(props) {
  const [display, setDisplay] = useState(null);
  const [page, setPage] = useState(null);
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [data, setData] = useState(null);

  const [isPopulating, setIsPopulating] = useState(false);

  const searchRef = useRef(null);

  let searchTimeout = null;

  useEffect(() => {
    populate();
  }, []);

  useEffect(() => {
    populate();
  }, [props.populate]);

  useEffect(() => {
    setIsPopulating(true);
    populate();
  }, [display, page, search, sortMode, sortColumn]);

  const handleSearchInputChange = () => {
    setIsPopulating(true);

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout((() => {
      setSearch(searchRef.current.value);
      setPage(1);
    }), 2000);
  };

  const handleSortClick = (e) => {
    const column = e.currentTarget.getAttribute('data-column');

    if (sortColumn === column) {
      if (sortMode === 'asc') {
        setSortMode('desc');
      } else if (sortMode === 'desc') {
        setSortColumn(null);
        setSortMode(null);
      }
    } else {
      setSortColumn(column);
      setSortMode('asc');
    }
  };

  const handleDisplayChange = (e) => {
    setDisplay(parseInt(e.currentTarget.value));
    setPage(1);
  };

  const handlePreviousPageClick = () => {
    if (data.page > 1) {
      setPage(data.page - 1);
    }
  };

  const handleNextPageClick = () => {
    if (data.page < data.max_page) {
      setPage(data.page + 1);
    }
  };

  const populate = () => {
    const urlParams = [];

    const assign = (state, param) => {
      const store = {display, page, search, sortMode, sortColumn}

      if (store[state] !== null) {
        urlParams.push(param + '=' + encodeURIComponent(store[state]));
      }
    };

    assign('display', 'display');
    assign('page', 'page');
    assign('search', 'search');
    assign('sortMode', 'sort_mode');
    assign('sortColumn', 'sort_column');

    axios.get(props.endpoint + '?' + urlParams.join('&')).then((function(response) {
      setData(response.data);
      setDisplay(response.data.display);
      setPage(response.data.page);
      setIsPopulating(false);
    }));
  };

  const displayOptions = typeof(props.displayOptions) === 'undefined' ? [15, 25, 50, 100] : props.displayOptions;

  const actions = typeof(props.actions) === 'undefined' ? null : props.actions;

  return (
    <Flex direction="column" p={4} gap={4} overflow="auto">
      <Flex direction={['column', 'row']} gap={4}>
        <InputGroup>
          <InputLeftAddon children={<Icon as={FaSearch} />} />
          <Input ref={searchRef} type="text" placeholder="Masukkan kata kunci pencarian" onChange={handleSearchInputChange} />
        </InputGroup>
        <InputGroup w="100%" maxW="300px">
          <InputLeftAddon children="Tampilkan" />
          <Select value={(display !== null) ? display : displayOptions[0]} onChange={handleDisplayChange}>
            {displayOptions.map(option => (<option value={option}>{option}</option>))}
          </Select>
          <InputRightAddon children="data" />
        </InputGroup>
      </Flex>
      {
        isPopulating ? (
          <Stack spacing={4}>
            <Skeleton height="64px" />
            <Skeleton height="64px" />
            <Skeleton height="64px" />
            <Skeleton height="64px" />
          </Stack>
        ) : (
          <TableContainer>
            <Table variant="simple">
              {(data !== null) && (<TableCaption>Menampilkan {data.data.length} dari {data.population} data</TableCaption>)}
              <Thead>
                <Tr>
                  {props.columns.map(column => (
                    <Th>
                      <Flex align="center" gap={4}>
                        <Text flex={1}>{column.title}</Text>
                        {(column.sort !== false) && (
                          <IconButton data-column={column.sort} icon={<Icon as={(sortColumn === column.sort) ? ((sortMode === 'asc') ? FaSortUp : FaSortDown) : FaSort} />} onClick={handleSortClick} />
                        )}
                      </Flex>
                    </Th>
                  ))}
                  {(actions !== null) && (<Th>Tindakan</Th>)}
                </Tr>
              </Thead>
              <Tbody>
                {(data !== null) && data.data.map(row => (
                  <Tr>
                    {props.columns.map(column => (<Td>{row[column.id]}</Td>))}
                    {(actions !== null) && (<Td>{actions(row)}</Td>)}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      }
      {data !== null && (
        <Center>
          <HStack spacing={4}>
            <IconButton icon={<Icon as={FaChevronLeft} />} onClick={handlePreviousPageClick} />
            <Text>Halaman {data.page} dari {data.max_page}</Text>
            <IconButton icon={<Icon as={FaChevronRight} />} onClick={handleNextPageClick} />
          </HStack>
        </Center>
      )}
    </Flex>
  );
}
