<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <notifications position="bottom center"  />
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="6" class="mx-auto app-login-box">
                    
                    <div class="app-logo-inverse mx-auto mb-3"/>
                    <form @submit.prevent="recuperarSenha" class="">

                        <div class="modal-dialog w-100">
                            <div class="modal-content">

                                <div class="modal-body">
                                    <h5 class="modal-title">
                                        <h4 class="mt-2">
                                            <div>Esqueceu sua senha?,</div>
                                            <span>Use o formulário abaixo para recuperá-lo.</span>
                                        </h4>
                                    </h5>
                                    <div class="divider"/>
                                    <b-form-group id="exampleInputGroup1"
                                                label-for="exampleInput1"
                                                description="Nunca compartilharemos seu e-mail com mais ninguém.">
                                        <b-form-input id="exampleInput1"
                                                    type="email"
                                                    v-model="email.email"
                                                    required
                                                    placeholder="Digite o e-mail...">
                                        </b-form-input>
                                    </b-form-group>
                                    <div class="divider"/>
                                    <h6 class="mb-0">
                                        <a href="javascript:void(0);" @click="entrarContaExistente" class="text-vivo">Entrar na conta existente</a>
                                    </h6>
                                </div>
                                <div class="modal-footer d-block text-right">
                                    <button class="mt-2 btn btn-vivo">Recuperar Senha</button>
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
            email:{
                email:null
            }
        }),
        methods: {
            entrarContaExistente(){
                this.$router.push( '/loginboxed' )
            },
            recuperarSenha(){
                api
                    .post("/usuario/recuperarSenha", this.email )
                    .then((res) => {
              
                        this.$notify({
                            type: 'warn',
                            title: 'Alteração de senha',
                            text: 'Foi enviado uma nova senha para seu e-mail.',
                        });
                        this.$router.push( '/loginboxed' )
                    })
                    .catch((error) => {
                        this.$notify({
                            type: 'error',
                            title: 'Erro',
                            text: 'Não foi possível realizar sua solicitação!'
                        });
                    });
            }
        }
    }

</script>