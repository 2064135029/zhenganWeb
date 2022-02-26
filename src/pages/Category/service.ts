import { request } from 'umi';

// 查询
export async function getCategoryList(params: any) {
  return request('/web/category/list', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

// 新增
export async function addCategory(params: any) {
  return request('/web/category/add', {
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
