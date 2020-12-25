import React, {Component} from 'react'
import { Card, Form, Input, Cascader, Upload, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Item } = Form
const { TextArea } = Input

export default class ProductAddUpdate extends Component {

  onFinish = (values) => {
    console.log(values)
  }

  // 验证价格的自定义验证函数
  validatePrice = (rule, value) => {
    if (value*1 > 0) {
      return Promise.resolve()
    } else {
      return Promise.reject('价格必须大于0')
    }
  }

  render() {

    const title = (
      <span>
        <ArrowLeftOutlined style={{color: 'green', marginRight: '10px', fontSize: '20', cursor: 'pointer'}} onClick={() => {this.props.history.goBack()}} />
        <span>添加商品</span>
      </span>
    )

    return (
      <Card title={title}>
        <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onFinish={this.onFinish}>
          <Item label="商品名称" name="name" rules={[{ required: true, message: "商品名称不能为空！" }]}>
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item label="商品描述" name="desc" rules={[{ required: true, message: "商品描述不能为空！" }]}>
            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[
              { required: true, message: "商品价格不能为空！" },
              { validator: this.validatePrice }
            ]}
          >
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
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}