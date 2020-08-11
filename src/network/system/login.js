import {request} from "../request";

export function login(loginName,loginPassword) {
  return request({
    url: '/login',
    params: {
      loginName,
      loginPassword
    }
  })
}

export function loginout() {
  return request({
    url: '/loginout'
  })
}
