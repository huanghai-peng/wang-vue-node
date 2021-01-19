const express = require('express')

const app = express()

// 设置token
app.set('secret', 'jskfkaksk')

// 解决跨域
app.use(require('cors')())

// 接收的数据格式
app.use(express.json({ limit: '100mb' }))

// 静态托管上传文件夹uploads
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugin/db')(app)
require('./routes/admin/index')(app)
require('./routes/web/index')(app)

app.listen(3000, () => {
    console.log('服务器启动成功')
})