import React, {Component} from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqCategorys, reqUpdateCagegory, reqAddCategory } from '../../api'
import { ArrowRightOutlined } from '@ant-design/icons'
import AddForm from './add-form'
import UpdateForm from './update-form'

// 商品分类路由
export default class Category extends Component {

  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], // 子分类列表
    parentId: '0', // 当前需要显示的分类列表的parentI的，默认获取一级分类列表
    parentName: '', // 父分类名称，默认为空
    showStatus: 0, // 标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新。
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
            <Button onClick={() => {this.showUpdate(category)}}>修改分类</Button>
            {this.state.parentId==='0' ? <Button style={{marginLeft: '10px'}} onClick={() => {this.showSubCategorys(category)}}>查看子分类</Button> : null}
          </span>
        )
      }
    ]
  }

  // 异步获取一级/二级分类列表  如果没有指定parentId则根据状态中的parentId发送请求。
  getCategorys = async (parentId) => {
    // 发请求前先loading
    this.setState({loading: true})
    parentId = parentId || this.state.parentId
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

  // 点击取消，隐藏确认框
  handleCancel = () => {
    message.info('已取消操作！')
    this.setState({
      showStatus: 0
    })
  }

  // 显示添加确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示更新确认框
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    // 更新状态，显示修改确认框
    this.setState({
      showStatus: 2
    })
  }

  // 添加分类
  addCategory = () => {
    this.form.current.validateFields().then(async values => {
      this.setState({
        showStatus: 0
      })
      const {categoryName, parentId} = values
      const result = await reqAddCategory({categoryName, parentId})
      if (result.status === 0) {
        message.success('添加分类成功！')
        // 当前parentId与所添加分类的parentId相同时才应该重新获取当前列表数据
        if (parentId === this.state.parentId) {
          this.getCategorys()
        } else if (parentId === '0') {    // 但是在二级分类列表下添加一级分类时必须更新一下一级分类列表数据，否则回到一级分类时看不到新数据
          this.getCategorys('0')
        }
      } else {
        message.error('添加分类失败！')
      }
    }).catch(err => err)
  }

  // 更新分类
  updateCategory = () => {
    // 先进行表单验证
    this.form.current.validateFields().then(async values => {
        // 隐藏确认框
        this.setState({
          showStatus: 0
        })
        // 发请求更新分类
        const categoryId = this.category._id
        const {categoryName} = values
        const result = await reqUpdateCagegory({categoryId, categoryName})
        if (result.status === 0) {
          message.success('修改分类成功！')
          // 重新显示列表
          this.getCategorys()
        } else {
          message.error('修改分类失败！')
        }
    }).catch(err => err)
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    // 获取一级分类列表
    this.getCategorys()
  }

  render() {

    // 读取状态数据
    const {loading, subCategorys, parentId, parentName, categorys, showStatus} = this.state
    const category = this.category || {name: ''}

    // card的左侧标题
    const title = parentId === '0' ? "一级分类列表" : (
      <span>
        <Button onClick={() => {this.showCategorys()}}>一级分类列表</Button>
        <ArrowRightOutlined style={{margin: '0 10px'}} />
        <span>{parentName}</span>
      </span>
    )
    // card的右侧
    const extra = <Button icon={<PlusOutlined />} type="primary" onClick={this.showAdd}>添加</Button>

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table dataSource={parentId==='0' ? categorys : subCategorys} columns={this.columns} pagination={{defaultPageSize: 5, showQuickJumper: true}} loading={loading} bordered rowKey="_id" />
        </Card>
        <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel} destroyOnClose>
          <AddForm categorys={categorys} parentId={parentId} setForm={(form) => {this.form = form}} />
        </Modal>
        <Modal title="修改分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}  destroyOnClose>
          <UpdateForm categoryName={category.name} setForm={(form) => {this.form = form}} />
        </Modal>
      </div>
    )
  }
}