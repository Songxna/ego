import router from './index'
import store from '../store'
import Element from 'element-ui'
// 全局守卫
router.beforeEach((to, from, next) => {
    // 判断是否有token
    if (to.matched.some(record => record.meta.isLogin)) {
        let token = store.state.loginModule.userinfo.token;//已登录
        if (token) {
            next()
        } else {
            next('/login')//跳转登录
        }
    } else {
        // Element.Message.error('已登录')
        next()//不需要登录
    }
})
