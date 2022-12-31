import md5 from 'blueimp-md5';

export function encrypt(value, key) {
  return md5(value, key);
}

export function formatDate(dateStr) {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

/**
 * @description: 找到根节点
 * @param {*} list 要找到根节点的列表，默认输入为{ id, pId = 0, name }的结构
 * @param {*} outputInfo 输出的结构
 * @return {*}
 */
function findRoot(list, outputInfo = { name: 'label', value: 'value' }) {
  const { name, value } = outputInfo;
  const obj = {};
  list.forEach((item) => {
    if (item.pId === '0') {
      obj[item.id] = { [name]: item.name, [value]: item.id, children: [] };
    }
  });

  return obj;
}

/**
 * @description: 把一维数组转换成树形结构
 * @param {*} data 一维数组，默认输入为{ id, pId = 0, name }的结构
 * @param {*} outputInfo 要输出的结构
 * @return {*}
 */
export function formatListToTree(data, outputInfo = { name: 'label', value: 'value' }) {
  const { name, value } = outputInfo;

  const rootMap = findRoot(data);
  const nodeMap = { ...rootMap };

  data.forEach((item) => {
    const { id, pId, name: nodeName } = item;
    if (rootMap[id]) {
      return;
    }

    const tmpNode = { [name]: nodeName, [value]: id, children: [] };

    // 把当前节点的父节点加上，这样子节点比父节点先出现也没关系
    let parentNode = nodeMap[pId];
    if (parentNode) {
      parentNode.children.push(tmpNode);
    } else {
      parentNode = { [value]: pId, children: [item] };
      nodeMap[pId] = parentNode;
    }

    // 加上node或者补全node信息
    const node = nodeMap[id];
    if (node) {
      nodeMap[id][name] = nodeName;
    } else {
      nodeMap[id] = tmpNode;
    }
  });

  return Object.values(rootMap);
}
