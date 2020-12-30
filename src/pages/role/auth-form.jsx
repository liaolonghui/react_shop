import React, { PureComponent } from 'react'
import { Form, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuConfig from '../../config/menuConfig'

const Item = Form.Item

export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  constructor(props) {
    super(props)
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  // 为父组件提交获取最新menus数据的方法
  getMenus = () => this.state.checkedKeys

  // 树形控件的选项数据
  treeData = [
    {
      title: '平台权限',
      key: 'all',
      children: [...menuConfig]
    }
  ]

  onCheck = (checkedKeys, info) => {
    this.setState({
      checkedKeys
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }

  render() {

    const { name } = this.props.role

    return (
      <Form>
        <Item label="角色名称：" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
          <Input value={name} disabled></Input>
        </Item>
        <Tree
          checkable
          checkedKeys={this.state.checkedKeys}
          defaultExpandAll
          onCheck={this.onCheck}
          treeData={this.treeData}
        />
      </Form>
    )
  }
}