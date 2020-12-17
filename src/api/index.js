import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')


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