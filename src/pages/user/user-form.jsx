import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'

const Item = Form.Item
const { Option } = Select

// 添加用户/修改用户的form组件

export default class UserForm extends PureComponent {

  roleRef = React.createRef()
  
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }

  UNSAFE_componentWillMount() {
    this.props.setForm(this.roleRef)
  }

  render() {
    return (
      <div>
        <Form ref={this.roleRef} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
          <Item name="username" label="用户名：" rules={[{required: true, message: '用户名称必须输入！'}]}>
            <Input placeholder="请输入用户名称"></Input>
          </Item>
          <Item name="password" label="密码：" rules={[{required: true, message: '密码必须输入！'}]}>
            <Input placeholder="请输入密码" type="password"></Input>
          </Item>
          <Item name="phone" label="手机号：" rules={[{required: true, message: '手机号必须输入！'}]}>
            <Input placeholder="请输入手机号"></Input>
          </Item>
          <Item name="email" label="邮箱：" rules={[{required: true, message: '邮箱必须输入！'},{type: 'email', message: '请输入正确的邮箱！'}]}>
            <Input placeholder="请输入邮箱"></Input>
          </Item>
          <Item name="role_id" label="角色：" initialValue="jack" rules={[{required: true, message: '角色必须选择！'}]}>
            <Select style={{ width: 150 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Item>
        </Form>
      </div>
    )
  }
}