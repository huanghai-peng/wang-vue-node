import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'


Vue.config.productionTip = false

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000/web/api/'
})

// 引入字体图标
import './assets/fonts/iconfont.css'

// 引入轮播图模块
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper /* { default options with global component } */ )

// 引入card组件
import Card from './components/Card'
Vue.component('my-card', Card)
import ListCard from './components/ListCart'
Vue.component('my-list-card', ListCard)


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')