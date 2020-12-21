import { Component } from "react"
import { Form, Input } from 'antd'

const Item = Form.Item

export default class UpdateForm extends Component {

  onFinish = () => {
    console.log('finish')
  }

  render() {
    return (
      <Form onFinish={this.onFinish}>
        <Item name="categoryName">
          <Input placeholder="请输入分类名称"></Input>
        </Item>
      </Form>
    )
  }
}