import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { editProduct, getProduct } from '../../../redux/action/productAction'
import userProduct from '../../../api/apiProduct'
import './product.scss';
import apiWarehouse from '../../../api/apiWarehouse';

const { Option } = Select;

const FromEditProduct = (props) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({...props.data})
  const [imgEdit, setImgEdit] = useState('')
  const [warehouse, setWarehouse] = useState(null)

  useEffect(() => {
    fetchWarehouse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const fetchWarehouse = async () => {
    const warehouse = await apiWarehouse.getWarehouseById(data.id)
    setWarehouse(warehouse);
  }


  const onFinish = () => {
    if (props.data.countPay !== data.countPay) {
      const newWarehouse = {
        dateInput: new Date(),
        numberCount: 0,
        numberProduct: data.countPay
      }
      warehouse.listWarehouse.push(newWarehouse)

      apiWarehouse.editWarehouse(warehouse.id, warehouse)
    }

    dispatch(editProduct(data))
    setTimeout( async () => {
      try {
        const listProduct = await userProduct.getAllProduct()
        dispatch(getProduct(listProduct))
      } catch (error) {
        console.log(error);
      }
    }, 500);
    handleCancel()
  }

  const handleCancel =  () => {
    props.editStatusFrom(false)
  }

  const onchangeInputName = (e) => {
    setData({
      ...data,
      name: e.target.value,
    })
  }
  const onchangeInputPrice = (e) => {
    setData({
      ...data,
      price: e.target.value,
    })
  }

  const onchangeInputCountPay = (e) => {
    setData({
      ...data,
      countPay: e.target.value,
    })
  }

  const onchangeInputSale = (e) => {
    if (e.target.value >= 100) {
      setData({
        ...data,
        sale: 99,
      })
    } else if (e.target.value < 0 || e.target.value === '' ){
      setData({
        ...data,
        sale: 0,
      })
    } else {
      setData({
        ...data,
        sale: e.target.value,
      })
    }
  }

  const onchangeInputContent = (e) => {
    setData({
      ...data,
      content: e.target.value,
    })
  }
  const onchangeSelect = (e) => {
    setData({
      ...data,
      typeID: e,
    })
  }
  const onchangeSelect2 = (e) => {
    setData({
      ...data,
      species: e,
    })
  }

  const onchangeUnit = (e) => {
    setData({
      ...data,
      unit: e,
    })
  }

  const imgChange = (e) => {
    setImgEdit(e.target.value)
    setData({
      ...data,
      img: e.target.value,
    })
  }

  const onchangeInputDate = (e) => {
    setData({
      ...data,
      endDate: e.target.value,
      dateUpdate: new Date(),
    })
  }

  return (
    <div>
      <Modal
       className="form__edit"
        visible={true}
        title="Chỉnh sửa sản phẩm"
        onCancel={handleCancel}
      >
        <label>Tên sản phẩm:</label>
        <Input
          name="name"
          onChange={onchangeInputName}
          defaultValue={data.name}
        />

        <label>giá sản phẩm:</label>
        <Input
          name="price"
          onChange={onchangeInputPrice}
          defaultValue={data.price}
          type="number"
        />

        <label>giảm giá (%):</label>
        <Input
          name="sale"
          onChange={onchangeInputSale}
          type="number"
          max="99"
          defaultValue={data.sale}
        />

        <label>Đơn vị tính:</label>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          defaultValue={data.unit}
          onChange={onchangeUnit}
        >
          <Option value="gam">Gam</Option>
          <Option value="kg">kg</Option>
        </Select>

        <label>Số lượng sản phẩm:</label>
        <Input
          name="countPay"
          onChange={onchangeInputCountPay}
          type="number"
          defaultValue={data.countPay}
        />

        <label>Hạn sử dụng:</label>
        <Input type="date" defaultValue={data.endDate} onChange={onchangeInputDate}/>

        <label>Ảnh mô tả sản phẩm:</label>
        <Input
          onChange={imgChange}
          name="img"
          value={data.img}
        />

        <div className="form__edit__img">
            <img src={imgEdit ? imgEdit : data.img} alt="img-product" />
        </div>

        <label>Loại sản phẩm:</label>
          <Select
            placeholder="Select a option and change input text above"
            defaultValue={data.typeID}
            allowClear
            onChange={onchangeSelect}
            name="typeID"
          >
            <Option value="rau">Rau</Option>
            <Option value="cu">Củ</Option>
            <Option value="qua">Quả</Option>
            <Option value="nam">Nấm</Option>
          </Select>

        <label>kiểu sản phẩm:</label>
          <Select
            placeholder="Select a option and change input text above"
            defaultValue={data.species}
            allowClear
            onChange={onchangeSelect2}
            name="species"
          >
            <Option value="tuoi">Tươi</Option>
            <Option value="kho">khô</Option>
          </Select>

        <label>Mô tả sản phẩm:</label>
          <Input.TextArea
            name="content"
            onChange={onchangeInputContent}
            rows={4}
            maxLength={500}
            defaultValue={data.content}
          />

        <div className="groupButton">
          <Button className="btnSubmit" type="primary" danger onClick={handleCancel}>
            Huỷ
          </Button>
          <Button className="btnSubmit" type="primary" onClick={onFinish} >
            Chỉnh sửa
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default FromEditProduct;
