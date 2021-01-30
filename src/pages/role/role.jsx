import React, {Component} from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { connect } from 'react-redux'

import { reqRoles, reqAddRole }from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { reqUpdateRole } from '../../api'
// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'
import { logout } from '../../redux/actions'

// 角色路由
class Role extends Component {

  state = {
    roles: [],
    role: {},
    isShowAdd: false,
    isShowAuth: false
  }

  constructor(props) {
    super(props)
    // 创建一个ref容器
    this.auth = React.createRef()
  }

  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (createTime) => formateDate(createTime)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
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

  // 设置角色权限（更新角色）
  updateRole = async () => {
    this.setState({isShowAuth: false})
    const role = this.state.role
    // 获取最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    // role.auth_name = memoryUtils.user.username
    role.auth_name = this.props.user.username
    role.auth_time = Date.now()
    // 请求更新
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      // 如果当前更新的是自己角色的权限则强制退出
      if (role._id === this.props.user.role_id) {
        this.props.logout()
        message.warn('当前用户角色权限已更新，请重新登录！')
      } else {
        message.success('设置角色权限成功！')
        // this.getRoles()
        this.setState({
          roles: [...this.state.roles]
        })
      }
    } else {
      message.error('设置角色权限失败！')
    }
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {

    const { roles, role, isShowAdd, isShowAuth } = this.state
    
    const title = (
      <span>
        <Button type="primary" style={{marginRight: '15px'}} onClick={() => {this.setState({isShowAdd: true})}}>创建角色</Button>
        <Button type="primary" disabled={!role._id} onClick={() => {this.setState({isShowAuth: true})}}>设置角色权限</Button>
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
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({
                role
              })
            }
          }}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
            message.info('添加角色操作已取消！')
          }}
          destroyOnClose
        >
          <AddForm setForm={(form) => {this.form = form}}></AddForm>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
            message.info('设置角色权限操作已取消！')
          }}
        >
          <AuthForm ref={this.auth} role={role}></AuthForm>
        </Modal>
      </Card>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  { logout }
)(Role)