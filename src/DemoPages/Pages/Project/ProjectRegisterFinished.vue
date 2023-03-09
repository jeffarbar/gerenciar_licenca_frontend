<template>
  <div>
    <notifications position="bottom center"  />
    <vue-instant-loading-spinner ref="Spinner" color="#660099">
    </vue-instant-loading-spinner>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

    <div class="content">
      <div class="main-card mb-3 card">
        <div class="card-body">
          <form class="">
            <div class="form-row">
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="nome" class="">Nome do Projeto</label>
                  <input disabled name="nome" id="nome" v-model="projeto.nome" placeholder="Nome do Projeto" type="text" class="form-control">
                </div>
              </div>

              <div class="col-md-6">
                <div class="position-relative form-group"><label for="cliente" class="">Cliente</label>
                  <input disabled name="cliente" id="cliente" v-model="projeto.cliente" placeholder="Não tem Cliente" type="text" class="form-control">    
                </div>
              </div>
            </div>
             <div class="form-row">
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="nome" class="">Tipo de Documentação</label>

                  <ul id="example-1">
                    <li v-for="item in projeto.tipoDocumentacoes" :key="item.nome">
                      {{ item.nome }}
                    </li>
                  </ul>  
                
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="sharing" class="">Sharing</label>
                  <input disabled name="sharing" id="sharing" v-model="projeto.clienteSharing" placeholder="Não tem Sharing" type="text" class="form-control"> 
                </div>
              </div>
            </div>

             <div class="form-row">
              <div class="col-md-4">
                <div class="position-relative form-group"><label for="estado" class="">Estado</label>
                  <input disabled name="estado" id="estado" v-model="projeto.estado" placeholder="Não tem Estado" type="text" class="form-control"> 
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="cidade" class="">Cidade</label>
                  <input disabled name="cidade" id="cidade" v-model="projeto.cidade" placeholder="Não tem Cidade" type="text" class="form-control">
                </div>
              </div>
              <div class="col-md-2">
                <div class="position-relative form-group"><label for="cep" class="">CEP</label>
                  <input disabled type="text" name="cep" id="cep" v-model="projeto.cep" placeholder="Não tem Cep" class="form-control">
                </div>
              </div>
            </div>
            <div class="position-relative form-group"><label for="endereco" class="">Endereço</label>
              <input disabled name="endereco" id="endereco"  v-model="projeto.endereco" placeholder="Não tem Endereço" type="text" class="form-control">
            </div>
            
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

  export default {
    name:'LayoutsDemonstracao',
    components: {
      PageTitle,
     // Multiselect,
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
      this.carregar(this.$route.params.id)
    },
    methods: {

      carregar(id){
         
        if(id != undefined){

          this.$refs.Spinner.show();

          api
            .get(`/projeto/${id}`)
            .then((res) => {
              this.projeto.cidade = res.data.cidade   
              this.projeto.endereco = res.data.endereco  
              this.projeto.cep = res.data.cep
              this.projeto.estado = res.data.estado
              this.projeto.nome = res.data.nome   

              if( res.data.cliente != null ){  
                this.projeto.cliente = res.data.cliente.razaoSocial 
              }

              if( res.data.clienteSharing != null ){  
                this.projeto.clienteSharing = res.data.clienteSharing.razaoSocial  
              }


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


