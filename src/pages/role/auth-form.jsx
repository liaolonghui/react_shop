import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuConfig from '../../config/menuConfig'

const Item = Form.Item

export default class AuthForm extends Component {

  static propTypes = {
    role: PropTypes.object
  }

  treeData = [
    {
      title: '平台权限',
      key: 'all',
      children: [...menuConfig]
    }
  ]

  render() {

    const { name } = this.props.role

    return (
      <Form>
        <Item label="角色名称：" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          <Input value={name} disabled></Input>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          treeData={this.treeData}
        />
      </Form>
    )
  }
}