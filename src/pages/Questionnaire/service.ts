import { request } from 'umi';

// 查询
export async function getQueList(params: any) {
  return request('/web/que/list', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

// 查询
export async function addQue(params: any) {
  return request('/web/que/add', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
