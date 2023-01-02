/*
 * @Date: 2022-12-22 22:08:51
 * @LastEditTime: 2023-01-02 21:43:41
 * @Description:
 */
import React, { useEffect, useState } from 'react';

import { Table, Button } from 'antd';

import { getData } from '../../../../api';
import { formatDate } from '../../../../utils';

import ModifyModal from './modifyModal';

import './index.scss';

export default function UserList() {
  let [userList, setUserList] = useState([]);

  const [isShow, setIsShow] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState();

  const columns = [
    { title: '用户名', dataIndex: 'userName', key: 'userName', width: 70 },
    { title: '邮箱', dataIndex: 'email', key: 'email', width: 120 },
    { title: '地址', dataIndex: 'location', key: 'location' },
    { title: '加入时间', dataIndex: 'addTime', key: 'addTime' },
    { title: '操作', dataIndex: 'operate', key: 'operate' },
  ];

  const showModifyModal = (userInfo) => {
    setSelectedUserInfo(userInfo);
    setIsShow(true);
  };

  const hideModifyModal = () => {
    setIsShow(false);
  };

  const showDeleteModal = () => {
  };

  async function getUserList() {
    let data = await getData('/user/userList');
    const newData = data.map((item) => (
      {
        ...item,
        key: item.userId,
        addTime: formatDate(item.addTime),
        operate: (
          <>
            <Button type="link" className="delete" onClick={() => showDeleteModal()}>删除</Button>
            <Button type="link" className="modify" onClick={() => showModifyModal(item)}>修改</Button>
          </>
        ),
      }
    ));
    setUserList(newData);
  }

  const refresh = () => {
    getUserList();
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="pageUserList">
      <div className="header">
        <Button type="primary" size="middle" onClick={() => showModifyModal()}>新增</Button>
      </div>
      <Table dataSource={userList} columns={columns} size="small" bordered />
      <ModifyModal
        isShow={isShow}
        hideModifyModal={hideModifyModal}
        selectedUserInfo={selectedUserInfo}
        refresh={refresh}
      />
    </div>
  );
}
