<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0" >
            <div class="widget-content p-0"  >
                <div class="widget-content-wrapper" >
                    <!--
                    <div class="widget-content-left  ml-3 header-user-info">
                        <div class="widget-heading" style="color:#F2F4FF">Big Data&nbsp;&nbsp;</div>
                    </div>
                    -->
                    <div class="widget-content-left">

                        <!-- <img  class="img-avatar-telefonica rounded-circle" alt=""> --> <!-- telefonica_cor -->

                        <!-- <img class="img-avatar-vivo " alt=""> --> <!-- vivo_cor -->
                        <img class="img-logo-vivo" style="height:47px;" alt="">
                        &nbsp;&nbsp;
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
                            <span slot="button-content">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img width="45px" class="rounded-circle" src="@/assets/images/avatars/user.png" alt="">
                                </div>
                            </span>
                            <h6 tabindex="1" class="dropdown-header" style="text-align: center;" >Menu</h6>
                            <h3 tabindex="2" class="cliente">Olá {{usuario.username}}</h3>
                            <h3 tabindex="3" class="cliente">{{usuario.email}}</h3>
                            <h3 tabindex="3" class="cliente">Perfil {{usuario.perfil}}</h3>
                            <h3 tabindex="2" class="cliente">{{usuario.cliente}}</h3>
                            <div tabindex="4" class="dropdown-divider"></div>
                            <button type="button" @click="logoff()" tabindex="0" class="dropdown-item">Sair</button>
                        </b-dropdown>

                        <!--
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
                            <span slot="button-content">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img width="42" class="rounded-circle" src="@/assets/images/avatars/telefonica.png" alt="">
                                </div>
                            </span>
                            <button type="button" tabindex="0" class="dropdown-item">Menus</button>
                            <button type="button" tabindex="0" class="dropdown-item">Settings</button>
                            <h6 tabindex="-1" class="dropdown-header">Header</h6>
                            <button type="button" tabindex="0" class="dropdown-item">Actions</button>
                            <div tabindex="-1" class="dropdown-divider"></div>
                            <button type="button" tabindex="0" class="dropdown-item">Dividers</button>
                        </b-dropdown>
                        -->
                    </div>
                    <!--
                    <div class="widget-content-right header-user-info ml-3">
                        <b-btn v-b-tooltip.hover title="Tooltip Example" class="btn-shadow p-1" size="sm" variant="info">
                            <font-awesome-icon icon="calendar-alt" class="mr-1 ml-1"/>
                        </b-btn>
                    </div>
                    -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faAngleDown,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
    } from '@fortawesome/free-solid-svg-icons'
    //import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faAngleDown,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
    );

    export default {
        name:'HeaderUserAreaDemonstracao',
        components: {
            //'font-awesome-icon': FontAwesomeIcon,
        },
        data: () => ({
            usuario:{
                username: null,
                email: null,
                jwttoken:null,
                cliente: null,
                perfil: null,
                primeiroAcesso: false
            }
        }),
        mounted() {
            this.valida();
        },
        methods: {
            valida(){

                this.usuario = JSON.parse( localStorage.getItem('usuario') )

                if( this.usuario == null || this.usuario.jwttoken == null){
                    this.logoff()
                }else if(this.usuario.primeiroAcesso == true){
                    this.primeiroAcesso()
                }
            },
            logoff(){
                localStorage.clear()
                this.$router.push('/') 
            },
            primeiroAcesso(){
                this.$router.push('/registerboxed') 
            }
        }
    }


</script>

<style>

.img-avatar-telefonica{
    width:80px;
    height:80px;
    content: url("@/assets/images/avatars/telefonica.png");
}

.img-avatar-vivo{
    height:40px;
    content: url("@/assets/images/logo.png");
}

.cliente{
    font-size:12px;
    vertical-align: middle; 
    text-align: center;
}


</style>
