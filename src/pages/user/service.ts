import { request } from 'umi';

// 登录
export async function login(params: any) {
  console.log(params);
  return request('/web/user/login', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
    noToken: true,
  });
}
