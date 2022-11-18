import {
  Component,
  createRef
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

class DataSource extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: null,
      page: null,
      search: '',
      sortMode: null,
      sortColumn: null,
      data: null
    };

    this.searchRef = createRef();
    this.searchTimeout = null;

    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.onSortClick = this.onSortClick.bind(this);
    this.onDisplayChange = this.onDisplayChange.bind(this);
    this.onPreviousPageClick = this.onPreviousPageClick.bind(this);
    this.onNextPageClick = this.onNextPageClick.bind(this);
  }

  componentDidMount() {
    this.populate();
  }

  componentDidUpdate(prevProps, prevState) {
    const detect = (state => this.state[state] !== prevState[state]).bind(this);

    if (detect('display') || detect('page') || detect('search') || detect('sortMode') || detect('sortColumn')) {
      this.populate();
    }
  }

  render() {
    const displayOptions = typeof(this.props.displayOptions) === 'undefined' ? [15, 25, 50, 100] : this.props.displayOptions;

    return (
      <Flex direction="column" p={4} gap={4}>
        <Flex direction={['column', 'row']} gap={4}>
          <InputGroup>
            <InputLeftAddon children={<Icon as={FaSearch} />} />
            <Input ref={this.searchRef} type="text" placeholder="Masukkan kata kunci pencarian" onChange={this.onSearchInputChange} />
          </InputGroup>
          <InputGroup w="100%" maxW="300px">
            <InputLeftAddon children="Tampilkan" />
            <Select value={(this.state.display !== null) ? this.state.display : displayOptions[0]} onChange={this.onDisplayChange}>
              {displayOptions.map(option => (<option value={option}>{option}</option>))}
            </Select>
            <InputRightAddon children="data" />
          </InputGroup>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            {(this.state.data !== null) && (<TableCaption>Menampilkan {this.state.data.data.length} dari {this.state.data.population} data</TableCaption>)}
            <Thead>
              <Tr>
                {this.props.columns.map(column => (
                  <Th>
                    <Flex align="center">
                      <Text flex={1}>{column.title}</Text>
                      {(column.sort !== false) && (
                        <IconButton data-column={column.sort} icon={<Icon as={(this.state.sortColumn === column.sort) ? ((this.state.sortMode === 'asc') ? FaSortUp : FaSortDown) : FaSort} />} onClick={this.onSortClick} />
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {(this.state.data !== null) && this.state.data.data.map(row => (
                <Tr>
                  {this.props.columns.map(column => (<Td>{row[column.id]}</Td>))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {this.state.data !== null && (
          <Center>
            <HStack spacing={4}>
              <IconButton icon={<Icon as={FaChevronLeft} />} onClick={this.onPreviousPageClick} />
              <Text>Halaman {this.state.data.page} dari {this.state.data.max_page}</Text>
              <IconButton icon={<Icon as={FaChevronRight} />} onClick={this.onNextPageClick} />
            </HStack>
          </Center>
        )}
      </Flex>
    );
  }

  onSearchInputChange() {
    if (this.searchTimeout !== null) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout((() => {
      this.setState({
        search: this.searchRef.current.value,
        page: 1
      });
    }).bind(this), 2000);
  }

  onSortClick(e) {
    const column = e.currentTarget.getAttribute('data-column');

    if (this.state.sortColumn === column) {
      if (this.state.sortMode === 'asc') {
        this.setState({sortMode: 'desc'});
      } else if (this.state.sortMode === 'desc') {
        this.setState({sortColumn: null, sortMode: null})
      }
    } else {
      this.setState({sortColumn: column, sortMode: 'asc'})
    }
  }

  onDisplayChange(e) {
    this.setState({
      display: parseInt(e.currentTarget.value),
      page: 1
    });
  }

  onPreviousPageClick() {
    if (this.state.data.page > 1) {
      this.setState({page: this.state.data.page - 1});
    }
  }

  onNextPageClick() {
    if (this.state.data.page < this.state.data.max_page) {
      this.setState({page: this.state.data.page + 1});
    }
  }

  populate() {
    const urlParams = [];

    const assign = (state, param) => {
      if (this.state[state] !== null) {
        urlParams.push(param + '=' + encodeURIComponent(this.state[state]));
      }
    };

    assign('display', 'display');
    assign('page', 'page');
    assign('search', 'search');
    assign('sortMode', 'sort_mode');
    assign('sortColumn', 'sort_column');

    axios.get(this.props.endpoint + '?' + urlParams.join('&')).then((function(response) {
      this.setState({
        data: response.data,
        display: response.data.display,
        page: response.data.page
      });
    }).bind(this));
  }

}

export default DataSource;
