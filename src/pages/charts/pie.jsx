import React, {Component} from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
 
// 饼图路由
export default class Pie extends Component {

  // 返回柱状图的配置对象
  getOption = () => {
    let option = {
      title : {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
          {
              name:'半径模式',
              type:'pie',
              radius : [20, 110],
              center : ['25%', 200],
              roseType : 'radius',
              width: '40%',       // for funnel
              max: 40,            // for funnel
              itemStyle : {
                  normal : {
                      label : {
                          show : false
                      },
                      labelLine : {
                          show : false
                      }
                  },
                  emphasis : {
                      label : {
                          show : true
                      },
                      labelLine : {
                          show : true
                      }
                  }
              },
              data:[
                  {value:10, name:'rose1'},
                  {value:5, name:'rose2'},
                  {value:15, name:'rose3'},
                  {value:25, name:'rose4'},
                  {value:20, name:'rose5'},
                  {value:35, name:'rose6'},
                  {value:30, name:'rose7'},
                  {value:40, name:'rose8'}
              ]
          },
          {
              name:'面积模式',
              type:'pie',
              radius : [30, 110],
              center : ['75%', 200],
              roseType : 'area',
              x: '50%',               // for funnel
              max: 40,                // for funnel
              sort : 'ascending',     // for funnel
              data:[
                  {value:10, name:'rose1'},
                  {value:5, name:'rose2'},
                  {value:15, name:'rose3'},
                  {value:25, name:'rose4'},
                  {value:20, name:'rose5'},
                  {value:35, name:'rose6'},
                  {value:30, name:'rose7'},
                  {value:40, name:'rose8'}
              ]
          }
      ]
    }
    return option
  }

  getOption2 = () => {
    return {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'center',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
    }
  }

  render() {
    return (
      <div>
        <Card title="饼图一">
          <ReactEcharts option={this.getOption()} style={{height: 300}} />
        </Card>
        <Card title="饼图二">
          <ReactEcharts option={this.getOption2()} style={{height: 300}} />
        </Card>
      </div>
    )
  }
}