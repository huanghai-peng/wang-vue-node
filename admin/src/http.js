import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})


// 请求拦截器
http.interceptors.request.use((config) => {
    // 在请求头中传递token
    if (localStorage.token) {
        config.headers.Authorization = 'bearer ' + localStorage.token
    }
    return config
}, err => {
    return Promise.reject(err);
})

// 响应拦截器
http.interceptors.response.use((res) => {
    return res
}, (err) => {
    // 弹出错误消息
    Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
    })

    // 如果错误状态码为401,就跳转回登录页面
    if (err.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(err)
})

export default http