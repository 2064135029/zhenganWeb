import { request } from 'umi';

// 查询
export async function getUserList() {
  return request('/web/user/getUserList', {
    method: 'POST',
    skipErrorHandler: true,
  });
}
