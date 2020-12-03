import React, { Component } from "react"
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './login.less'
import logo from './images/logo.png'

// 登录的路由界面
export default class Login extends Component {

  onFinish = (values) => {
    console.log(values)
  }

  render () {
    return (
      <div className="login">
        <header className="login-header">
          <img src={ logo } alt="logo" />
          <h1>React后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入你的用户名！',
                },
              ]}
            >
              <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item 
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入你的密码！',
                },
              ]}
            >
              <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} className="site-form-item-icon" />} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}