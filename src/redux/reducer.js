import { combineReducers } from 'redux'
import storageUtils from '../utils/storageUtils'
import { SET_HEAD_TITLE } from './action-types'
// 用于根据老的state和指定的action生成并返回新的state的函数

// 用于管理头部标题的reducer
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

// 用于管理当前登录用户的reducer
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
  switch (action.type) {
    default:
      return state
  }
}


export default combineReducers({
  headTitle,
  user
})