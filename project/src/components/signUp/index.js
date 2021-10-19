import React from 'react'
import { Form, Input, Button, InputNumber, Select } from 'antd';
import {Link} from "react-router-dom"
import './style.scss'

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },

};

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const SingUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    form.resetFields();
  };

  return (
    <div className="singUp">
      <Form
        name="singUp"
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
         <Form.Item
          label="Họ Tên"
          name="hoten"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
        >
          <Select
            placeholder="Select a option and change input text above"
            //onChange={onGenderChange}
            allowClear
          >
            <Option value="nam">Nam</Option>
            <Option value="nu">Nữ</Option>
            <Option value="khac">Khác</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' },
            ({ getFieldValue }) => ({
              validator(rule, value = "") {
                //const user = dataUser.filter(item => item.userName.toLowerCase() === value.toLowerCase())
                // if (user.length > 0) {
                //   return Promise.reject("tên đăng nhập đã tồn tại hoặc không hợp lệ");
                // } else {
                //   return Promise.resolve();
                // }
              }
            })
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nhập lại Password"
          name="password2"
          rules={[{ required: true, message: 'Please input your confirm password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Link to="/login" >
            <Button type="primary">
              Quay lại trang đăng nhập
            </Button>
          </Link>
          <Button type="primary" danger htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SingUp;
