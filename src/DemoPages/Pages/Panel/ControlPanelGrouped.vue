<template>
  <div>
    
    <notifications position="bottom center"  />
    <vue-instant-loading-spinner ref="Spinner" color="#660099">
    </vue-instant-loading-spinner>
    <page-title :heading=heading :subheading=subheading :icon=icon></page-title>
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
            <b-col lg="12" class="my-1">
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
                  responsive
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
                    <p align="center" >Sua pesquisa n??o obteve resultado.</p>
                  </template>

                  <template #empty>
                    <p align="center">N??o existe projeto.</p>
                  </template>

                  
                  <template #cell(actions)="row">

                    <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="$router.push( `/controlPanel/${row.item.projetoCliente.id}` )">
                      <font-awesome-icon icon="plus"/>
                    </b-button>&nbsp;
                    
                  </template>

                </b-table>
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
        link: '',

        filter: null,
        filterOn: [],

        fields: [ 
          { key: 'projetoCliente.razaoSocial', label: 'Cliente', sortable: true, sortDirection: 'desc' },
          { key: 'projetoCliente.estado', label: 'Estado do Cliente', sortable: true, sortDirection: 'desc' },
          { key: 'projetoCliente.cidade', label: 'Cidade do Cliente', sortable: true, sortDirection: 'desc' },
          { key: 'projetoCliente.segmento', label: 'Segmento', class: 'text-center', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'A????o' , class: 'text-center' }
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
      this.listaPainel()
    },
    methods: {

      listaPainel() {

        this.$refs.Spinner.show();

        api
          .get("/painel/agrupado")
          .then((res) => {
            this.items = res.data.lista;
            console.log(this.items)
            this.$refs.Spinner.hide();
          })
          .catch((error) => {
            console.log(error);
            this.$refs.Spinner.hide();
            this.$notify({
              type: 'error',
              title: 'Erro',
              text: 'Ocorreu um erro na sua solicita????o! Favor validar se sua empresa esat cadastrada.'
            });
          });
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
