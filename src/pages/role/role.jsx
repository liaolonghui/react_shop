import React, {Component} from 'react'
import { Card, Button, Table } from 'antd'

// 角色路由
export default class Role extends Component {

  state = {
    roles: [
      {
        "_id": "asdasda",
        "name": "角色1",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
      {
        "_id": "asdas",
        "name": "角色2",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
      {
        "_id": "asdasdasd",
        "name": "角色5",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
      {
        "_id": "qwer",
        "name": "王宝见",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
      {
        "_id": "qwerfgvc",
        "name": "蛇皮怪",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
      {
        "_id": "qwerfdasdgvc",
        "name": "蛇皮s怪",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
      {
        "_id": "qwerfsssgvc",
        "name": "蛇皮怪s",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
      {
        "_id": "qwaaaerfgvc",
        "name": "蛇皮怪ddd",
        "create_time": "2020-02-22",
        "auth_name": "王八羔子",
        "auth_time": "2020-05-12"
      },
    ]
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
        console.log('click-row', role, event)
      }
    }
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  render() {

    const { roles } = this.state
    
    const title = (
      <span>
        <Button type="primary" style={{marginRight: '15px'}}>创建角色</Button>
        <Button type="primary" disabled>设置角色权限</Button>
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
          rowSelection={{type: 'radio'}}
          onRow={this.onRow}
        />
      </Card>
    )
  }
}