import React, {Component} from 'react'
import { Card, Form, Input, Cascader, Upload, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Item } = Form
const { TextArea } = Input

export default class ProductAddUpdate extends Component {
  render() {

    const title = (
      <span>
        <ArrowLeftOutlined style={{color: 'green', marginRight: '10px', fontSize: '20', cursor: 'pointer'}} onClick={() => {this.props.history.goBack()}} />
        <span>添加商品</span>
      </span>
    )

    return (
      <Card title={title}>
        <Form labelCol={{span: 2}} wrapperCol={{span: 8}}>
        <Item label="商品名称">
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item label="商品描述">
            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
          </Item>
          <Item label="商品价格">
            <Input type="number" placeholder="请输入商品价格" addonAfter="元"></Input>
          </Item>
          <Item label="商品分类">
            <Cascader></Cascader>
          </Item>
          <Item label="商品图片">
            <Upload></Upload>
          </Item>
          <Item label="商品详情">
            <div>商品详情......</div>
          </Item>
          <Item>
            <Button type="primary">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}