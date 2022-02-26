import { request } from 'umi';

// 登录
export async function getQueList(params: any) {
  return request('/web/que/list', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
