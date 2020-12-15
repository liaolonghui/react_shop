import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import memoryUtils from '../../utils/memoryUtils'

// 后台管理的路由界面
export default class Admin extends Component {
  render () {
    const user = memoryUtils.user
    // 如果内存中没有存储user ==》 当前没有登录
    if (!user || !user._id) {
      // 在render()中如何自动跳转到login
      return <Redirect to='/login' />
    }
    return (
      <div>
        Hello {user.username}
      </div>
    )
  }
}