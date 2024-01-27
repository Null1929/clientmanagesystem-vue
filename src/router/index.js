
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'


Vue.use(VueRouter)


const router = new VueRouter({
    routes
})

//路由防卫
router.beforeEach((to, from, next) => {
    if (to.path !== '/user/log' && to.path !== '/'&&to.path!=='/user/registry') {                                 // 判断要去的路由条件
        if (sessionStorage.getItem('token') === null) {
            // 登录成功把这个值存储在缓存中
            next('/user/log')
        } else {
            next()
        }
    } else {
        next()

    }
})

export default router
