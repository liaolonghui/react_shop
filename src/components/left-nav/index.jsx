import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu } from 'antd'
import { connect } from 'react-redux'

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
// import memoryUtils from '../../utils/memoryUtils'
import { setHeadTitle } from '../../redux/actions'
import './index.less'

const { SubMenu } = Menu

class LeftNav extends Component {

  // 判断当前用户对item是否有权限
  hasAuth = (item) => {
    const {key, isPublic} = item
    // const menus = memoryUtils.user.role.menus
    // const username = memoryUtils.user.username
    const menus = this.props.user.role.menus
    const username = this.props.user.username
    // 1.如果是admin用户则直接通过
    // 2.如果当前item是公共的
    // 3.看key在不在menus中
    if (username === 'admin' || isPublic || menus.indexOf(key)!==-1 ) {
      return true
    } else if(item.children) {  // 4.如果当前用户有某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key)!==-1)
    }
    return false
  }

  // 根据menu的数据数组生成对应的标签数组
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname

    return menuList.map(item => {
      // 如果用户有对应的权限才显示对应item(菜单项)
      if (this.hasAuth(item)) { 
        // item是一个对象，可能有children属性
        // 返回<Menu.Item>或者<SubMenu>
        if (!item.children) {
          // 当前要显示的头部标题  判断item是否是当前对应的item
          if (item.key===path || path.indexOf(item.key)===0) {
            this.props.setHeadTitle(item.title)
          }
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key} onClick={() => {this.props.setHeadTitle(item.title)}}>
                {item.title}
              </Link>
            </Menu.Item>
          )
        } else {
          // 查找一个与当前请求路径匹配的子Item。如果存在就说明当前item的子列表需要打开。
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          if (cItem) {
            this.openKey = item.key
          }
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          )
        }
      }
    })
  }

  // 第一次render前执行，执行一次。为第一次render准备数据（同步）。
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    // 得到当前请求的路由路径
    let path = this.props.location.pathname
    if (path.indexOf('/product') === 0) {
      // 当前请求的是商品界面或其子路由界面
      path = '/product'
    }
    // 得到需要打开菜单项的key
    const openKey = this.openKey

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理</h1>
        </Link>
        <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
          { this.menuNodes }
        </Menu>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  { setHeadTitle }
)(withRouter(LeftNav))