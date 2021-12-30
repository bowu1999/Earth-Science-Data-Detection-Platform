<template>
  <div class="groundwaterdatatable">
    <el-table
      :data="tableData"
      style="width: 100%;height:100%;"
      max-height="385px"
      v-el-table-infinite-scroll="load"
      infinite-scroll-delay="true"
      >
      <el-table-column
        fixed
        prop="date_time"
        label="日期-时间"
        width="170">
      </el-table-column>
      <el-table-column
        prop="depth"
        label="水位"
        width="120">
      </el-table-column>
      <el-table-column
        prop="temperature"
        label="温度"
        width="120">
      </el-table-column>
      <el-table-column
        prop="conduct"
        label="电导率"
        width="120">
      </el-table-column>
      <el-table-column
        prop="resistivity"
        label="电阻率"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tds"
        label="TDS"
        width="120">
      </el-table-column>
      <el-table-column
        prop="salinity"
        label="盐度"
        width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 吴博:2021-12-24 9:48定时器销毁完成
// 吴博:2021-12-24 13:36数据表格自刷新与懒加载完成
// 吴博:2021-12-24 14:55数据表格懒加载时多次调用加载函数的问题解决


// infinite-scroll-delay="true"在el-table中加入防止table加载时多次回调函数load
  import {get} from '../../utils/request'

  export default {
    name:'Datatable',
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        getHandle(bn,n){
            get(`/realtimedata.php?bnum=${bn}&num=${n}`,{}).then(//get请求，获取数据
              (res)=>{
              if(n==1){// 判断是否为请求新数据
                if(JSON.stringify(this.tableData).indexOf(JSON.stringify(res[0]))==-1){//判断现在的数组中是否已经存在获取到的信息
                  this.tableData.unshift(res[0])
                  this.number = this.tableData.length
                }
              }else{
                if(bn === 0){
                    this.tableData = res// 初次更新列表
                    this.number = this.tableData.length
                }
                else{
                  this.tableData = this.tableData.concat(res)// 滑动更新列表
                  this.number = this.tableData.length
                }
              }
          })
        },
        inittable(){
          this.tableData = []
          this.number = 0
          // 初次查询9个数据显示
          this.getHandle(this.number,9)
        },
        load(){
            if(this.number === 0) return // 初次更新时阻止load更新number
            this.getHandle(this.number,6)
        }
    },
    data() {
        return {
            tableData: [],// 列表数据
            Timer:' ',// 定时器
            number:0,// 当前已获取的数量
        }
    },
    mounted(){// 添加
        this.inittable()
        this.Timer = setInterval(()=>{// 添加定时器，定时请求数据
          this.getHandle(0,1)
        },120000)
    },
    activated(){// 再次激活此组件时重新开启定时器
      this.inittable()
      // 动态搜索新数据
      if(this.Timer == ' '){
        this.Timer = setInterval(()=>{// 添加定时器，定时请求数据
            this.getHandle(0,1)
        },120000)
      }
    },
    deactivated() {
        clearInterval(this.Timer)
        this.Timer=' '
    },
    beforeDestroy(){
        clearInterval(this.Timer)
        this.Timer=' '
    }
  }
</script>

<style scoped>
  .groundwaterdatatable{
    width: 100%;
    height: 100%; 
    margin: auto;
  }
.groundwaterdatatable /deep/  .el-table, .el-table__expanded-cell {
    background-color: rgba(225, 225, 225, 0.8);
}

.groundwaterdatatable /deep/ .el-table tr {
    background-color: rgba(225, 225, 225, 0.8)!important;
}
.groundwaterdatatable /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
   background-color: rgba(225, 225, 225, 0.8);
}
.el-table::before {
  /* 去除底部白线 */
	 left: 0;
	 bottom: 0;
	 width: 100%;
	 height: 0px;
}

</style>