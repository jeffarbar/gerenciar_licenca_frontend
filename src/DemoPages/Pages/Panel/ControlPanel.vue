<template>
  <div>
    
    <notifications position="bottom center"  />
    <vue-instant-loading-spinner ref="Spinner" color="#660099">
    </vue-instant-loading-spinner>
    <page-title :heading=heading :subheading=subheading :icon=icon :link=link></page-title>
    <b-card>
      <b-container fluid>
        
        <b-row>  
          <b-col lg="5" class="my-1">
            <b-form-group
              label="Filtro"
              label-for="filter-input"
              label-cols-sm="2"
              label-align-sm="center"
              label-size="sm"
              class="mb-0"
              label-class="font-weight-bold"
            >

              <b-input-group size="sm">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Pesquisar..."
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>  
            <b-col lg="9" class="my-1">
                <br>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                  styles="background=red"
                ></b-pagination>

                <p class="mt-3"><small>Pagina atual </small><b>{{ currentPage }}</b></p>

                <b-table :striped="true"
                  :bordered="false"
                  :outlined="false"
                  :small="true"
                  :hover="true"
                  :dark="false"
                  :fixed="true"
                  :foot-clone="false"
                  :items="items"
                  :fields="fields"
                  stacked="md"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  @filtered="onFiltered"
                  show-empty
                  :per-page="perPage"
                  :current-page="currentPage"
                  >

                  <template #emptyfiltered>
                    <p align="center" >Sua pesquisa não obteve resultado.</p>
                  </template>

                  <template #empty>
                    <p align="center">Não existe projeto.</p>
                  </template>

                  <template #cell(statusDocumento)="row">
                    {{ row.item.tipoDocumentacao.situacaoDocumentacao }}
                    <div v-if="row.item.tipoDocumentacao.situacaoDocumentacao == 'FINALIZADO'" >
                      <i class="pe-7s-check" style="font-size:16px;font-weight:bold;color:#69aa8a;"> </i>
                    </div>
                    <div v-else>
                      <i class="pe-7s-close-circle" style="font-size:16px;font-weight:bold;color:#e70909;"> </i>
                    </div>
                  </template>

                  <template #cell(actions)="row">

                    <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="$router.push( `/uploadDoc/${row.item.id}` )">
                      <font-awesome-icon icon="plus"/>
                    </b-button>&nbsp;

                    <!--
                    <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="$router.push( `/uploadDoc/${row.item.id}` )">
                      
                      <i class="pe-7s-search" style="font-size:16px;font-weight: bold;"> </i>
                    </b-button>

                    <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="deletaModal(row.item, $event.target)">
                      <font-awesome-icon icon="trash-alt"/>
                    </b-button>
                    -->
                    
                  </template>

                </b-table>
            </b-col>
            <b-col lg="3" class="my-1">
                <br>
                <div class="form-row">
                  <div class="col-md-12">
                      <b-card class="mb-12">
                        <b>Processo Geral</b>                       
                        <b-progress class="mt-3" :max="max" show-value>
                          <b-progress-bar :value="porcentagem" show-progress animated variant="alternate">{{porcentagem}}%</b-progress-bar>
                        </b-progress>
                        <br>
                        <p align="center"><small>{{quantidadeDocumentoOk}} documento(s) de uma total de {{quantidadeTotal}} necessário(s)</small></p>
                      </b-card>
                  </div>
                </div>
            </b-col>
        </b-row>


      </b-container>

    </b-card>
  </div>

</template>

<script>

  import PageTitle from "../../../Layout/Components/PageTitle2.vue";

  import api from "../../../api";

  import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'

  export default {
    components: {
      PageTitle,
      VueInstantLoadingSpinner,
    },
    data() {
      return {
        heading: 'Painel',
        subheading: 'Painel de controle.',
        icon: 'pe-7s-drawer icon-gradient bg-happy-itmeo',
        link: '/projectRegister',

        quantidadeDocumentoOk:0,
        quantidadeTotal:0,

        porcentagem: 0,
        max: 100,

        filter: null,
        filterOn: [],

        fields: [ 
          { key: 'nome', label: 'Projeto', sortable: true, sortDirection: 'desc' },
          { key: 'cliente.razaoSocial', label: 'Cliente', sortable: true, sortDirection: 'desc' },
          { key: 'tipoDocumentacao.nome', label: 'Tipo de Documentação', sortable: true, sortDirection: 'desc' },
          { key: 'cidade', label: 'Cidade do Projeto', sortable: true, sortDirection: 'desc' },
          { key: 'clienteSharing.razaoSocial', label: 'Sharing', class: 'text-center', sortable: true, sortDirection: 'desc' },
          { key: 'statusDocumento', label: 'Status', class: 'text-center', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Ação' , class: 'text-center' }
        ],

        items: [],

        perPage: 10,
        currentPage: 1,
        

        showModal: false,
        infoModal: {
          id: 'info-modal',
          idDocumentacao: undefined,
          title: '',
          content: ''
        }
      }
    },
    computed: {
      rows() {
        return this.items.length
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
     mounted() {
      this.listaPainel(this.$route.params.id)
    },
    methods: {

      listaPainel(id) {

        if(id != undefined){

          this.$refs.Spinner.show();

          api
            .get(`/painel/${id}`)
            .then((res) => {
              this.items = res.data.lista;
              //console.log( 'PÀINEL ' + JSON.stringify( this.items))
              this.quantidadeDocumentoOk = res.data.quantidadeDocumentoOk
              this.quantidadeTotal = res.data.quantidadeTotal
              this.calculaPorcentagem()
              this.$refs.Spinner.hide();
            })
            .catch((error) => {
              //console.log(error);
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
            text: 'Ocorreu um erro na sua solicitação!'
          });
        }
      },
      calculaPorcentagem() {
        if(this.quantidadeTotal != 0 && this.quantidadeTotal != null){
          this.porcentagem = ((this.quantidadeDocumentoOk * 100) / this.quantidadeTotal).toFixed(2)
        }else{
          this.porcentagem = 0
        }
      },

      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.infoModal.idDocumentacao = undefined
        this.showModal=false
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
