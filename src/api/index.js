import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
// 添加分类
export const reqAddCategory = ({categoryName, parentId}) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')
// 更新分类
export const reqUpdateCagegory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})

// 获取商品分类列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})

// 更新商品的状态（上架/下架）
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')

// 搜索商品分类列表（根据商品名称/商品描述）
// searchType的值是productName或productDesc
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

// 天气查询          jsonp
// 6c495fc6eeae6b603d48436aa7eb25f7
// https://restapi.amap.com/v3/weather/weatherInfo?parameters       key city extensions output
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&output=json&key=6c495fc6eeae6b603d48436aa7eb25f7`
    jsonp(url, {}, (err, data)=> {
      if (!err && data.status==='1') {
        // 成功
        const weather = data.lives[0].weather
        let dayPicUrl = ''
        if (weather === '晴') {
          dayPicUrl = 'http://api.map.baidu.com/images/weather/day/qing.png'
        } else {
          dayPicUrl = 'http://api.map.baidu.com/images/weather/day/yin.png'
        }
        resolve({weather, dayPicUrl})
      } else {
        // 失败
        message.error('获取天气信息失败！')
      }
    })
  })

}