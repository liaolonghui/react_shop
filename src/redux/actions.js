// 包含多个action creator函数的模块
// 同步action：对象  {type: '..', xxx: '...'}
// 异步action：函数  dispatch=>{......}
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'
import { reqLogin } from '../api'
import storageUtils from '../utils/storageUtils'
import { message } from 'antd'

// 设置头部标题的action
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

// 接收用户信息的action
export const receiveUser = (user) => ({type: RECEIVE_USER, user})
// 显示错误信息的action
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})

// 登录的异步action
export const login = ({username, password}) => {
  return async dispatch => {
    // 执行异步ajax请求
    const result = await reqLogin(username, password)
    // 成功分发成功action
    // 失败分发失败action
    if (result.status===0) {
      message.success('登录成功！')
      const user = result.data
      // 保存到localstorage中
      storageUtils.saveUser(user)
      // 分发接受用户的同步action
      dispatch(receiveUser(user))
    } else {
      const msg = result.msg
      // message.error(msg)
      dispatch(showErrorMsg(msg))
    }
  }
}

// 退出登录
export const logout = () => {
  // 清除localstorage中的user信息等
  storageUtils.removeUser()
  message.success('退出成功！')
  // 再返回action
  return {type: RESET_USER}
}