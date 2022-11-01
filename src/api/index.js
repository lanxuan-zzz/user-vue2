import http from '../utils/requestes'
//请求首页数据的接口
export const getData=()=>{
    return http.get('/home/getData')
}
export const getUser=(params)=>{
    //返回用户列表
    //请求带上params参数
    console.log(params,'params');
    return http.get('/user/getUser',params)
}

export const addUser=(data)=>{
    //新增用户列表
    //post请求要带上data参数
    return http.post('/user/add',data)
}
export const editUser=(data)=>{
    //编辑用户列表
    //post请求要带上data参数
    return http.post('/user/edit',data)
}
export const delUser=(data)=>{
    //删除用户列表
    //post请求要带上data参数
    return http.post('/user/del',data)
}

export const getMenu=(data)=>{
    return http.post('/permission/getMenu',data)
}