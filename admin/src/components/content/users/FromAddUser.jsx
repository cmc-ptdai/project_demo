import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { editUser } from '../../../redux/action/userAction'
import userApi from '../../../api/apiUser'
import { getUser } from '../../../redux/action/userAction';

const FromEdit = (props) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true)
  const onFinish = (value) => {
    dispatch(editUser(value))
    handleCancel()
  }
  const handleCancel =  () => {
    props.editStatusFromAdd(false)
    form.resetFields();
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="Điền thông tin"
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
          <label>Họ tên:</label>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' },
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
            <Input />
          </Form.Item>
          <label>Số điện thoại:</label>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' },
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                  if (!re.test(value)) {
                    return Promise.reject("chưa đúng định dạng số điện thoại");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
          <label>Email:</label>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' },
              ({ getFieldValue }) => ({
                validator(rule, value = "") {
                  //eslint-disable-next-line
                  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                  if (!re.test(value)) {
                    return Promise.reject("email chưa đúng đinh dạng email @,com,gmail,.....");
                  } else {
                    return Promise.resolve();
                  }
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
          <label>Địa chỉ:</label>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please input your address!' },
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
            <Input />
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

export default FromEdit;
