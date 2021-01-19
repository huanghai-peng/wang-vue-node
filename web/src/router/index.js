import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [
        { path: '/', component: Home },
        { path: '/articles/:id', component: Article, props: true }
    ]
}, {
    path: '/heroes/:id',
    name: 'Hero',
    component: Hero,
    props: true
}]

const router = new VueRouter({
    routes
})

export default router