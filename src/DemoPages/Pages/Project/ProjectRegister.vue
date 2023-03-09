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
                <div class="position-relative form-group"><label for="nome" class="">Nome do Projeto</label>
                  <input name="nome" id="nome" v-model="projeto.nome" required placeholder="Nome do Projeto" type="text" class="form-control">
                </div>
              </div>

              <div class="col-md-6">
                <div class="position-relative form-group">
                  <label for="cliente" class="">Cliente</label>
                   <v-select 
                      name="cliente" 
                      id="cliente" 
                      v-model="projeto.cliente"   
                      placeholder="Cliente" 
                      :options="clientes" 
                      label="razaoSocial"
                   >
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!projeto.cliente"
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

                </div>
              </div>
            </div>
             <div class="form-row">
              <div class="col-md-6">
                <div class="position-relative form-group">
                  <label for="nome" class="">Tipo de Documentação</label>
                  <multiselect v-model="projeto.tipoDocumentacoes" 
                     name="TipoDocumentacao" 
                    :options="tipo_documentacoes" 
                    :multiple="true"
                    :close-on-select="false" 
                    :clear-on-select="true" 
                    :preserve-search="true" 
                    :data-deselect="'Pressione enter para remover'" 
                    :placeholder="'Tipo de Documentação'" 
                    :select-label="'Selecione'"
                    :selected-label="'Selecionado'"
                    :deselect-label="'Remover'"
                    :preselect-first="false"
                    label="nome"
                    track-by="nome"
                  >
                    
                    <template slot="selection" slot-scope="{ values, isOpen }">
                      <span  v-if="values.length &amp;&amp; !isOpen">{{ values.length }} documentação(ções) selecionada(s)</span>
                    </template>
                    <span slot="noResult">Não foi possível encontrar.</span>
                  </multiselect>
                  
                </div>
              </div>
            
              <div class="col-md-6">

                <div class="position-relative form-group">
                  <label for="sharing" class="">Sharing</label>
                   <v-select 
                      name="sharing" 
                      id="sharing" 
                      v-model="projeto.clienteSharing"   
                      placeholder="Sharing" 
                      :options="sharings" 
                      label="razaoSocial"
                   >
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                      
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                    <template slot="option" slot-scope="option">
                        {{ option.razaoSocial}}
                    </template>
                    <template #no-options="{ search }">
                      Não foi possível encontrar {{search}}
                    </template>
                   </v-select>

                </div>

              </div>

            </div>

             <div class="form-row">
              <div class="col-md-4">
                <div class="position-relative form-group">
                  <label for="estado" class="">Estado</label>
                   <v-select 
                      name="estado" 
                      id="estado" 
                      v-model="projeto.estado"   
                      placeholder="Estado" 
                      :options="estados" 
                   >
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!projeto.estado"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                    <template slot="option" slot-scope="option">
                        {{ option.label }}
                    </template>
                    <template #no-options="{ search }">
                       Não foi possível encontrar {{search}}
                    </template>
                   </v-select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="cidade" class="">Cidade</label>
                  <input name="cidade" id="cidade" v-model="projeto.cidade" required placeholder="Cidade" type="text" class="form-control">
                </div>
              </div>
              <div class="col-md-2">
                <div class="position-relative form-group"><label for="cep" class="">CEP</label>
                  <input type="text"  v-mask="'#####-###'" name="cep" id="cep" v-model="projeto.cep" required placeholder="06455-911" class="form-control">
                </div>
              </div>
            </div>
            <div class="position-relative form-group"><label for="endereco" class="">Endereço</label>
              <input name="endereco" id="endereco"  v-model="projeto.endereco" required placeholder="Endereço" type="text" class="form-control">
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

  import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'

  import Multiselect from 'vue-multiselect'

  import "vue-select/dist/vue-select.css";

  export default {
    name:'LayoutsDemonstracao',
    components: {
      PageTitle,
      Multiselect,
      VueInstantLoadingSpinner,
    },
    data: () => ({

      value: [],

      heading: 'Projeto',
      subheading: 'Cadastrado de projeto.',
      icon: 'pe-7s-graph text-success',

      estados: ["Acre",  "Alagoas",  "Amapá",  "Amazonas",  "Bahia",  "Ceará",  "Distrito Federal",  "Espírito Santo",  "Goiás",  "Maranhão",  "Mato Grosso",  "Mato Grosso do Sul",  "Minas Gerais",  "Pará",  "Paraíba",  "Paraná",  "Pernambuco",  "Piauí",  "Rio de Janeiro",  "Rio Grande do Norte",  "Rio Grande do Sul",  "Rondônia",  "Roraima",  "Santa Catarina",  "São Paulo",  "Sergipe",  "Tocantins"],

      clientes: [],
      sharings: [],
      tipo_documentacoes: [],
      projeto: { 
        nome: null,
        cliente: null,
        clienteSharing: null,
        tipoDocumentacoes: [],
        cidade: null,
        endereco: null,
        cep: null,
        estado: null,
      },
    }),
    mounted() {
      this.listaClientes()
      this.listaSharings()
      this.listaTipoDocumentacoes()
      this.carregar(this.$route.params.id)
    },
    methods: {

      listaTipoDocumentacoes() {
        api
          .get("/tipoDocumentacao/projetoTipoDocumentacao")
          .then((res) => {
            this.tipo_documentacoes = res.data.lista;
          })
          .catch((error) => {
            this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });
            console.log(error);
          });

      },

      listaSharings() {
        api
          .get("/cliente/listSharing")
          .then((res) => {
            //console.log( 'Sharing ' + JSON.stringify( res.data.lista ) )
            this.sharings = res.data.lista;
          })
          .catch((error) => {
            this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });
            console.log(error);
          });
      },

      listaClientes() {
        api
          .get("/cliente/projetoCliente")
          .then((res) => {
            //console.log( 'CLIENTE ' + JSON.stringify( res.data.lista ) )
            this.clientes = res.data.lista;
          })
          .catch((error) => {
            this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });
            console.log(error);
          });
      },
      save(){

        if( this.projeto.cliente == null || this.projeto.nome == null || 
            this.projeto.tipoDocumentacoes == null || this.projeto.tipoDocumentacoes.length == 0){

            this.$notify({
              type: 'warn',
              title: 'Aviso',
              text: 'Por favor preencher o campo de Tipo de Documentação!'
            });

          return;
        }

        this.$refs.Spinner.show();

        if(this.$route.params.id == null){
          
          //console.log('Salvando projeto ' + JSON.stringify(this.projeto)); 
          api
            .post("/projeto/", this.projeto )
            .then((res) => {
              this.$notify({
                type: 'success',
                title: 'Sucesso',
                text: 'Sua solicitação foi atendida!'
              });
              this.projeto = null
              //console.log(res.data)
              this.$refs.Spinner.hide();
              this.$router.push( '/projectList' );
            })
            .catch((error) => {
              this.$refs.Spinner.hide();
              this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });
              console.log(error);
            });

        }else{
          // console.log('Atualizando projeto ' +  JSON.stringify(this.projeto)); 
           api
              .put(`/projeto/${this.$route.params.id}`, this.projeto )
              .then((res) => {
                this.$notify({
                  type: 'success',
                  title: 'Sucesso',
                  text: 'Sua solicitação foi atendida!'
                });
                this.projeto = null
                //console.log(res.data)
                this.$refs.Spinner.hide();
                this.$router.push( '/projectList' );
              })
              .catch((error) => {
                this.$refs.Spinner.hide();
                this.$notify({
                  type: 'error',
                  title: 'Erro',
                  text: 'Ocorreu um erro na sua solicitação!'
                });
                console.log(error);
            });
        }
      },
      carregar(id){
         
        if(id != undefined){

          this.$refs.Spinner.show();

          api
            .get(`/projeto/${id}`)
            .then((res) => {
      //console.log(res.data)
              this.projeto.cidade = res.data.cidade   
              this.projeto.endereco = res.data.endereco  
              this.projeto.cep = res.data.cep
              this.projeto.estado = res.data.estado
              this.projeto.nome = res.data.nome   
              this.projeto.cliente = res.data.cliente  
              this.projeto.clienteSharing = res.data.clienteSharing  
              this.projeto.tipoDocumentacoes.push(res.data.tipoDocumentacao)
              this.$refs.Spinner.hide();
            })
            .catch((error) => {
              this.$refs.Spinner.hide();
              this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });
              console.log(error);
            });
        }
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style scoped>
>>> {
  --vs-dropdown-option--active-bg: #660099;
  --vs-actions-padding: 4px 6px 0 3px;
  --vs-controls-size: 0.85;
}
</style>

