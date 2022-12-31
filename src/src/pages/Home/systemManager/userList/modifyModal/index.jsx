/*
 * @Date: 2022-12-30 13:57:30
 * @LastEditTime: 2022-12-31 18:43:11
 * @Description:
 */

import React, { useState } from 'react';

import { Modal, Form, Input, Button } from 'antd';
import CitySelect from '../../../../../components/citySelect';

import './index.scss';

export default function index(props) {
  let { isShow, hideModifyModal } = props;

  console.log(isShow);
  let [isLoading, setIsLoading] = useState(false);

  const handleOk = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    hideModifyModal();
    console.log('Clicked cancel button');
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    setIsLoading(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCityChange = (value) => {
    console.log({ value });
  };

  return (
    <Modal
      title="新增用户"
      open={isShow}
      onOk={handleOk}
      wrapClassName="userModifyModal"
      width={400}
      centered
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" htmlType="submit" type="primary" loading={isLoading} onClick={handleOk}>
          保存
        </Button>,
      ]}
    >
      <Form
        name="userInfo"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入姓名!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
      </Form>
      <div className="area">
        <span className="label">地址&nbsp;:&nbsp;&nbsp;</span>
        <CitySelect change={handleCityChange} width="264px" value={['36', '3602', '360281']} />
      </div>
    </Modal>
  );
}
