import React from 'react';
import { Cascader } from 'antd';
import { formatListToTree } from '../../utils';
import cityList from '../../config/city.json';

export default function index(props) {
  console.log({ cityList: cityList.slice(0, 10) });
  const { handleChange, width, city } = props;

  const options = formatListToTree(cityList);
  return (
    <Cascader
      defaultValue={['11', '1101', '110101']}
      options={options}
      onChange={handleChange}
      style={{ width }}
      value={city}
      allowClear={false}
      fieldNames={{ label: 'label', value: 'label' }}
    />
  );
}
