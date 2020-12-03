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

  // 验证密码（自定义验证）
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码！')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位！')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位！')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文，数字或者下划线组成！')
    } else {
      callback()
    }
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
                { required: true, message: '请输入你的用户名！' },
                { min: 4, message: '用户名至少4位！' },
                { max: 12, message: '用户名最多12位！' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或者下划线组成！' }
              ]}
            >
              <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item 
              name="password"
              rules={[
                { validator: this.validatePwd }
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