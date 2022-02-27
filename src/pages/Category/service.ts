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
export async function updateCate(params: any) {
  return request('/web/category/update', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
// 修改
export async function updateSub(params: any) {
  return request('/web/subclass/update', {
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

// 添加子类
export async function addSubClass(params: any) {
  return request('/web/subclass/add', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
