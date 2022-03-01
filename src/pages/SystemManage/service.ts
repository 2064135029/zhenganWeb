import { request } from 'umi';

// 查询
export async function getUserList() {
  return request('/web/user/getUserList', {
    method: 'POST',
    skipErrorHandler: true,
  });
}

export async function updateUser(params: any) {
  return request('/web/user/updateUser', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function addUser(params: any) {
  return request('/web/user/addUser', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function getRoles() {
  return request('/web/user/getRoles', {
    method: 'POST',
    skipErrorHandler: true,
  });
}

export async function updateRole(params: any) {
  return request('/web/user/updateRole', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

export async function addRole(params: any) {
  return request('/web/user/addRole', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
export async function getWxUserList(params: any) {
  return request('/web/user/getWxUserList', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}

//
export async function getWxPatientList(params: any) {
  return request('/web/user/getWxPatientList', {
    method: 'POST',
    data: params,
    skipErrorHandler: true,
  });
}
