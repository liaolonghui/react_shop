import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu } from 'antd'

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu

class LeftNav extends Component {

  // 根据menu的数据数组生成对应的标签数组
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname

    return menuList.map(item => {
      // item是一个对象，可能有children属性
      // 返回<Menu.Item>或者<SubMenu>
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {

        // 查找一个与当前请求路径匹配的子Item。如果存在就说明当前item的子列表需要打开。
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }
        
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  // 第一次render前执行，执行一次。为第一次render准备数据（同步）。
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    // 得到当前请求的路由路径
    const path = this.props.location.pathname
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

export default withRouter(LeftNav)