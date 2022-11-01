import Mock, { mock } from 'mockjs'
import HomeApi from './mockServerData/home'
import user from './mockServerData/user'
import permission from './mockServerData/permission'
//定义mock请求拦截
Mock.mock('/api/home/getData',HomeApi.getStatisticalData )
// 定义用户列表的数据
//默认get方法，对于数据的修改还是使用post方法
//新增
Mock.mock('/api/user/add','post',user.createUser)
//编辑
Mock.mock('/api/user/edit','post',user.updateUser)
//删除
Mock.mock('/api/user/del','post',user.deleteUser)
//tabel列表
//因为每次换页都会传参所以不能写死，改为正则进行匹配
Mock.mock(/api\/user\/getUser/,user.getUserList)
//登录验证
Mock.mock(/api\/permission\/getMenu/, 'post',permission.getMenu)