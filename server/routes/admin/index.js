module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })

    // 登录校检中间件
    const authMiddleware = require('../../middleware/auth')
    const resourseMiddleware = require('../../middleware/resourse')

    // 新建路由
    router.post('/', async(req, res) => {
        // 将客户端提交过来的数据插入到集合中
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 修改路由
    router.put('/:id', async(req, res) => {
        // 将客户端提交过来的数据插入到集合中
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除路由
    router.delete('/:id', async(req, res) => {
        // 将客户端提交过来的数据插入到集合中
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    // 列表路由
    router.get('/', authMiddleware(), async(req, res) => {
        // 从集合中找到数据返回给客户端
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(150)
        res.send(items)
    })

    // 编辑路由
    router.get('/:id', async(req, res) => {
        // 从集合中找到数据返回给客户端
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', async(req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    // 处理上传文件
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), resourseMiddleware())

    // 处理登录
    app.post('/admin/api/login', async(req, res) => {
        const { username, pwd } = req.body

        // 1.根据用户名查找用户
        const user = await AdminUser.findOne({ username }).select('+pwd')
        assert(user, 422, '用户不存在')

        // 2.校检密码
        const isValid = require('bcrypt').compareSync(pwd, user.pwd)
        assert(isValid, 422, '密码错误')
            /* if (!isValid) {
                return res.status(422).send({
                    message: '密码错误'
                })
            } */

        // 3.返回token

        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    // 错误处理函数
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}