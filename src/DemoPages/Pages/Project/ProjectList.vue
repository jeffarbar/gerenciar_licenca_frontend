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
            <p align="center">Sua pesquisa não obteve resultado.</p>
          </template>

          <template #empty>
            <p align="center">Não existe projeto.</p>
          </template>

    
          <template #cell(actions)="row">

            <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="$router.push( `/projectRegister/${row.item.id}` )">
              <i class="pe-7s-note" style="font-size:17px;font-weight: bold;"> </i>
            </b-button>&nbsp;
            <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="deletaModal(row.item, $event.target)">
              <font-awesome-icon icon="trash-alt"/>
            </b-button>
          </template>

        </b-table>

        <b-modal :id="infoModal.id" v-model="showModal" :title="infoModal.title" ok-only @hide="resetInfoModal">
          <template v-slot:modal-footer="{ hide }">
            <b-button size="sm" variant="outline-vivo" @click="hide()">
              Fechar
            </b-button>
            <b-button size="sm" variant="outline-vivo" @click="deleta( infoModal.idProjeto )">
              Deletar
            </b-button>
          </template>
          <pre>{{ infoModal.content }}</pre>
        </b-modal>
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
        heading: 'Projeto em Andamento',
        subheading: 'Lista de projetos em andamento.',
        icon: 'pe-7s-drawer icon-gradient bg-happy-itmeo',
        link: '/projectRegister',

        filter: null,
        filterOn: [],

        fields: [ 
          { key: 'nome', label: 'Projeto', sortable: true, sortDirection: 'desc' },
          { key: 'cliente.razaoSocial', label: 'Cliente', sortable: true, sortDirection: 'desc' },
          { key: 'tipoDocumentacao.nome', label: 'Tipo Documentação', sortable: true, sortDirection: 'desc' },
          { key: 'dataCadastro', label: 'Data Cadastro', class: 'text-center', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Ação' , class: 'text-center' }
        ],

        items: [],

        perPage: 10,
        currentPage: 1,

        showModal: false,
        infoModal: {
          id: 'info-modal',
          idProjeto: undefined,
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
    mounted (){
      this.listaProjetos()
    },
    methods: {
      
      listaProjetos() {

        this.$refs.Spinner.show();

        api
          .get("/projeto/")
          .then((res) => {
            this.items = res.data.lista;
            this.$refs.Spinner.hide();
          })
          .catch((error) => {
            console.log(error);
            this.$refs.Spinner.hide();
            this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
            });
          });
      },

      deleta(id){

        if(id != undefined){

          this.$refs.Spinner.show();

          console.log('Projeto que será deletado ' + id);

          api
            .delete(`/projeto/${id}`)
            .then((res) => {
              this.listaProjetos()
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
        this.resetInfoModal()
      },
      deletaModal(item, button) {
        this.showModal=true
        this.infoModal.title = `Deletar`
        //this.infoModal.content = JSON.stringify(item, null, 2)
        this.infoModal.content = `Deseja deletar o projeto ${item.nome}?`
        this.infoModal.idProjeto = item.id
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.infoModal.idProjeto = undefined
        this.showModal=false
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
