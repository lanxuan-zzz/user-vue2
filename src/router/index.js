import Vue from "vue";
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTow from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)




const routes = [
  //主路由
  {
    path:'/',
    component:Main,
    name: 'Main',
    redirect:'/home',
    children:[
      //子路由
      // { path: 'home',name:'home', component: Home },//首页
      // { path: 'user', name:'user',component: User },//用户管理
      // { path: 'mall', name:'mall',component: Mall },//商品管理
      // { path: 'Page1', name:'Page1',component: PageOne },//页面1
      // { path: 'Page2',name:'Page2', component: PageTow },//页面2
    
    
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
  
  
]
const router = new  VueRouter({
    routes,
})

export default router

