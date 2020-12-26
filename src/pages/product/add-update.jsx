import React, {Component} from 'react'
import { Card, Form, Input, Cascader, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import { reqCategorys } from '../../api'

const { Item } = Form
const { TextArea } = Input

export default class ProductAddUpdate extends Component {

  state = {
    options: [],
  }

  constructor(props) {
    super(props)
    this.pw = React.createRef()
    this.editor = React.createRef()
  }

  initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, // 假设不是叶子节点
    }))

    // 如果是一个二级分类商品的更新
    const {isUpdate, product} = this
    const {pCategoryId} = product
    if (isUpdate && pCategoryId!=='0') {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 找到对应的一级option
      const targetOption = options.find(option => option.value===pCategoryId)
      // 关联到对应的一级option上
      targetOption.children = childOptions
    }

    // 更新options状态
    this.setState({options})
  }

  // 获取一级/二级分类列表
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      // 判断是否是一级分类列表
      if (parentId === '0') {
        // 一级
        this.initOptions(categorys)
      } else {
        // 二级
        return categorys // 返回二级列表 ==> 当前的promise对象就会成功且value为categorys
      }
    }
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true

    // 根据选中的分类请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false
    if (subCategorys && subCategorys.length>0) { // 当前选中的分类有二级分类
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到当前选中项上
      targetOption.children = childOptions
    } else { // 当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }
    // 更新options状态
    this.setState({
      options: [...this.state.options]
    })
  }

  onFinish = (values) => {
    values.imgs = this.pw.current.getImgs()
    values.detail = this.editor.current.getDetail()
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

  UNSAFE_componentWillMount() {
    // 取出携带的state
    const product = this.props.location.state
    // 保存一个是否是更新的标识
    this.isUpdate = !!product
    // 保存商品
    this.product = product || {}
  }

  componentDidMount() {
    this.getCategorys('0')
  }

  render() {

    const {isUpdate, product} = this

    const {pCategoryId, categoryId, imgs, detail} = product
    // 用于接收级联分类Id的数组
    const categoryIds = []
    if (isUpdate) {
      // 商品可能是一个一级分类的商品
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }

    const title = (
      <span>
        <ArrowLeftOutlined style={{color: 'green', marginRight: '10px', fontSize: '20', cursor: 'pointer'}} onClick={() => {this.props.history.goBack()}} />
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    return (
      <Card title={title}>
        <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onFinish={this.onFinish}>
          <Item label="商品名称" name="name" rules={[{ required: true, message: "商品名称不能为空！" }]} initialValue={product.name}>
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item label="商品描述" name="desc" rules={[{ required: true, message: "商品描述不能为空！" }]} initialValue={product.desc}>
            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[
              { required: true, message: "商品价格不能为空！" },
              { validator: this.validatePrice }
            ]}
            initialValue={product.price}
          >
            <Input type="number" placeholder="请输入商品价格" addonAfter="元"></Input>
          </Item>
          <Item label="商品分类" name="categoryIds" rules={[{ required: true, message: "必须选择商品分类！" }]} initialValue={categoryIds}>
            <Cascader
              placeholder="请选择商品分类"
              options={this.state.options}
              loadData={this.loadData}
            />
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.pw} imgs={imgs} />
          </Item>
          <Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.editor} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}