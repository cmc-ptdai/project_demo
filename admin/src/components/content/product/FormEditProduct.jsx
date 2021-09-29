import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { editUser } from '../../../redux/action/userAction'
import userApi from '../../../api/apiUser'
import { getUser } from '../../../redux/action/userAction';

const FromEditProduct = (props) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const onFinish = (value) => {
    // const newData = {
    //   valueForm: value,
    //   dataUser: props.dataUser
    // }
    // dispatch(editUser(newData))
    // setTimeout( async () => {
    //   try {
    //     const listUser = await userApi.getAllUser()
    //     dispatch(getUser(listUser))
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }, 500);
    console.log(value);
    handleCancel()
  }
  const handleCancel =  () => {
    props.editStatusFrom(false)
    form.resetFields();
    console.log(123123);
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="Chỉnh sửa sản phẩm"
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <label>Tên sản phẩm:</label>
          <Form.Item
            name="name"
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  //const re = /^[a-zA-Z]{25}/;
                  if (value.length > 25) {
                    return Promise.reject("Tối đa 25 kí tự");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input
              defaultValue={props.data.name}
            />
          </Form.Item>
          <label>giá tiền:</label>
          <Form.Item
            name="price"
          >
            <Input
              defaultValue={props.data.price}
            />
          </Form.Item>
          <label>giảm giá (%):</label>
          <Form.Item
            name="sale"
          >
            <Input
              defaultValue={props.data.sale}
            />
          </Form.Item>
          <label>Ảnh mô tả sản phẩm:</label>
          <Form.Item
            name="img"
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  if (value.length > 200) {
                    return Promise.reject("tối đa 200 kí tự");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input
              defaultValue={props.data.img}
            />
          </Form.Item>
          <label>Loại sản phảm:</label>
          <Form.Item
            name="typeID"
          >
            <Input
              defaultValue={props.data.typeID}
            />
          </Form.Item>
          <label>kiểu sản phẩm:</label>
          <Form.Item
            name="species"
          >
            <Input
              defaultValue={props.data.species}
            />
          </Form.Item>
          <Form.Item  className="groupButton">
            <Button className="btnSubmit" type="primary" danger onClick={handleCancel}>
              Huỷ
            </Button>
            <Button className="btnSubmit" type="primary" htmlType="submit" >
              Chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FromEditProduct;
