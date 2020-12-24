import React, {Component} from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const Item = List.Item

export default class ProductDetail extends Component {
  render() {

    const title = (
      <span>
        <ArrowLeftOutlined />
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称：</span>
            <span>哈哈哈哈哈哈</span>
          </Item>
          <Item>
            <span className="left">商品描述：</span>
            <span>描述.....</span>
          </Item>
          <Item>
            <span className="left">商品价格：</span>
            <span>250元</span>
          </Item>
          <Item>
            <span className="left">所属分类：</span>
            <span>电脑 --&gt; 笔记本</span>
          </Item>
          <Item>
            <span className="left">商品图片：</span>
            <span>
              <img className="product-img" src="http://img.article.pchome.net/00/20/46/61/hyhyhy-2007-05-11-8301.jpg" alt="img"/>
              <img className="product-img" src="http://img.article.pchome.net/00/20/46/61/hyhyhy-2007-05-11-8301.jpg" alt="img"/>
            </span>
          </Item>
          <Item>
            <span className="left">商品详情：</span>
            <span dangerouslySetInnerHTML={{__html: '<h1 style="color: red;">商品详情的内容标题</h1>'}}>
            </span>
          </Item>
        </List>
      </Card>
    )
  }
}