import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import './index.less'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api'

class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()), // 当前时间
    dayPicUrl: '', // 天气图片
    weather: '', // 天气文本
  }

  getTime = () => {
    setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  getWeather = async () => {
    const {dayPicUrl, weather} = await reqWeather('南昌')
    this.setState({dayPicUrl, weather})
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    // 从menuList中找出对应的title
    menuList.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key===path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  componentDidMount() {
    // 第一次render之后执行一次，做异步操作
    // 时间
    this.getTime()
    // 天气
    this.getWeather()
  }

  render() {

    const { currentTime, dayPicUrl, weather } = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <a href="javascript(0);">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPicUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)