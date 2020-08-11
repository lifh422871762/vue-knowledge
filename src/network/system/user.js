import {request} from "../request";

export function search(page,size,status,loginName) {
  return request({
    url: '/user/search',
    params: {
      page,size,status,loginName
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/user/delete',
    params: {
      id
    }
  })
}

