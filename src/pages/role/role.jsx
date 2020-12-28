import React, {Component} from 'react'
import { Card, Button, Table } from 'antd'

import { reqRoles }from '../../api'

// 角色路由
export default class Role extends Component {

  state = {
    roles: [],
    role: {}
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

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({roles})
    }
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {

    const { roles,role } = this.state
    
    const title = (
      <span>
        <Button type="primary" style={{marginRight: '15px'}}>创建角色</Button>
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
      </Card>
    )
  }
}