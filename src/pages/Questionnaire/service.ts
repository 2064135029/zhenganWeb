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
