import {request} from "../request";

export function getUserData() {
  return request({
    url: '/home/getUserData'
  })
}
