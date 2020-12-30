import React, {Component} from 'react'
import { Card, Button, Table, Modal } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import { reqUsers } from '../../api'

// 用户路由
export default class User extends Component {

  state = {
    users: [],  //  所有的用户列表
    roles: [],  // 所有的角色列表
    isShow: false,  // 是否显示对话框
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (roleId) => this.roleName[roleId]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <Button onClick={() => {this.setState({isShow: true})}}>修改</Button>
            <Button style={{marginLeft: '5px'}}>删除</Button>
          </span>
        )
      }
    ]
  }

  // 初始化RoleName对象，提高查找效率。（一次遍历即可，不用再每次查找时都重新遍历了。）
  initRoleName = (roles) => {
    const RoleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    },{})
    // 保存
    this.roleName = RoleNames
  }

  // 获取所有的用户列表
  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      // 初始化角色id为key，角色name为value的一个RoleName对象。
      this.initRoleName(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  // 添加或更新用户
  addOrUpdateUser = () => {

  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {

    const { users, isShow } = this.state

    const title = <Button type="primary" onClick={() => {this.setState({isShow: true})}}>创建用户</Button>

    return (
      <Card title={title} >
          <Table dataSource={users} columns={this.columns} pagination={{defaultPageSize: PAGE_SIZE}} loading={false} bordered rowKey="_id" />
          <Modal title="添加用户" visible={isShow} onOk={this.addOrUpdateUser} onCancel={() => {this.setState({isShow: false})}} destroyOnClose>
            <div>添加或删除用户</div>
          </Modal>
      </Card>
    )
  }
}