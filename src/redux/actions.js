// 包含多个action creator函数的模块
// 同步action：对象  {type: '..', xxx: '...'}
// 异步action：函数  dispatch=>{......}
import { SET_HEAD_TITLE } from './action-types'

// 设置头部标题的action
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})