// 进行local数据存储管理的工具模块
const USER_KEY = 'user_key'
export default {
  // 存
  saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  // 取
  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  // 删
  removeUser() {
    localStorage.removeItem(USER_KEY)
  }
}