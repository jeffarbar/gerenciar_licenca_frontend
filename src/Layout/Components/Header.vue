<template>
    <div class="app-header header-shadow">
        <!--<div class="logo-src"/> -->
        
        <div class="app-header-lef">
            <!-- jefferson -->
            &nbsp;<img v-if="clientHeight <= 992" class="img-logo-vivo"  alt=""> 
            <!-- <img class="img-logo-telefonica" alt=""> --> <!-- telefonica_cor -->
            <!-- <img class="img-logo-vivo"  alt=""> --> <!-- vivo_cor --> 
        </div>

        <div class="app-header__content">
            <!--
            <div class="app-header-left">
                <SearchBox/>
            </div>
            -->
            <div class="app-header-right">
                <UserArea/>
            </div>
        </div>
        <div class="app-header__mobile-menu">
            <div>
                <!--
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"  v-bind:class="{ 'is-active' : isOpen }" @click="toggleMobile('closed-sidebar-open')">
                -->
                  <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"  @click="toggleMobilSimples('closed-sidebar-open')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>

            </div>
        </div>
        <div class="app-header__menu">
            <span>
                <!--
                <b-button class="btn-icon btn-icon-only" variant="primary" size="sm" v-bind:class="{ 'active' : isOpenMobileMenu }" @click="toggleMobile2('header-menu-open')">
                    <div class="btn-icon-wrapper">
                        <font-awesome-icon icon="ellipsis-v"/>
                    </div>
                </b-button>
                -->
            </span>
        </div>
    </div>
</template>

<script>

    //import SearchBox from './Header/SearchBox';
    import UserArea from './Header/HeaderUserArea';

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faEllipsisV,
    } from '@fortawesome/free-solid-svg-icons'
    //import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faEllipsisV,
    );
    export default {
        name: "HeaderDemonstracao",
        components: {
            //SearchBox,
            UserArea,
            //'font-awesome-icon': FontAwesomeIcon,
        },
       created: function () {
            this.clientHeight = document.documentElement.clientWidth
          
            window.addEventListener('resize', this.resize)
        },

        destroyed: function () {
            window.removeEventListener('resize', this.resize)
        },
        
        data() {
            return {
                isOpen: false,
                isOpenMobileMenu: false,
                clientHeight: 0,
            }
        },
        props: {


        },
        methods: {
            resize() {
                let tamanho = document.documentElement.clientWidth;
                //console.log(tamanho)
                this.clientHeight = tamanho
            },
            toggleMobile(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                //console.log(this.isOpen)

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },

             toggleMobilSimples(className) {
                const el = document.body;
                el.classList.add(className);
            },

            toggleMobile2(className) {
                const el = document.body;
                this.isOpenMobileMenu = !this.isOpenMobileMenu;

                if (this.isOpenMobileMenu) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
        }
    };
</script>

<style>

.img-logo-telefonica{
    width:208px;
    height:130px;
    content: url("@/assets/images/logo.png");
}

.img-logo-vivo{
    height:47px;
    content: url("@/assets/images/logo.png");
}

</style>

