/*
 * @Date: 2022-12-22 22:08:51
 * @LastEditTime: 2022-12-31 20:00:09
 * @Description:
 */
import React, { useEffect, useState } from 'react';

import { Table, Button } from 'antd';

import { getData } from '../../../../api';
import { formatDate } from '../../../../utils';

import ModifyModal from './modifyModal';

import './index.scss';

export default function UserList() {
  console.log('用户列表');

  let [userList, setUserList] = useState([]);

  const [isShow, setIsShow] = useState(false);

  const columns = [
    { title: '用户名', dataIndex: 'userName', key: 'userName' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '地址', dataIndex: 'location', key: 'location' },
    { title: '加入时间', dataIndex: 'addTime', key: 'addTime' },
    { title: '操作', dataIndex: 'operate', key: 'operate' },
  ];

  const showModifyModal = () => {
    setIsShow(true);
  };

  const hideModifyModal = () => {
    setIsShow(false);
  };

  const showDeleteModal = () => {
    console.log('delete');
  };

  async function getUserList() {
    let data = await getData('/user/userList');
    console.log(data);
    const newData = data.map((item) => (
      {
        ...item,
        key: item.userId,
        addTime: formatDate(item.addTime),
        operate: (
          <>
            <Button type="link" className="delete" onClick={() => showDeleteModal()}>删除</Button>
            <Button type="link" className="modify" onClick={() => showModifyModal(true)}>修改</Button>
          </>
        ),
      }
    ));
    console.log({ newData });
    setUserList(newData);
  }

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="pageUserList">
      <div className="header">
        <Button type="primary" size="middle" onClick={() => showModifyModal(false)}>新增</Button>
      </div>
      <Table dataSource={userList} columns={columns} size="small" bordered />
      <ModifyModal isShow={isShow} hideModifyModal={hideModifyModal} />
    </div>
  );
}
