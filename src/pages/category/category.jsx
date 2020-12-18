import React, {Component} from 'react'
import { Card, Table, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqCategorys } from '../../api'
import { ArrowRightOutlined } from '@ant-design/icons'

// 商品分类路由
export default class Category extends Component {

  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 子分类列表
    parentId: '0', // 当前需要显示的分类列表的parentI的，默认获取一级分类列表
    parentName: '', // 父分类名称，默认为空
  }

  // 初始化table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 指定返回需要显示的元素
          <span>
            <Button>修改分类</Button>
            {this.state.parentId==='0' ? <Button style={{marginLeft: '10px'}} onClick={() => {this.showSubCategorys(category)}}>查看子分类</Button> : null}
          </span>
        )
      }
    ]
  }

  // 异步获取一级/二级分类列表
  getCategorys = async () => {
    // 发请求前先loading
    this.setState({loading: true})
    const {parentId} = this.state
    const result = await reqCategorys(parentId)
    // 发完请求后隐藏loading
    this.setState({loading: false})
    if (result.status === 0) {
      const categorys = result.data
      // 更新状态，要判断是一级还是二级分类列表数据
      if (parentId === '0') {
        this.setState({categorys})
      } else {
        this.setState({subCategorys: categorys})
      }
    } else {
      message.error('获取分类列表失败！')
    }
  }

  // 显示指定一级分类对象的二级分类列表
  showSubCategorys(category) {
    // 先更新状态，再获取二级分类列表
    this.setState({
      parentId: category._id,
      parentName: category.name
    },() => {
      this.getCategorys() // 获取二级分类列表
    })
  }

  // 显示一级分类列表
  showCategorys() {
    // 把state中的subCategorys清空，parentId置为'0'，parentName置为''。
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    // 获取一级分类列表
    this.getCategorys()
  }

  render() {

    // 读取状态数据
    const {loading, subCategorys, parentId, parentName, categorys} = this.state

    // card的右侧标题
    const title = parentId === '0' ? "一级分类列表" : (
      <span>
        <Button onClick={() => {this.showCategorys()}}>一级分类列表</Button>
        <ArrowRightOutlined style={{margin: '0 10px'}} />
        <span>{parentName}</span>
      </span>
    )
    // card的右侧
    const extra = <Button icon={<PlusOutlined />} type="primary">添加</Button>

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table dataSource={parentId==='0' ? categorys : subCategorys} columns={this.columns} pagination={{defaultPageSize: 5, showQuickJumper: true}} loading={loading} bordered rowKey="_id" />
        </Card>
      </div>
    )
  }
}