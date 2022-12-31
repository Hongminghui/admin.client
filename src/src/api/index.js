/*
 * @Date: 2022-12-18 21:42:14
 * @LastEditTime: 2022-12-26 23:43:10
 * @Description: 封装请求方法
 */

const serverUrl = 'http://127.0.0.1:8080';

export const getData = async (url) => {
  const result = await fetch(`${serverUrl}${url}`);
  return result.json();
};

export const postData = async (url, data) => {
  const result = await fetch(`${serverUrl}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return result.json().then((res) => {
    const code = res.code ? `[${res.code}]` : '';
    return {
      resText: `${res.text}${code}`,
      errCode: res.code,
    };
  });
};
