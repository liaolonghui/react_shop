import React, {Component} from 'react'
import { Card, Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

// 商品分类路由
export default class Category extends Component {
  render() {

    // card的右侧标题
    const title = "一级分类列表"
    // card的右侧
    const extra = <Button icon={<PlusOutlined />} type="primary">添加</Button>

    const dataSource = [
      {
        "parentId": "0",
        "_id": '74652316454695231',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": 'afdasdasdasd',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": 'sdasdasdasdasd',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": 'asdsadasdasdasd',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": 'asdasdasdasdasd',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": '74652316454sadadasdas695231',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": '7465231aaa6454695231',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": '746523164546sss95231',
        "name": "家用电器",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": '74652sss316454695231',
        "name": "家用电器",
        "__v": 0
      },
    ]
    
    const columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: () => ( // 指定返回需要显示的元素
          <span>
            <Button>修改分类</Button>
            <Button style={{marginLeft: '10px'}}>查看子分类</Button>
          </span>
        )
      }
    ]

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table dataSource={dataSource} columns={columns} bordered rowKey="_id" />
        </Card>
      </div>
    )
  }
}