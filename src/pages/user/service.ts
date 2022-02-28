import { request } from 'umi';

// 登录
export async function login(params: any) {
  console.log(params);
  return request('/web/user/login', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

// 登录
export async function logout() {
  return request('/web/user/logout', {
    method: 'POST',
    skipErrorHandler: true,
  });
}

// 登录
export async function getUserInfo() {
  return request('/web/user/getUserInfo', {
    method: 'POST',
    skipErrorHandler: true,
  });
}
