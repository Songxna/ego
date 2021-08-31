import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Goods from '../views/Goods'
import Login from '../views/Login'


//按需加载组件 
const Advert =()=> import('../views/Advert')
const shopParams =()=> import('../views/shopParams')
const User =()=> import('../views/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta:{
      isLogin:true
    },
    children:[
      {
        path:'/',
        name:'Goods',
        component:Goods
      },
      {
        path:'/shopparams',
        name:'shopParams',
        component:shopParams
      },
      {
        path:'/advert',
        name:'Advert',
        component:Advert
      },
      {
        path:'/user',
        name:'User',
        component:User
      }
    ]
  },{
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/*',
    redirect:'/'
  }
  
]

const router = new VueRouter({
  routes
})

// 全局首位导航
// router.beforeEach((to,from,next)=>{
//   // 判断是否登录
//   if(to.matched.some(ele=>ele.meta.isLogin)){//需要登录
//     let token=false;
//     if(token){
//       next()
//     }else{
//       next('/login')
//     }
//   }else{//不需要登录
//     next()
//   }
// })


export default router
