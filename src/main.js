import Vue from 'vue'
import App from './App.vue'
import ElmentUl from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store'
import './api/mock'
//引入cooike
import Cooike from 'js-cookie'

Vue.config.productionTip = false
//按需引入 
Vue.use(ElmentUl)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存不存在
  const token = Cooike.get('token') 
  //通过token状态判断登录情况
  //如果没登录，跳转到登录页面
  if (!token && to.name!=='login') {
    next({
      name:'login'
    });
  }else if(token && to.name==='login'){   //token存在说明用户登录，此时跳转首页
    next({name:'home'})
  } else{
    next()
  }
  
});
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
