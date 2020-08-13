import {request} from "../request";

//查询用户列表
export function search(params) {
  return request({
    url: '/user/search',
    params: params
  })
}

//根据用户Id删除对象
export function deleteById(id) {
  return request({
    url: '/user/delete',
    params: {
      id
    }
  })
}

//根据用户Id查询对象
export function findById(id) {
  return request({
    url: '/user/findById',
    params: {
      id
    }
  })
}

