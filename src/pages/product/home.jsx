import React, {Component} from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reqProducts, reqSearchProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

// home Product的默认子路由界面
export default class ProductHome extends Component {

  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: "", // 搜索的关键字
    searchType: "productName", // 根据哪个字段搜索？
  }

  // 初始化表格的columns
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        width: 110,
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥'+price  // 指定了dataIndex之后接受到的是指定的dataIndex
      },
      {
        width: 110,
        title: '状态',
        dataIndex: 'status',  // status为0时为下架，1时为在售。
        render: (status) => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        width: 110,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <Button onClick={() => {this.props.history.push('/product/detail', {product})}}>详情</Button>
              <Button>修改</Button>
            </span>
          )
        }
      }
    ]
  }

  // 获取指定页码的数据显示
  getProducts = async (pageNum) => {
    // 显示loading
    this.setState({loading: true})
    const {searchName, searchType} = this.state
    // 发请求
    // 如果搜索关键字有值说明要进行搜索分页
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else {  // 一般分页
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    // 隐藏loading
    this.setState({loading: false})
    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render() {

    const { products, total, loading, searchType, searchName } = this.state

    const title = (
      <span>
        <Select style={{width: '150px'}} value={searchType} onChange={value => this.setState({searchType: value})}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{width: '150px', margin: '0 15px'}} value={searchName} onChange={e => this.setState({searchName: e.target.value})}></Input>
        <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>添加商品</Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            total: total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
          rowKey="_id"
          bordered>
        </Table>
      </Card>
    )
  }
}