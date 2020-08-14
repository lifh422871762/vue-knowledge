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

//新增用户对象
export function insert(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data: data
  })
}

//修改用户对象
export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data
  })
}

