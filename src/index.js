// 入口js
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 读取local中存储的user，保存在内存中
memoryUtils.user = storageUtils.getUser()

ReactDOM.render(<App />, document.getElementById('root'))