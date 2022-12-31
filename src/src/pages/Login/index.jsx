/*
 * @Date: 2022-12-05 22:11:57
 * @LastEditTime: 2022-12-25 20:00:46
 * @Description: 登陆页面
 */
import React from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Input,
  Button,
  Form,
  message,
} from 'antd';

import { encrypt } from '../../utils';
import { postData } from '../../api';

import './index.scss';

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (userInfo) => {
    const { userName, password } = userInfo;
    const secretKey = `cms-${userName}`;
    const cipherPassword = encrypt(password, secretKey);

    const sendData = { ...userInfo, password: cipherPassword };
    const { resText, errCode } = await postData('/auth/login', sendData);
    if (errCode) {
      message.error(resText);
      return;
    }

    navigate('/systemManager/userList');
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <div className="page-login">
      <h2 className="title">CMS-内容管理系统</h2>
      <div className="form-wrapper">
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登 陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
