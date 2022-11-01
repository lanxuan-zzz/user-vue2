<template>
    <el-row>
      <el-col  style="padding-right:10px"  :span="8">
            <el-card class="box-card">
                <div class="user">
                  <img src="../assets/imgs/dog.jpg" alt="">
                    <div class="user-info">
                      <p class="name">Admin</p>
                      <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                  <p>上次登录时间：<span>1999-9-9</span></p>
                  <p>上次登录地点：<span>北极</span></p>
                </div>
           </el-card>
           <el-card style="margin-top:20px; height:460px;">
            <el-table
                :data="tableData"
                style="width: 100%">
                  <!-- 
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                          prop="name"
                          label="课程"
                         >
                        </el-table-column>
                        <el-table-column
                          prop="todayBuy"
                          label="今日购买"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="monthBuy"
                          label="本月购买"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="totalBuy"
                          label="总购买"
                         >
                        </el-table-column>
               </el-table> -->
              
               <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" />
              </el-table>
              
           </el-card>
      </el-col>
      <el-col  style="padding-left:10px"  :span="16">
        <div class="num">
          <el-card    :body-style="{display:'flex' }"   v-for=" item in countData" :key="item.name">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"> </i>
            <div class="detail">
              <p class="price">¥{{item.value}}</p>
            <p class="desc"> {{item.name}} </p>
            </div> 
          </el-card>
        </div>
            <el-card style="height:280px">
              <!-- 折线图内容 -->
             <div ref="echats1" style="height: 280px"></div>
             </el-card>
             <div class="graph">
              <el-card  style="height:260px">
                <!-- 柱状图 -->
                <div ref="echarts2" style="height:260px"></div>
              </el-card>
              <el-card  style="height:260px">
                <div ref="echarts3" style="height:240px"></div>
              </el-card>
             </div>
      
      </el-col>
  </el-row>
</template>

<script>
import{ getData} from '../api/index'
import * as echarts from 'echarts'
export default {
  data() {
        return {
          tableData: [],
        tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ]
        }
    },
    mounted(){
      getData().then(({data})=>{ 
        console.log(data)
       const {tableData} =data.data
       
       this.tableData=tableData

       // 基于准备好的Dom， 初始化echats1实例。
       const echarts1 = echarts.init(this.$refs.echats1)  
        // 指定图表的配置项和数据
        let echarts1option={}
        //处理x轴的数据 xAxis
        const {orderData, userData,videoData} = data.data
        const xAxis= Object.keys(orderData.data[0])
        const xAxisData={
          data:xAxis
        }
        echarts1option.xAxis=xAxisData
        //设置y轴
        echarts1option.yAxis={}
        echarts1option.legend=xAxisData

         echarts1option.series=[]

        xAxis.forEach(key=>{
          echarts1option.series.push({
            name:key,
            data:orderData.data.map(item=>item[key]),
            type:'line'
        })
        })
        
        //根据配置显示图表
        echarts1.setOption(echarts1option)
        //柱状图
        // 柱状图
        const echarts2 = echarts.init(this.$refs.echarts2)
            const eachrts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                    color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                    axisLabel: {
                    interval: 0,
                    color: "#333",
                    },
                },
                yAxis: [
                    {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echarts2.setOption(eachrts2Option)

            // 饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const eachrts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ],
            }
            echarts3.setOption(eachrts3Option)

      })
      
    }
};

</script>

<style lang="less" scoped>
.user{
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  
  img{
      margin-right: 40px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
  }
  .user-info{
    .name{
      font-size:32px ;
      margin-bottom: 10px; 
    }
    .access{
      font: size #999; ;
    }
    
  }

}

.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span{
      color: #999;
      margin-left: 60px;
  }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon{
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  color: #fff;
  line-height: 80px;
}
  .detail{
   display: flex; 
  //  主轴改为y轴
   flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999;
      text-align: center;
    }
}
.el-card{
  width: 32%;
  margin-bottom: 20px;

}
}
.graph{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
    
  }

}

</style>