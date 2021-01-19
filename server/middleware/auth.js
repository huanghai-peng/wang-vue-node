module.exports = option => {
    return async(req, res, next) => {
        const jwt = require('jsonwebtoken')
        const AdminUser = require('../models/AdminUser')
        const assert = require('http-assert')

        // 获取token
        const token = String(req.headers.authorization || '').split(' ')[1]
        assert(token, 401, '请先登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')

        // 根据id查找用户信息
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}