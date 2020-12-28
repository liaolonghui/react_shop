import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item

export default class AddForm extends Component {

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
        <Form ref={this.roleRef}>
          <Item name="roleName" label="角色名称：" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} rules={[{required: true, message: '角色名称必须输入！'}]}>
            <Input placeholder="请输入角色名称"></Input>
          </Item>
        </Form>
      </div>
    )
  }
}