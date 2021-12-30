<template>
    <div class="map">
        <div class="map-box">
            <div >
            <el-button round type="primary" @click="fixedPos">定位</el-button>
            <div class="map-header">
                <el-label>当前纬度</el-label>
                <el-input disabled="true" v-model="latitude" ></el-input>
                <el-label>当前经度</el-label>
                <el-input disabled="true" v-model="longitude" ></el-input>
            </div>
            <div class="search">
                <el-input v-model="keyWords" placeholder="请输入要搜索的地址" ></el-input>
                <el-button  icon="el-icon-search" @click="setPlace"></el-button>
            </div>
            </div>
            <!-- <div class="bm-view" id="map"></div> -->
            <!-- 引入地图 -->
            <baidu-map
                :center='center'
                :zoom='zoom'
                @ready='handler'
                class="bm-view"
                @click='getClickInfo'
                :scroll-wheel-zoom='true'
                id='map'
            ></baidu-map>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "Map",
        data(){
          return {
              points:[
                  {}
              ]
          }
        },
        methods: {
            // 引入地图
            handler ({BMap, map}) {
                var map = new BMap.Map("map");    // 创建Map实例
                map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes:[
                        BMAP_HYBRID_MAP,
                        BMAP_NORMAL_MAP,
                        
                    ]}));
                //向地图中添加缩放控件
                var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
                map.addControl(ctrl_nav);
                //向地图中添加缩略图控件
                var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
                map.addControl(ctrl_ove);
                    //向地图中添加比例尺控件
                var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
                map.addControl(ctrl_sca); 
                map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
                map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                map.enableKeyboard();//启用键盘上下左右键移动地图
            }

        },
    }
</script>
 
<style scoped>
    .bm-view {
        width: 99%;
        height: 600px;
        margin-top: 80px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .map {
        width: 100%;
        height: 400px;
    }
    .map .search{
        margin: 10px;
        display: flex;
    }
    .map .search .el-input /deep/ {
        width: 560px;
        margin-left:20px
    }
    .map .map-header{
        margin: 10px;
        padding: 10px;
        display: flex;
    }
    .map .map-header .el-input /deep/{
        width: 200px;
        margin-left: 20px;
        margin-right: 10px;
    }
</style>