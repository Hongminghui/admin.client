/*
 * @Date: 2022-12-30 13:57:30
 * @LastEditTime: 2023-01-02 21:37:07
 * @Description:
 */

import React, { useState, useEffect } from 'react';

import { Modal, Input } from 'antd';
import CitySelect from '../../../../../components/citySelect';
import { postData } from '../../../../../api';
import './index.scss';

export default function index(props) {
  const defaultCity = ['上海市', '上海市', '浦东新区'];
  // 根据selectedUserInfo来判断新增还是修改
  let { isShow, hideModifyModal, selectedUserInfo, refresh } = props;
  let [isLoading, setIsLoading] = useState(false);
  let [userInfo, setUserInfo] = useState();

  const handleOk = async () => {
    setIsLoading(true);
    userInfo.location = userInfo.location || defaultCity.join();
    const url = selectedUserInfo ? '/user/modifyUser' : '/user/addUser';
    postData(url, userInfo).then(() => {
      setIsLoading(false);
      hideModifyModal();
      refresh();
    });
  };

  const handleFormChange = (type, value) => {
    console.log({ value });
    setUserInfo({
      ...userInfo,
      [type]: value,
    });
  };

  console.log({ userInfo });

  useEffect(() => {
    setUserInfo(selectedUserInfo);
  }, [selectedUserInfo]);

  return (
    <Modal
      title={selectedUserInfo ? '修改用户' : '新增用户'}
      open={isShow}
      onOk={handleOk}
      onCancel={hideModifyModal}
      wrapClassName="userModifyModal"
      width={400}
      centered
      confirmLoading={isLoading}
      okText="保存"
      cancelText="取消"
    >
      <div className="wrapper">
        <div className="userNameArea form-item">
          <label htmlFor="nameInput">姓名&nbsp;:&nbsp;&nbsp;</label>
          <Input
            id="nameInput"
            value={userInfo?.userName}
            onChange={(e) => handleFormChange('userName', e.target.value)}
          />
        </div>
        <div className="emailArea form-item">
          <label htmlFor="emailInput">邮箱&nbsp;:&nbsp;&nbsp;</label>
          <Input
            id="emailInput"
            value={userInfo?.email}
            onChange={(e) => handleFormChange('email', e.target.value)}
          />
        </div>
        <div className="cityArea form-item">
          <label>地址&nbsp;:&nbsp;&nbsp;</label>
          <CitySelect
            handleChange={(value) => handleFormChange('location', value.join())}
            width="220px"
            city={userInfo?.location?.split(',') || defaultCity}
          />
        </div>
      </div>
    </Modal>
  );
}
