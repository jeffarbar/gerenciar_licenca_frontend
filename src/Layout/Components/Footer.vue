
<template>
    <div class="app-footer">
        <div class="app-footer__inner footer-vivo">
           <img class="img-footer-vivo">  <!-- vivo_cor --> 
        </div>
    </div>
</template>

<script>

    import {library} from '@fortawesome/fontawesome-svg-core'
    import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
    // import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faEllipsisV,
    );
    export default {
        name: "FooterDemonstracao",
        components: {
        }
    };
</script>


<style>

.img-footer-vivo{
    width:150px;
    content: url("@/assets/images/footer/footer-vivo.png");
}

.footer-vivo{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>

