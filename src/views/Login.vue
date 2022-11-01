<template>
    <div class="box">
    <el-form  ref="form" class="login-container" :model="form" :rules="rules">
     <h1>Login</h1>
    <el-form-item  prop="username" label="用户名">
        <el-input type="username"  v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>

    <el-form-item  prop="password" label="密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-button @click="submit" type="primary" >登录</el-button>
  </el-form>
    </div>
 
</template>

<script>
import Mock from'mockjs'
import Cookie from 'js-cookie'
import {getMenu}from '../api/index'
export default {
    data() {
        return {
            form:{
                username:'',
                password:'',
            },
            rules:{
                username:[
                    
                    {required: true, message:'请输入账号', trigger: 'blur'}
                    
                ],
                password:[
                {required: true, message:'请输入密码', trigger: 'blur'}
                ],
            }
        }
    },
    methods:{
        //登录
        submit(){
        
        //校验通过
        this.$refs.form.validate((valid)=>{
           if (valid) {
            getMenu(this.form).then(({data})=>{
                console.log(data);
                if (data.code===20000) {  
                //token信息
               
                //将token信息存入cookie用于不同页面之间的通信
                Cookie.set('token', data.data.token) 
                
                    this.$store.commit('setMenu',data.data.menu)
                    this.$store.commit('addMenu', this.$router)
                     //登录后跳转到首页
                    this.$router.push('/home')
                } else{
                    this.$message.error(data.data.message);
                }
            })
           }
        })

        }
    }
}
</script>

<style lang="less" scoped>
.box{
    height: 100vh;
  
    background-image: url(../assets/imgs/3.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-container{

    // width: 350px;
    // margin: 180px auto;
    // border: 1px solid #eaeaea;
    // box-shadow:  0 0 25px #cac6ca;
    // padding: 35px 35px 15px 35px;
        display: flex;
        width: 350px;
        height: 350px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border-radius: 10px;
        border-top: 1px solid rgba(255,255,255,0.5);
        border-left: 1px solid rgba(255,255,255,0.5);
        border-bottom: 1px solid rgba(255,255,255,0.3);
        border-right: 1px solid rgba(255,255,255,0.3);
        h1{
            color: rgba(255,255,255,0.9);
           
        }
        
        }
      
}

</style>