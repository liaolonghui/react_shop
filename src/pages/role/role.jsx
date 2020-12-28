import React, {Component} from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { reqRoles, reqAddRole }from '../../api'
import AddForm from './add-form'

// 角色路由
export default class Role extends Component {

  state = {
    roles: [],
    role: {},
    isShowAdd: false
  }

  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time'
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }

  onRow = role => {
    return {
      onClick: event => {  // 点击了行
        this.setState({role})
      }
    }
  }

  // 获取角色列表
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({roles})
    }
  }

  // 添加角色
  addRole = () => {
    this.form.current.validateFields().then(async values => {
      this.setState({isShowAdd: false})
      const result = await reqAddRole(values.roleName)
      if (result.status === 0) {
        message.success('添加角色成功！')
        const role = result.data
        // // 新产生一个数组roles
        // const roles = [...this.state.roles]
        // roles.push(role)
        // this.setState({roles})
        // 函数方式更新state，当更新状态基于原有状态时推荐使用下面的方式。
        this.setState(state => ({
          roles: [...state.roles, role]
        }))
      } else {
        message.error('添加角色失败！')
      }
    })
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {

    const { roles, role, isShowAdd } = this.state
    
    const title = (
      <span>
        <Button type="primary" style={{marginRight: '15px'}} onClick={() => {this.setState({isShowAdd: true})}}>创建角色</Button>
        <Button type="primary" disabled={!role._id}>设置角色权限</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: 5}}
          rowSelection={{type: 'radio', selectedRowKeys: [role._id]}}
          onRow={this.onRow}
        />
        <Modal title="添加角色" visible={isShowAdd} onOk={this.addRole} onCancel={() => {this.setState({isShowAdd: false})}} destroyOnClose>
          <AddForm setForm={(form) => {this.form = form}}></AddForm>
        </Modal>
      </Card>
    )
  }
}