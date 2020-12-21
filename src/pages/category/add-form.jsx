import { Component } from "react"
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class AddForm extends Component {
  render() {
    return (
      <Form>
        <Item name="parentId" initialValue='0'>
          <Select>
            <Option value='0'>一级分类</Option>
            <Option value='1515'>电脑</Option>
            <Option value='45140'>图书</Option>
          </Select>
        </Item>
        <Item name="categoryName">
          <Input placeholder="请输入分类名称"></Input>
        </Item>
      </Form>
    )
  }
}