import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { message, Modal, Button } from 'antd'
import { connect } from 'react-redux'

import './index.less'
// import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api'

const { confirm } = Modal

class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()), // 当前时间
    dayPicUrl: '', // 天气图片
    weather: '', // 天气文本
  }

  getTime = () => {
    this.intervalId = setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  getWeather = async () => {
    const {dayPicUrl, weather} = await reqWeather('南昌')
    this.setState({dayPicUrl, weather})
  }

  // getTitle = () => {
  //   const path = this.props.location.pathname
  //   let title
  //   // 从menuList中找出对应的title
  //   menuList.forEach(item => {
  //     if (item.key===path) {
  //       title = item.title
  //     } else if (item.children) {
  //       const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
  //       if (cItem) {
  //         title = cItem.title
  //       }
  //     }
  //   })
  //   return title
  // }

  // 退出登录
  logout = () => {
    // 先显示确认框
    confirm({
      content: '确定要退出吗？',
      onOk: () => {
        // 本地
        storageUtils.removeUser()
        // 内存
        memoryUtils.user = {}
        // 跳转
        message.success('退出成功！')
        this.props.history.replace('/login')
      },
      onCancel() {
        message.info('已取消退出！')
      },
    })
  }

  componentDidMount() {
    // 第一次render之后执行一次，做异步操作
    // 时间
    this.getTime()
    // 天气
    this.getWeather()
  }

  // 当前组件卸载前执行
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render() {

    const { currentTime, dayPicUrl, weather } = this.state
    const username = memoryUtils.user.username
    // const title = this.getTitle()  不用循环查找的方式了，改用redux管理头部标题
    const title = this.props.headTitle

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <Button type="primary" onClick={this.logout}>退出</Button>
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

export default connect(
  state => ({ headTitle: state.headTitle }),
  {}
)(withRouter(Header))