import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data={}, type='GET') {
  // 执行ajax请求
  // 成功了则调用resolve
  // 失败了不要调用reject，而是提示异常信息
  return new Promise((resolve, reject) => {
    let promise
    if (type==='GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(err => {
      message.error('请求出错了：' + err.message)
    })
  })
}