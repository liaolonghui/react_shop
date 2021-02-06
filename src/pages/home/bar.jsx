import React from "react"
import { Chart, Interval } from 'bizcharts'


export default class Bar extends React.Component {
  render() {
    const data = [
      { year: '2012 年', sales: 38 },
      { year: '2013 年', sales: 52 },
      { year: '2014 年', sales: 61 },
      { year: '2015 年', sales: 45 },
      { year: '2016 年', sales: 48 },
      { year: '2017 年', sales: 38 },
      { year: '2018 年', sales: 38 },
      { year: '2019 年', sales: 38 },
    ]
    return (
      <div style={{width: '100%', marginLeft: 5}}>
        <Chart height={300} autoFit data={data} >
          <Interval position="year*sales"  />
        </Chart>
      </div>
    )
  }
}