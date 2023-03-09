import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import VueMask from 'v-mask'
Vue.use(VueMask);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [

        // login
        {
            path: '/loginboxed',
            name: 'loginboxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/Login/LoginBoxed.vue'),
        },
        {
            path: '/',
            name: 'loginboxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/Login/LoginBoxed.vue'),
        },
        {
            path: '/registerboxed',
            name: 'registerboxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/Login/RegisterBoxed.vue'),
        },
        {
            path: '/forgotpasswordboxed',
            name: 'forgotpasswordboxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/Login/ForgotPasswordBoxed.vue'),
        },
        {
            path: '/home',
            name: 'home',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/HomeVivo.vue'),
        },
        {
            path: '/controlPanel/:id',
            name: 'controlPanel',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Panel/ControlPanel.vue'),
        },
        {
            path: '/controlPanelGrouped',
            name: 'controlPanelGrouped',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Panel/ControlPanelGrouped.vue'),
        },
        {
            path: '/customerList',
            name: 'customerList',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Customer/CustomerList.vue'),
        },
        {
            path: '/customerRegister/',
            name: 'customerRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Customer/CustomerRegister.vue'),
        },
        {
            path: '/customerRegister/:id',
            name: 'customerRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Customer/CustomerRegister.vue'),
        },
        {
            path: '/projectList',
            name: 'projectList',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Project/ProjectList.vue'),
        },

        {
            path: '/projectRegister/',
            name: 'projectRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Project/ProjectRegister.vue'),
        },

        {
            path: '/projectRegister/:id',
            name: 'projectRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Project/ProjectRegister.vue'),
        },

        {
            path: '/projectListFinished',
            name: 'projectListFinished',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Project/ProjectListFinished.vue'),
        },

       
        {
            path: '/projectRegisterFinished/',
            name: 'projectRegisterFinished',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Project/ProjectRegisterFinished.vue'),
        },
       
        {
            path: '/projectRegisterFinished/:id',
            name: 'projectRegisterFinished',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Project/ProjectRegisterFinished.vue'),
        },
    
        {
            path: '/documentationList',
            name: 'documentationList',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Documentation/DocumentationList.vue'),
        },
        {
            path: '/documentationRegister/',
            name: 'documentationRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Documentation/DocumentationRegister.vue'),
        },
        {
            path: '/documentationRegister/:id',
            name: 'documentationRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Documentation/DocumentationRegister.vue'),
        },
        {
            path: '/userList',
            name: 'userList',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/User/UserList.vue'),
        },
        
        {
            path: '/userRegister/',
            name: 'userRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/User/UserRegister.vue'),
        },
        {
            path: '/userRegister/:id',
            name: 'userRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/User/UserRegister.vue'),
        },
        
        {
            path: '/uploadDoc/:id',
            name: 'uploadDoc',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Panel/UploadDoc.vue'),
        },

        {
            path: '/sharingCustomerList',
            name: 'sharingCustomerList',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Sharing/SharingCustomerList.vue'),
        },
        {
            path: '/sharingCustomerRegister',
            name: 'sharingCustomerRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Sharing/SharingCustomerRegister.vue'),
        },
        {
            path: '/sharingCustomerRegister/:id',
            name: 'sharingCustomerRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Sharing/SharingCustomerRegister.vue'),
        },     

        {
            path: '/sharingUserList',
            name: 'sharingUserList',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Sharing/SharingUserList.vue'),
        },
        {
            path: '/sharingUserRegister',
            name: 'sharingUserRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Sharing/SharingUserRegister.vue'),
        },
        {
            path: '/sharingUserRegister/:id',
            name: 'sharingUserRegister',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Sharing/SharingUserRegister.vue'),
        },

        {
            path: '/dashboard',
            name: 'dashboard',
            meta: {layout: 'default'},
            component: () => import('../DemoPages/Pages/Report/Dashboard.vue'),
        },
    ]
})
