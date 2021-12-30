<template>
    <div class="mapheader">
        <el-button @click="drawer = true" type="primary" style="margin-left: 0px;">
            选择设备
        </el-button>
        <el-input
            placeholder="请输入内容"
            v-model="input"
            disabled="true"
        >
        </el-input>
        <el-drawer
            title="选择设备"
            :visible.sync="drawer"
            :with-header="true"
            direction="rtl"
            size="36%"
        >
            <Map></Map>
        </el-drawer>
    </div>
</template>

<script>
    import Map from './Map.vue'
    export default {
        name:"MapHeader",
        data() {
            return {
                drawer: false,
            };
        },
        components:{
            Map,
        },
        methods:{
        }
    }
</script>

<style>
    .mapheader{
        display: flex;
    }
</style>