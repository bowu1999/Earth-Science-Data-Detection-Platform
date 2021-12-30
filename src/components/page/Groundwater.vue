<template>
    <el-container class="groundwater">
        <el-header
            height="38px"
        >
            <MapHeader></MapHeader>
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="12">
                    <div class="view1"></div>
                </el-col>
                <el-col :span="12">
                    <div class="view2">
                        <!-- <GroundwaterDatatable/> -->
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="view3">
                        <GroundwaterDatatable/>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="view4">
                        <GroundwaterTrendChart/>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import GroundwaterDatatable from './GroundwaterDatatable.vue'
import GroundwaterTrendChart from './GroundwaterTrendChart.vue'
import MapHeader from './MapHeader.vue'
export default {
    name: 'Groundwater',
    components: {
        GroundwaterDatatable,
        GroundwaterTrendChart,
        MapHeader,
    },
    
}
</script>

<style scoped>
    .groundwater{
        background-image: url(../../assets/img/groundwaterback.jpg);
        background-size: 100%;
    }
    .el-container{
        height: 100%;
    }
    .el-row{
     width: 100%;
     height: 50%;
    }
    .el-col{
        height: 100%;
        width: 50%;
    }
    .el-header{
        padding: 5px;
    }
    .el-main{
        height: 100%;
        padding: 5px;
    }
    .view1{
        height: 100%;
    }
    .view3{
        height: 100%;
    }
    .view4{
        height: 100%;
        width: 100%;
    }
</style>