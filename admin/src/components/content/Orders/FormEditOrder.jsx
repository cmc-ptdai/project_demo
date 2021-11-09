import React, {useEffect,useState} from "react";
import { Select, Input, Modal, Table, Button } from 'antd';
import './orders.scss'
import { useDispatch } from 'react-redux';
import { editOrder } from '../../../redux/action/orderAction'
//import orderApi from '../../../api/apiOrders'

const { Option } = Select;
const FromEditOrder = (props) => {

  const dispatch = useDispatch()
  //const orders = useSelector(store => store.orderReducer)

  // const [form] = Form.useForm();

  const [dataForm, setDataForm] = useState({...props.data})
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    setDataTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <p>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
      render: (text, record) => (
        <div className="tableUser__input">
          <Input
            type="number"
            min="1"
            max= "20"
            defaultValue={Number(record.count)}
            onChange={changeInputInTable}
            id={record.id}
          />
        </div>
      ),
    },
    {
      title: 'Giảm giá  (%)',
      dataIndex: 'sale',
      key: 'sale',
    },
    {
      title: 'Tổng tiền',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <p>{((record.price * record.count) - (((record.price * record.count)*record.sale)/100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 140,
      render: (text, record) => (
          <div className= {(dataForm.status === 'pending' && dataForm.listProduct.length > 1) ? 'tableUser__button' : 'display-none'}>
            <Button
              type="primary"
              onClick={() => deleteProductByOrder(record)}
              danger
            >
              Delete</Button>
          </div>
      ),
    },
  ];

  const deleteProductByOrder = (record) => {
    for (let i = 0; i < dataForm.listProduct.length; i++) {
      if (dataForm.listProduct[i].id === record.id) {
        dataForm.listProduct = dataForm.listProduct.filter(item => item.id !== record.id)
        break
      }
    }
    setDataForm(dataForm);
    setDataTotal()
    // dataForm.listProduct.forEach((item, index) => {
    //   if (item.id === record.id) {

    //   }
    // })
  }

  const setDataTotal = () => {
    let newDta1 = 0
    let newDta2 = 0
    dataForm.listProduct.forEach(item => {
      newDta1 = newDta1 + Number(item.price * item.count) - (((item.price * item.count)*item.sale)/100)
      newDta2 = newDta2 + Number(item.count)
    })
    setTotalPrice(newDta1);
    setTotalCount(newDta2);
  }

  const handleCancel =  () => {
    props.editStatusFrom(false)
    //form.resetFields();
  }

  const onchangeStatus = (e) => {
    const newData = {
      ...dataForm,
      status: e,
    }
    setDataForm(newData);
  }

  const onchangeInputName = (e) => {
    const newData = {
      ...dataForm,
      username: e.target.value,
    }
    setDataForm(newData);
  }
  const onchangeInputPhone = (e) => {
    console.log(e.target.value);
  }
  const onchangeInputAddress = (e) => {
    const newData = {
      ...dataForm,
      phone: e.target.value,
    }
    setDataForm(newData);
  }

  const changeInputInTable = (e) => {
    dataForm.listProduct.forEach((item, index) => {
      if (item.id === e.target.id) {
        dataForm.listProduct[index] = {
          ...dataForm.listProduct[index],
          count: e.target.value,
        }
      }
    })
    setDataForm(dataForm);
    setDataTotal()
  }

  const onFinish = () => {
    const newData = {
      ...dataForm,
      dateUpdate: new Date(),
    }
    dispatch(editOrder(newData))
    handleCancel()
  }
  return (
    <>
      <Modal
        className="form__edit"
        visible={true}
        title="Chi tiết đơn hàng"
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Ngày tạo đơn: {dataForm.dateCreate}</label>
        <label>Ngày tạo sửa đơn: {dataForm.dateUpdate}</label>
        <br/>
        <label>Trạng thái đơn hàng:</label>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          defaultValue={dataForm.status}
          onChange={onchangeStatus}
        >
          <Option value="pending">Pending</Option>
          <Option value="delivery">Delivery</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>

        <label>Tên người mua:</label>
        <Input
          name="name"
          onChange={onchangeInputName}
          defaultValue={dataForm.username}
        />
        <label>Số điện thoại:</label>
        <Input
          name="phone"
          onChange={onchangeInputPhone}
          defaultValue={dataForm.phone}
        />
        <label>Địa chỉ:</label>
        <Input
          name="address"
          onChange={onchangeInputAddress}
          defaultValue={dataForm.address}
        />

        <h3>Danh sách sản phẩm</h3>
        <Table
          className="table__order"
          columns={columns}
          dataSource={dataForm.listProduct}
          rowKey="id"
        />

        <h3>Tổng chi phí hoá đơn</h3>
        <ul className="form__edit__totals">
          <li>
            <div>Tổng số lượng sản phẩm:</div>
            <div>
              {
                totalCount
              }
            </div>
          </li>
          <li>
            <div>Tổng tiền:</div>
            <div>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</div>
          </li>
        </ul>
        <div className="groupButton">
          <Button className="btnSubmit" type="primary" onClick={onFinish} >
            save
          </Button>
          <Button className="btnSubmit" type="primary" danger onClick={handleCancel}>
            close
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default FromEditOrder;
