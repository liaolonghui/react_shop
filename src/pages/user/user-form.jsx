import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'

const Item = Form.Item
const { Option } = Select

// 添加用户/修改用户的form组件

export default class UserForm extends PureComponent {

  roleRef = React.createRef()
  
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  UNSAFE_componentWillMount() {
    this.props.setForm(this.roleRef)
  }

  render() {

    const {roles} = this.props
    const user = this.props.user || {}

    return (
      <div>
        <Form ref={this.roleRef} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
          <Item name="username" label="用户名：" initialValue={user.username} rules={[{required: true, message: '用户名称必须输入！'}]}>
            <Input placeholder="请输入用户名称"></Input>
          </Item>
          {
            user._id ? null : (
              <Item name="password" label="密码：" initialValue={user.password} rules={[{required: true, message: '密码必须输入！'}]}>
                <Input placeholder="请输入密码" type="password"></Input>
              </Item>
            )
          }
          <Item name="phone" label="手机号：" initialValue={user.phone} rules={[{required: true, message: '手机号必须输入！'}]}>
            <Input placeholder="请输入手机号"></Input>
          </Item>
          <Item name="email" label="邮箱：" initialValue={user.email} rules={[{required: true, message: '邮箱必须输入！'},{type: 'email', message: '请输入正确的邮箱！'}]}>
            <Input placeholder="请输入邮箱"></Input>
          </Item>
          <Item name="role_id" label="角色：" initialValue={user.role_id} rules={[{required: true, message: '角色必须选择！'}]}>
            <Select style={{ width: 160 }} placeholder="请选择角色">
              {
                roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
              }
            </Select>
          </Item>
        </Form>
      </div>
    )
  }
}