import { request } from 'umi';

// 查询
export async function getQueList(params: any) {
  return request('/web/que/list', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

// 新增
export async function addQue(params: any) {
  return request('/web/que/add', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

// 修改
export async function updateQue(params: any) {
  return request('/web/que/update', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

// 根据id查询
export async function getQueById(id: string) {
  return request('/web/que/getQueById', {
    method: 'POST',
    data: { id: id },
    skipErrorHandler: true,
  });
}

// 修改
export async function releaseQue(params: any) {
  return request('/web/que/release', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function getTopicList(params: any) {
  return request('/web/que/getTopicList', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function updateTopic(params: any) {
  return request('/web/que/updateTopic', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function updateAnswer(params: any) {
  return request('/web/que/updateAnswer', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function addTopic(params: any) {
  return request('/web/que/addTopic', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function addAnswer(params: any) {
  return request('/web/que/addAnswer', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function getAllCate(params: any) {
  return request('/web/category/getAllCate', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function getSubByCate(params: any) {
  return request('/web/category/getSubByCate', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
