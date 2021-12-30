import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Empty.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/introduction',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Empty.vue'),
                    meta: { title: '中心介绍' }
                },
                {
                    path: '/analyze',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Empty.vue'),
                    meta: { title: '数据分析' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/groundwater',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Groundwater.vue'),
                    meta: { title: '地下水监测系统' }
                },
                {
                    // 富文本编辑器组件
                    path: '/landslide',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Empty.vue'),
                    meta: { title: '滑坡监测预警系统' }
                },
                {
                    // markdown组件
                    path: '/except',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Empty.vue'),
                    meta: { title: '敬请期待' }
                },
                {
                    // 图片上传组件
                    path: '/download',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Empty.vue'),
                    meta: { title: '数据下载' }
                },
                {
                    // vue-schart组件
                    path: '/equipments',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/Empty.vue'),
                    meta: { title: '设备管理' }
                },
                {
                    // 拖拽列表组件
                    path: '/authority',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/Empty.vue'),
                    meta: { title: '数据权限管理' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/users',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/Empty.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
