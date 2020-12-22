import React, {Component} from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const Option = Select.Option

// home Product的默认子路由界面
export default class ProductHome extends Component {

  state = {
    products: [
      {
        "status": 0,
        "_id": "sedeasd",
        "name": "哈哈哈哈哈",
        "desc": "什么都没有",
        "price": 250,
        "pCategoryId": "gbhnjmk",
        "categoryId": "fyvgbhunjm",
        "detail": "详情",
        "__v": 0 
      },
      {
        "status": 1,
        "_id": "sedeasd",
        "name": "假数据",
        "desc": "真的什么都没有",
        "price": 55555,
        "pCategoryId": "gbhnjmk",
        "categoryId": "fyvgbhunjm",
        "detail": "详情",
        "__v": 0 
      },
    ], // 商品的数组
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
              <Button>详情</Button>
              <Button>修改</Button>
            </span>
          )
        }
      }
    ]
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  render() {

    const title = (
      <span>
        <Select defaultValue="1" style={{width: '150px'}}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{width: '150px', margin: '0 15px'}}></Input>
        <Button type="primary">搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>添加商品</Button>
    )

    const { products } = this.state 

    return (
      <Card title={title} extra={extra}>
        <Table dataSource={products} columns={this.columns} rowKey="_id" bordered></Table>
      </Card>
    )
  }
}