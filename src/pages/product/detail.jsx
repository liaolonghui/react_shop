import React, {Component} from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api'

const Item = List.Item

export default class ProductDetail extends Component {

  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }

  async componentDidMount() {
    // pCategoryId可能为0
    const { pCategoryId, categoryId } = this.props.location.state.product
    if (pCategoryId === '0') { // 一级分类下的商品
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({cName1})
    } else { // 二级分类下的商品
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({cName1, cName2})
    }
  }
  
  render() {

    // 读取携带过来的state
    const { name, desc, price, detail, imgs } = this.props.location.state.product
    const { cName1, cName2 } = this.state

    const title = (
      <span>
        <ArrowLeftOutlined style={{color: 'green', marginRight: '10px', fontSize: '20', cursor: 'pointer'}} onClick={() => {this.props.history.goBack()}} />
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述：</span>
            <span>{desc?desc:'无'}</span>
          </Item>
          <Item>
            <span className="left">商品价格：</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类：</span>
            <span>{cName1} {cName2 ? '--> '+cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片：</span>
            <span>
              {
                imgs.map(img => (
                  <img className="product-img" key={img} src={ BASE_IMG_URL + img} alt="img"/>
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情：</span>
            <span dangerouslySetInnerHTML={{__html: detail?detail:'无'}}>
            </span>
          </Item>
        </List>
      </Card>
    )
  }
}