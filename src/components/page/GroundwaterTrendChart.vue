<template>
    <div class="container" ref="container"></div>
</template>

<script>
// 吴博：2021-12-24 19:05echarts图表联通数据库完成

// ****待完成 echarts图表 自适应

    import * as echarts from 'echarts'
    import {get} from '../../utils/request'
    export default {
        name: 'TrendChart',
        data(){
            return{
                myChart:null,
                waterdata:[],
            }
        },
        computed:{
            options(){
                let that = this
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[1], '1%'];
                        }
                    },
                    backgroundColor:'rgba(225, 225, 225, 0.8)',
                    title: {
                        left: 'center',
                        show:true, 
                        text: '水位变化图',
                        textStyle:{
                            //文字颜色
                            color: '#081e83',
                            //字体风格,'normal','italic','oblique'
                            fontStyle:'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight:'bold',
                            //字体系列
                            fontFamily:'sans-serif',
                            //字体大小
                            fontSize:20
                        },
                        
                    },
                    textStyle:{
                        //文字颜色
                        color: '#081e83',
                        //字体风格,'normal','italic','oblique'
                        fontStyle:'normal',
                        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                        fontWeight:'bold',
                        //字体系列
                        fontFamily:'sans-serif',
                        //字体大小
                        fontSize:18
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: { //数据视图
                                show: true,
                                readOnly: false//是否只读
                            },
                            magicType: {//切换图表
                                show: true,
                                type: ['line', 'bar', 'stack', 'tiled']//图表
                            },
                            restore: {},
                            saveAsImage: {}
                        },
                        iconStyle:{
                            normal:{
                                borderColor:'#081e83'
                            }
                        }
                    },
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['#487bbd'],
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 20
                        },
                        {
                            start: 0,
                            end: 20
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            areaStyle: {},
                            data:that.waterdata
                        }
                    ]
                }
                return option
                    
            },
        },
        methods:{
            chartsinit(){
                // 基于准备好的dom，初始化echarts实例
                this.myChart = echarts.init(this.$refs.container,'macarons')
                // 使用刚指定的配置项和数据显示图表。
                this.myChart.setOption(this.options)
                
            },
            getHandle(){
                get(`/watertrenddata.php`,{}).then(//get请求，获取数据
                    (res)=>{
                        this.waterdata = res
                })
            },
        },
        mounted(){
            this.getHandle()
            this.chartsinit()
        },
        watch: {
            // 监听options改变，重新生成图表
            options:{
                handler() {
                    this.myChart.setOption(this.options)
                },
                deep: true
            }
        },
        beforeDestroy(){
        },
        deactivated(){
        }
    }
</script>
<style  scoped>
  .container{
    padding: 0px;
    width: 100%;
    height: 100%;
}
</style>