<template>
    <div>
        
    <el-container>
    <el-aside width="auto">
        <Common-aside/>
    </el-aside>
    <el-container>
        <!-- 头部 -->
        <el-header>

            <CommonHeader/>
        </el-header>
          <!-- 头部标签 -->
          <coomon-tag/>
        <!-- 中间内容 -->
        <el-main>
          
           <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>

        </el-main>
    </el-container>
    </el-container>
    </div>

  
</template>

<script>

import CommonAside from '../components/CommonAside'
import CommonHeader from '../components/CommonHeader.vue'
import CoomonTag from '../components/CoomonTag.vue'



export default {
    data() {
        return {
            
        }
    },
    components:{
        CommonAside,
        CommonHeader,
        CoomonTag,
    }

}
</script>

<style  scoped>
.el-header{
    padding: 0;
}
</style>