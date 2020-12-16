import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

const { Footer, Sider, Content } = Layout

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
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor: '#fff'}}>Content</Content>
          <Footer style={{textAlign: 'center', color: '#ccc'}}>推荐使用谷歌浏览器，可以获得更佳的页面操作体验。</Footer>
        </Layout>
      </Layout>
    )
  }
}