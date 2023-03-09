<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <notifications position="bottom center"  />
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>
                    <form @submit.prevent="atualizarSenha" class="">
                        <div class="modal-dialog w-100">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <h5 class="modal-title">
                                        <h4 class="mt-2">
                                            <div>Bem-vindo,</div>
                                            <span>Leva apenas alguns segundos para atualizar sua conta</span>
                                        </h4>
                                    </h5>
                                    <div class="divider"/>
                                    <b-form-group id="exampleInputGroup1"
                                                label-for="exampleInput1"
                                                description="Nunca compartilharemos seu e-mail com mais ninguém.">
                                        <b-form-input id="exampleInput1"
                                                    type="email"
                                                    disabled
                                                    v-model="usuario.email"
                                                    required
                                                    placeholder="Digite o e-mail...">
                                        </b-form-input>
                                    </b-form-group>
                                    <b-form-group id="exampleInputGroup12"
                                                label-for="exampleInput12">
                                        <b-form-input id="exampleInput12"
                                                    type="text"
                                                    required
                                                    v-model="usuario.username"
                                                    disabled
                                                    placeholder="Insira nome de usuário...">
                                        </b-form-input>
                                    </b-form-group>
                                    <div class="row">
                                        <div class="col-md-5">

                                            <div class="position-relative form-group">
                                                <label for="senha" class="">Senha</label>

                                                <input name="senha" id="senha" :ref="'_senha'" v-model="usuario.senha" required 
                                                placeholder="Digite a senha..." type="password" class="form-control">
                                            </div>
                              
                                        </div>
                                        <div class="col-md-5">

                                            <div class="position-relative form-group">
                                                <label for="senha" class="">Repita a Senha</label>

                                                <input name="senha_repetida" id="senha_repetida" :ref="'_senha_repetida'" @keyup="verificaForcaSenha"
                                                v-model="usuario.senha_repetida" required placeholder="Repita a senha..." type="password" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="position-relative form-group">
                                                <label for="senha" class="">
                                                </label>
                                            </div>
                                            <div v-if="showPassword">
                                                <i class="pe-7s-lock" title="Esconder senha" @click="mostrarSenha" style="font-size:17px;font-weight: bold;"></i>
                                            </div>
                                            <div v-else>
                                                <i class="pe-7s-look" title="Mostrar senha" @click="mostrarSenha" style="font-size:17px;font-weight: bold;"></i>
                                            </div>
                       
                                        </div>
                                        <div class="col-md-12">
                                            <span id="password-status" :ref="'password-status'">{{ forcaSenha }}</span>
                                        </div>
                                    </div>
                                    <!--
                                    <b-form-checkbox name="check"  required id="exampleCheck">
                                        Aceite nosso <a href="javascript:void(0);" class="text-vivo">Termos e Condições</a>.
                                    </b-form-checkbox>
                                    -->
                                    <div class="divider"/>
                                    <h6 class="mb-0" >
                                        Já tem uma conta?
                                        <a href="javascript:void(0);" @click="entrar" class="text-vivo">Entrar</a>
                                         <!--
                                        |
                                        <a href="javascript:void(0);" @click="recuperarSenha" class="text-vivo">Recuperar Senha</a>
                                        -->
                                    </h6>
                                </div>
                                <div class="modal-footer d-block text-right">
                                    <button class="mt-2 btn btn-vivo">Atualizar senha</button>
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
            usuario:{
                username:null,
                email: null,
                senha: null,
                senha_repetida: null,
            },
            forcaSenha: '',
            showPassword:false,
        }),
        mounted() {
            this.carrega();
        },
        methods: {
            verificaForcaSenha() {
        

                var numeros = /([0-9])/;
                var alfabeto = /([a-zA-Z])/;
                var chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
                
                if( this.usuario.senha_repetida == null ){

                this.$refs['password-status'].style.color="red"
                this.forcaSenha = "Favor inserir a senha";

                }else if( this.usuario.senha_repetida.length < 6 ) {

                this.$refs['password-status'].style.color="red"
                this.forcaSenha = "Fraco, insira no mínimo 6 caracteres";

                }else{

                
                if( !this.usuario.senha_repetida.match(numeros)){

                    this.$refs['password-status'].style.color="orange"
                    this.forcaSenha = "Médio, insira um caracter decimal";

                }else if( !this.usuario.senha_repetida.match(alfabeto)){

                    this.$refs['password-status'].style.color="orange"
                    this.forcaSenha = "Médio, insira um caracter alfabético";
                
                }else if( !this.usuario.senha_repetida.match(chEspeciais)){

                    this.$refs['password-status'].style.color="orange"
                    this.forcaSenha = "Médio, insira um caracter especial";

                }else if( this.usuario.senha_repetida != this.usuario.senha ){

                    this.$refs['password-status'].style.color="red"
                    this.forcaSenha = "Senhas não conferem";

                }else{

                    this.$refs['password-status'].style.color="green"
                    this.forcaSenha = "Forte";

                }
                }

            },

            mostrarSenha(){
              
                
                if(this.showPassword){
                    this.showPassword = false;
                    this.$refs['_senha'].type='password';
                    this.$refs['_senha_repetida'].type='password';
                }else{
                    this.showPassword = true;
                    this.$refs['_senha'].type='text';
                    this.$refs['_senha_repetida'].type='text';
                }   
            },
            carrega(){
                let _usuario = JSON.parse( localStorage.getItem('usuario') )

                if(_usuario != null){
                    this.usuario.username = _usuario.username
                    this.usuario.email = _usuario.email
                }else{
                    this.$notify({
                        type: 'error',
                        title: 'Erro',
                        text: 'Erro ao realizar o login!'
                    });
                }
            },
            entrar(){
      
                this.$router.push( '/loginboxed' )
            },
            recuperarSenha(){
       
                this.$router.push( '/forgotpasswordboxed' )
            },
            atualizarSenha(){


                if(this.forcaSenha == 'Forte'){
                
                    api
                        .post("/usuario/atualizarSenha", this.usuario )
                        .then((res) => {
                          
                            this.$router.push( '/loginboxed' )
                        })
                        .catch((error) => {
                            this.$notify({
                            type: 'error',
                            title: 'Erro',
                            text: 'Ocorreu um erro na sua solicitação!'
                            });
                     
                        });

                }else{

    
                    this.$notify({
                        type: 'error',
                        title: 'Erro',
                        text: 'Sua senha não é forte'
                    });

                }
            }
        }
    }

</script>