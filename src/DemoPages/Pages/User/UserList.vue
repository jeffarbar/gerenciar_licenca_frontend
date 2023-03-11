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
            <p align="center" >Sua pesquisa não obteve resultado.</p>
          </template>

          <template #empty>
            <p align="center">Não existe usuário.</p>
          </template>

          <template #cell(actions)="row">

            <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="row.toggleDetails">
              <div v-if="row.detailsShowing">
                <i class="pe-7s-angle-up-circle" style="font-size:16px;font-weight: bold;"></i> 
              </div>
              <div v-else>
                <i class="pe-7s-angle-down-circle" style="font-size:16px;font-weight: bold;"></i>
              </div>
            </b-button>

            <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="$router.push( `/userRegister/${row.item.id}` )">
               <i class="pe-7s-note" style="font-size:17px;font-weight: bold;"> </i>
            </b-button>&nbsp;

            <b-button v-if="master" class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="deletaModal(row.item, $event.target)">
              <font-awesome-icon icon="trash-alt"/>
            </b-button>
          </template>


          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>

        </b-table>

        <b-modal :id="infoModal.id" v-model="showModal" :title="infoModal.title" ok-only @hide="resetInfoModal">
          <template v-slot:modal-footer="{ hide }">
            <b-button size="sm" variant="outline-vivo" @click="hide()">
              Fechar
            </b-button>
            <b-button size="sm" variant="outline-vivo" @click="deleta( infoModal.idUsuario )">
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
        heading: 'Usuário',
        subheading: 'Lista de usuário.',
        icon: 'pe-7s-drawer icon-gradient bg-happy-itmeo',
        link: '/userRegister',

        filter: null,
        filterOn: [],

        master: false,

        fields: [ 
          { key: 'nome', label: 'Nome Usuário', sortable: true, sortDirection: 'desc' },
          { key: 'email', label: 'E-mail', sortable: true, sortDirection: 'desc' },
          { key: 'cliente.razaoSocial', label: 'Cliente', sortable: true, sortDirection: 'desc' },
          { key: 'perfil', label: 'Perfil', sortable: true, sortDirection: 'desc' },
          { key: 'dataCadastro', label: 'Data Cadastro', class: 'text-center', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Ação' , class: 'text-center' }
        ],
        
        items: [],

        perPage: 10,
        currentPage: 1,

        showModal: false,
        infoModal: {
          id: 'info-modal',
          idUsuario: undefined,
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
      this.valida()
      this.listaUsuarios()
    },
    methods: {

      valida(){

        let usuario = JSON.parse( localStorage.getItem('usuario') )

        if( usuario != null ){
          this.master = usuario.master
        }
      },

      listaUsuarios() {
        this.$refs.Spinner.show();
        api
          .get("/usuario/")
          .then((res) => {

            this.items = res.data.lista;
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

      },
      deleta(id){
        if(id != undefined){
          
          this.$refs.Spinner.show();
          
          api
            .delete(`/usuario/${id}`)
            .then((res) => {
              this.$notify({
                type: 'success',
                title: 'Sucesso',
                text: 'Sua solicitação foi atendida!'
              });
         
              this.listaUsuarios()
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
        this.resetInfoModal()
      },
      deletaModal(item, button) {
        this.showModal=true
        this.infoModal.title = `Deletar`
        //this.infoModal.content = JSON.stringify(item, null, 2)
        this.infoModal.content = `Deseja deletar o usuário ${item.nome}?`
        this.infoModal.idUsuario = item.id
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.infoModal.idUsuario = undefined
        this.showModal=false
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
