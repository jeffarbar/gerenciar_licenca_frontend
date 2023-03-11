<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <notifications position="bottom center"  />
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>

                    <form @submit.prevent="login" class="">
                    
                        <div class="modal-dialog w-100 mx-auto">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div class="h5 modal-title text-center">
                                        <h4 class="mt-2">
                                            <div>Bem Vindo</div>
                                            <span>Faça login na sua conta abaixo.</span>
                                        </h4>
                                    </div>
                                    <b-form-group id="exampleInputGroup1"
                                                label-for="exampleInput1"
                                                description="Nunca compartilharemos seu e-mail com mais ninguém.">
                                        <b-form-input id="exampleInput1"
                                                    type="email"
                                                    v-model="autenticacao.email"
                                                    required
                                                    placeholder="Digite o e-mail...">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group id="exampleInputGroup2"
                                                label-for="exampleInput2">
                                        <b-form-input id="exampleInput2"
                                                    type="password"
                                                    v-model="autenticacao.senha"
                                                    required
                                                    placeholder="Digite a senha...">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-checkbox name="check" id="exampleCheck">
                                        Mantenha-me conectado
                                    </b-form-checkbox>
                                    <div class="divider"/>
                                    <!--
                                    <h6 class="mb-0">
                                        Sem conta?
                                        <a href="javascript:void(0);" @click="registrarSistema" class="text-vivo">Inscreva-se agora</a>
                                    </h6>
                                    -->
                                </div>
                                <div class="modal-footer clearfix">
                                    <div class="float-left">
                                        <a href="javascript:void(0);"  @click="recuperarSenha" class="btn-lg btn btn-link">Recuperar Senha</a>
                                    </div>
                                    <div class="float-right">
                                        <button class="mt-2 btn btn-vivo">Entrar no Sistema</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div class="text-center text-white opacity-8 mt-3">
                            Direitos autorais &copy; Telefonica 2022
                        </div>
                    </form>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>

    import api from "../../api";

    export default {

        data: () => ({
            autenticacao: {
                email: null,
                senha: null
            }
        }),
        mounted() {
            localStorage.clear()
        },
        methods: {
            login(){
                

                api
                    .post("/autenticar", 
                        JSON.stringify( this.autenticacao )                    
                    )
                    .then((res) => {

                        localStorage.setItem('usuario', JSON.stringify(res.data))
                        if( res.data.perfil == 'ADMIN' || res.data.perfil == 'MASTER' || res.data.perfil == 'SHARING'){
                            this.$router.push( '/controlPanelGrouped' )
                        }else{
                            this.$router.push( `/controlPanel/${res.data.idCliente}` )
                        }
                 
                    })
                    .catch((error) => {
                     
                        this.$notify({
                            type: 'error',
                            title: 'Erro',
                            text: 'Erro ao realizar o login!'
                        });
                    });
            },

            recuperarSenha(){
   
                this.$router.push( '/forgotpasswordboxed' )
            }
        }
    }

</script>
