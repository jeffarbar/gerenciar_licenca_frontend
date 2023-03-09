<template>
  <div>
    <notifications position="bottom center"  />
    <vue-instant-loading-spinner ref="Spinner" color="#660099">
    </vue-instant-loading-spinner>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
    <div class="content">
      <div class="main-card mb-3 card">
        <div class="card-body">
          <form @submit.prevent="save" class="">
            <div class="form-row">
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="nome" class="">Nome</label>
                  <input name="nome" id="nome" v-model="usuario.nome" required placeholder="Nome" type="text" class="form-control">
                </div>
              </div>
               <div class="col-md-4">
                <div  class="position-relative form-group"><label for="email" class="">E-mail</label>
                  <input name="email" id="email" :disabled="!master"  v-model="usuario.email" required placeholder="e-mail" type="email" class="form-control">
                </div>
              </div>
              <div class="col-md-2">
                <div class="position-relative form-group"><label for="telefone" class="">Telefone</label>
                  <input name="telefone" id="telefone"  v-mask="'(##)#####-####'" v-model="usuario.telefone" required placeholder="(11)95600-1011" type="text" class="form-control">
                </div>
              </div>
            </div>

            <div v-if="!usuario.perfilAdministrador" id="lista_cliente" class="form-row">
               <div class="col-md-6">
                <div class="position-relative form-group">

                  <label for="cliente" class="">Cliente</label>
                   <v-select 
                      name="cliente" 
                      id="cliente" 
                      v-model="usuario.cliente"   
                      placeholder="Cliente" 
                      :options="clientes" 
                      label="razaoSocial"
                   >
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!usuario.cliente"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                    <template slot="option" slot-scope="option">
                        {{ option.razaoSocial }}
                    </template>
                    <template #no-options="{ search }">
                      Não foi possível encontrar {{search}}
                    </template>
                   </v-select>

                  <!--
                  <select name="select" id="cliente" v-model="usuario.cliente" required  class="form-control">
                      <option v-for="(item, index) in clientes" 
                        :value="item" 
                        :key="index">
                          {{item.razaoSocial}}
                      </option>
                  </select>  
                  -->
                </div>
              </div>
            </div>

            <div class="row" v-if="$route.params.id == undefined">
              <div class="col-md-3">
                  <div class="position-relative form-group">
                    <label for="senha" class="">Senha</label>

                    <input name="senha" id="senha" :ref="'_senha'" v-model="usuario.senha" required 
                      placeholder="Digite a senha..." type="password" class="form-control">
                  </div>
              </div>
              <div class="col-md-3">
                  <div class="position-relative form-group">
                    <label for="senha" class="">Repita a Senha</label>

                    <input name="senha_repetida" id="senha_repetida" :ref="'_senha_repetida'" @keyup="verificaForcaSenha"
                    v-model="usuario.senha_repetida" required placeholder="Repita a senha..." type="password" class="form-control">
                  </div>
              </div> 
              <div class="col-md-3">
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
              <div class="col-md-3"></div>
              
              <div class="col-md-6">
                <span id="password-status" :ref="'password-status'">{{ forcaSenha }}</span>
              </div>


            </div>
            <p align="right">
              <button class="mt-2 btn btn-vivo">Salva</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import PageTitle from "../../../Layout/Components/PageTitle.vue";

  import api from "../../../api";

  import "vue-select/dist/vue-select.css";

  import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'

  export default {
    name:'LayoutsDemonstracao',
    components: {
      PageTitle,
      VueInstantLoadingSpinner,
    },
    data: () => ({
      heading: 'Usuário Sharing',
      subheading: 'Cadastrado de usuário sharing.',
      icon: 'pe-7s-graph text-success',

      clientes: [],
      master: false,
      forcaSenha: '',

      usuario: { 
        nome: null,
        perfilAdministrador: false,
        sharing: true,
        telefone: null,
        cliente: null,
        email: null,
        senha: null,
        senha_repetida: null
      },
      showPassword:false,

    }),
    mounted() {
      this.valida()
      this.carregar(this.$route.params.id)
      this.listaClientes()
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
      valida(){

        let usuario = JSON.parse( localStorage.getItem('usuario') )

        if( usuario != null ){
          this.master = usuario.master
        }
      },
      listaClientes() {

        if( this.usuario.perfilAdministrador == false){
          api
            .get("/cliente/listSharing")
            .then((res) => {
            
              this.clientes = res.data.lista;
            })
            .catch((error) => {
              this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });

            });
        }
      },

      save(){

        if(this.$route.params.id == null){

          if(this.forcaSenha == 'Forte'){

            this.$refs.Spinner.show();

            api
              .post("/usuario/", this.usuario )
              .then((res) => {
                this.$notify({
                  type: 'success',
                  title: 'Sucesso',
                  text: 'Sua solicitação foi atendida!'
                });
                this.usuario = null
          
                this.$refs.Spinner.hide();
                this.$router.push( '/sharingUserList' );
              })
              .catch((error) => {
                this.$refs.Spinner.hide();
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

        }else{
      
          this.$refs.Spinner.show();
          api
            .put(`/usuario/${this.$route.params.id}`, this.usuario )
            .then((res) => {
              this.$notify({
                type: 'success',
                title: 'Sucesso',
                text: 'Sua solicitação foi atendida!'
              });
              this.usuario = null
           
              this.$refs.Spinner.hide();
              this.$router.push( '/sharingUserList' );
            })
            .catch((error) => {
              this.$refs.Spinner.hide();
              this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });
            
          });
        }
       
      },
      carregar(id){
        
        if(id != undefined){
          this.$refs.Spinner.show();
          api
            .get(`/usuario/${id}`)
            .then((res) => {
          
              this.usuario = res.data;
              this.$refs.Spinner.hide();
            })
            .catch((error) => {
              this.$refs.Spinner.hide();
              this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });

            });
          }
      }
    }
  }
</script>

<style scoped>
>>> {
  --vs-dropdown-option--active-bg: #660099;
  --vs-actions-padding: 4px 6px 0 3px;
  --vs-controls-size: 0.85;
}
</style>