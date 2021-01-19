import React, {Component} from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import { reqAddOrUpdateUser, reqDeleteUser, reqUsers } from '../../api'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from './user-form'

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
            <Button onClick={() => {this.showUpdate(user)}}>修改</Button>
            <Button style={{marginLeft: '5px'}} onClick={() => {this.deleteUser(user)}}>删除</Button>
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

  // 删除用户
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除 ${user.username} 用户吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功！')
          this.getUsers()
        } else {
          message.error('删除用户失败！')
        }
      },
      onCancel: () => {
        message.info(`已取消删除操作！`)
      }
    })
  }

  // 显示添加用户的面板
  showAdd = () => {
    // 最佳方式清除之前保存的user
    this.user = null
    this.setState({isShow: true})
  }

  // 显示更新用户的面板
  showUpdate = (user) => {
    this.user = user  // 保存user 
    this.setState({isShow: true})
  }

  // 添加或更新用户
  addOrUpdateUser = () => {
    this.form.current.validateFields().then(async values => {
      // 判断是否是更新操作  是更新则要给values添加user._id
      if (this.user) {
        values._id = this.user._id
      }
      // 1.收集输入数据
      // 2.提交添加的请求
      const result = await reqAddOrUpdateUser(values)
      // 3.更新列表显示
      if (result.status === 0) {
        message.success(`${this.user?'修改':'添加'}用户成功！`)
        this.getUsers()
        this.setState({isShow: false})
      } else {
        message.error(`${this.user?'修改':'添加'}用户失败！`)
      }
    })
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {

    const { users, roles, isShow } = this.state
    const user = this.user

    const title = <Button type="primary" onClick={this.showAdd}>创建用户</Button>

    return (
      <Card title={title} >
          <Table dataSource={users} columns={this.columns} pagination={{defaultPageSize: PAGE_SIZE}} loading={false} bordered rowKey="_id" />
          <Modal title={user ? "修改用户" : "添加用户"} visible={isShow} onOk={this.addOrUpdateUser} onCancel={() => {this.setState({isShow: false})}} destroyOnClose>
            <UserForm user={user} roles={roles} setForm={(form) => {this.form = form}}></UserForm>
          </Modal>
      </Card>
    )
  }
}