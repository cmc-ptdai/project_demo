import React, { useState} from 'react';
import { Table, Input, Button, Space, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import ApiUser from '../../../api/apiUser';
import FromEdit from './FormEdit';


const MyTable = ({dataTable}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [isDelete, setIsDelete] = useState('false')
  const [userEdit, setUserEdit] = useState(null)
  const [statusFrom, setStatusFrom] = useState(false)

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>

          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',

    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'id',
      render: (text, record) => (
        <span>{text === 'nam' ? 'Nam' : 'Nữ'}</span>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'UserName',
      key: 'username',
      dataIndex: 'userName',
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Date create',
      key: 'dateCreate',
      dataIndex: 'dateCreate',
      defaultSortOrder: 'addsendring',
      sorter: (a, b) => moment(a.dateCreate).format('x') - moment(b.dateCreate).format('x'),
    },
    {
      title: 'Date update',
      key: 'dateUpdate',
      dataIndex: 'dateUpdate',
      defaultSortOrder: 'addsendring',
      sorter: (a, b) => moment(a.dateCreate).format('x') - moment(b.dateCreate).format('x'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          <div className="tableUser__button">
            <Button type="primary" onClick={() => editUser(record)}>Edit</Button>
            <Popconfirm
              title="Bạn có muốn xóa user không?"
              onConfirm={() => handleOk(record.id)}
              onCancel={handleCancel}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
      ),
    },
  ];

  const handleOk = async (id) => {
    // await ApiUser.deleteUser(id)
    message.info('Clicked on yes',);
    console.log(id);
  };

  const handleCancel = () => {
    message.info('Clicked on No.');
  };

  const editStatusFrom = (childData) => {
    setStatusFrom(childData)
  };

  const editUser = (record) => {
    setUserEdit(record)
    setStatusFrom(true)
  }

  return (
    <>
      {
        statusFrom && <FromEdit dataUser={userEdit} editStatusFrom={editStatusFrom}/>
      }
      {
        dataTable && <Table columns={columns} dataSource={dataTable} rowKey="id"/>
      }
    </>
  )
}

export default MyTable;
