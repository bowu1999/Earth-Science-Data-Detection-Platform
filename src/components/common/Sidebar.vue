<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#081e83"
            text-color="#ffffff"
            active-text-color="#fae20b"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'home',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-office-building',
                    index: 'introduction',
                    title: '中心介绍'
                },
                {
                    icon: 'el-icon-receiving',
                    index: 'systems',
                    title: '监测系统',
                    subs: [
                        {
                            index: 'groundwater',
                            title: '地下水监测系统',
                        },
                        {
                            index: 'landslide',
                            title: '滑坡监测预警系统',
                        },
                        {
                            index: 'except',
                            title: '敬请期待'
                        }
                    ]
                },
                {
                    icon: 'el-icon-data-line',
                    index: 'analyze',
                    title: '数据分析'
                },
                {
                    icon: 'el-icon-coin',
                    index: 'download',
                    title: '数据下载'
                },
                {
                    icon: 'el-icon-suitcase',
                    index: 'equipments',
                    title: '设备管理'
                },
                
                {
                    icon: 'el-icon-s-release',
                    index: 'authority',
                    title: '数据权限管理'
                },
                {
                    icon: 'el-icon-s-custom',
                    index: 'users',
                    title: '用户管理',
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    background-color: #0d1586;
    /* #20a0ff */
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
