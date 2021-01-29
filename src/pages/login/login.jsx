import React, { Component } from "react"
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from "react-router-dom"

// 登录的路由界面
export default class Login extends Component {

  onFinish = async (values) => {
    const { username, password } = values
    const data = await reqLogin(username, password)
    if (data.status !==0) {
      message.error(data.msg)
    } else {
      message.success('登录成功！')
      // 保存user
      const user = data.data
      memoryUtils.user = user  // 保存在内存中
      storageUtils.saveUser(user)  // 保存在localstorage中
      // 跳转到管理界面
      this.props.history.replace('/home')
    }
  }

  // 验证密码（自定义验证）
  validatePwd = (rule, value, callback) => {
    if (!value) {
      return Promise.reject('请输入密码！')
    } else if (value.length < 4) {
      return Promise.reject('密码长度不能小于4位！')
    } else if (value.length > 12) {
      return Promise.reject('密码长度不能大于12位！')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须是英文，数字或者下划线组成！')
    } else {
      // callback()在antd4中应都改为return Promise.reject('...')或者return Promise.resolve()
      return Promise.resolve()
    }
  }

  render () {
    // 如果用户已登录则直接跳转到管理界面
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect path='/' />
    }

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