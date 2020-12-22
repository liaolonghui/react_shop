import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class AddForm extends Component {

  formRef = React.createRef()

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categorys: PropTypes.array.isRequired,  // 一级分类的数组
    parentId: PropTypes.string.isRequired  // 父分类ID
  }

  UNSAFE_componentWillMount() {
    this.props.setForm(this.formRef)
  }

  render() {

    const {categorys, parentId} = this.props

    return (
      <Form ref={this.formRef}>
        <Item name="parentId" initialValue={parentId}>
          <Select>
            <Option value='0'>一级分类</Option>
            {
              categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
            }
          </Select>
        </Item>
        <Item name="categoryName">
          <Input placeholder="请输入分类名称"></Input>
        </Item>
      </Form>
    )
  }
}