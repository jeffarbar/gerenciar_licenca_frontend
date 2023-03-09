<template>
    <div class="app-sidebar sidebar-shadow" @mouseover="toggleSidebarHover('add','closed-sidebar-open')" @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
        
        <div class="app-header__logo">
            
            <!--<div class="logo-src"/>-->
            <div class="app-header-left">
                <!-- <img class="img-logo-telefonica" alt=""> --> <!-- telefonica_cor -->
                 <!-- <img class="img-logo-vivo"  alt=""> --> <!-- vivo_cor --> 
            </div>
            
            
            <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" v-bind:class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu" @update:collapsed="onToggleCollapse" @item-click="onItemClick"/>
            </VuePerfectScrollbar>
        </div>

    </div>
</template>

<script>
    import {SidebarMenu} from 'vue-sidebar-menu'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        name: 'SidebarDemonstracao',
        components: {
            SidebarMenu,
            VuePerfectScrollbar
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,
            
                menu: [
                    {
                        header: true,
                        title: 'Menu',
                    }
                ],
                windowWidth: 0,
            }
        },
        props: {
            sidebarbg: String,
            collapsed: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            montaMenu(){
                const usuario =  JSON.parse( localStorage.getItem('usuario') );

                if( usuario && usuario.perfil == 'MASTER' ){
                    this.menu.push(
                        {
                            title: 'Painel de Controle',
                            icon: 'pe-7s-photo',
                            href: '/controlPanelGrouped'
                        },
                        {
                            title: 'Projeto',
                            icon: 'pe-7s-wallet',
                            child: [   
                                {
                                    title: 'Projeto Andamento',
                                    href: '/projectList'
                                },
                                {
                                    title: 'Projeto Finalizado',
                                    href: '/projectListFinished'
                                }
                            ]
                        
                        },    
                        {
                            title: 'Administração',
                            icon: 'pe-7s-tools',
                            child: [                
                                {
                                    title: 'Tipo de Documentação',
                                    href: '/documentationList'
                                },
                                {
                                    title: 'Cliente',
                                    href: '/customerList'
                                },
                                {
                                    title: 'Usuário',
                                    href: '/userList'
                                },
                                {
                                    title: 'Sharing',
                                    child: [   
                                        {
                                            title: 'Cliente Parceiro',
                                            href: '/sharingCustomerList'
                                        },
                                        {
                                            title: 'Usuário Parceiro',
                                            href: '/sharingUserList'
                                        },
                                    ]
                                },
                               
                                {
                                    title: 'Relatório',
                                    href: '/dashboard'
                                },
                            ]
                        },
                        {
                            title: 'Sair',
                            icon: 'pe-7s-close-circle',
                            href: '/'
                        }
                    )
                }else if( usuario && usuario.perfil == 'SHARING'  ){

                    this.menu.push(
                        {
                            title: 'Painel de Controle',
                            icon: 'pe-7s-photo',
                            href: `/controlPanelGrouped`
                        },
                        {
                            title: 'Administração',
                            icon: 'pe-7s-tools',
                            child: [
                               {   
                                    title: 'Usuário Parceiro',
                                    href: '/sharingUserList'
                                },
                            ]
                        },
                        {
                            title: 'Sair',
                            icon: 'pe-7s-close-circle',
                            href: '/'
                        }
                    )

                }else{
                    this.menu.push(
                        {
                            title: 'Painel de Controle',
                            icon: 'pe-7s-photo',
                            href: `/controlPanel/${this.$route.params.id}`
                        },
                        {
                            title: 'Administração',
                            icon: 'pe-7s-tools',
                            child: [
                                {
                                    title: 'Usuário',
                                    href: '/userList'
                                },
                            ]
                        },
                        {
                            title: 'Sair',
                            icon: 'pe-7s-close-circle',
                            href: '/'
                        }
                    )
                }
            },
            onItemClick(event, item) {
             
                
               if(item.href){

                    this.isOpen = !this.isOpen;
                    const el = document.body;
                    el.classList.remove("closed-sidebar-open");
                    
                    this.$localStorage.set('isOpen', false)

                
               }
            },
            onToggleCollapse(collapsed) {
                
            },
            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;


                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth > '992') {
                    if (add === 'add') {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < '1350') {
                    el.classList.add('closed-sidebar', 'closed-sidebar-md');
                } else {
                    el.classList.remove('closed-sidebar', 'closed-sidebar-md');
                }
            },
        },
        mounted() {
            this.montaMenu();
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>

<style>

.img-logo-telefonica{
    width:220px;
    height:130px;
    content: url("@/assets/images/logo.png");
}

.img-logo-vivo{
    height:55px;
    content: url("@/assets/images/logo.png");
}

</style>