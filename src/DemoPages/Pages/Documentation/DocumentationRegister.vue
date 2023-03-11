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
                <div class="position-relative form-group"><label for="nome" class="">Nome da Documentação</label>
                  <input name="nome" id="nome" v-model="documentacao.nome" required placeholder="Documentação ambiental" type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6">
                <div class="position-relative form-group">
                  <a href="javascript:void(0);" @click="showModalInclirDoc()" class="btn-lg btn btn-link">
                  <font-awesome-icon icon="plus"/>&nbsp;Adicionar documento</a>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12"  >
                <br>
                  <b-table :striped="true"
                    responsive
                    :bordered="false"
                    :outlined="false"
                    :small="true"
                    :hover="true"
                    :dark="false"
                    :fixed="true"
                    :foot-clone="false"
                    :items="documentacao.documentos"
                    :fields="fields"
                    stacked="md"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    @filtered="onFiltered"
                    show-empty
                    >

                  <template #empty>
                    <p align="center">Não existe documento.</p>
                  </template>

                  <template #cell(obrigatorio)="row">
                    <b-form-checkbox :disabled="true" v-model="row.item.obrigatorio" >
                    </b-form-checkbox>
                  </template>

                  <template #cell(actions)="row">

                      <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="editarModal(row.item, $event.target)">
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
                    <b-button size="sm" variant="outline-vivo" @click="excluirDoc( infoModal.idDoc )">
                      Deletar
                    </b-button>
                  </template>
                  <pre>{{ infoModal.content }}</pre>
                </b-modal>
              </div>
            </div>
            <p align="right">
              <button class="mt-2 btn btn-vivo">Salva</button>
            </p>

          </form>

          <b-modal :id="idModelIncluiDoc.id" v-model="showModalIncluiDoc" :title="idModelIncluiDoc.title" ok-only @hide="resetInfoModal">
              <template v-slot:modal-footer="{ hide }">
                <b-button size="sm" variant="outline-vivo" @click="hide()">
                  Fechar
                </b-button>
                <b-button  v-if="idModelIncluiDoc.title == 'Inserir'" size="sm" variant="outline-vivo" @click="incluirDoc()">
                  Inserir
                </b-button>
                <b-button  v-else size="sm" variant="outline-vivo" @click="editarDoc(  idModelIncluiDoc.idDoc )">
                  Editar
                </b-button>
              </template>

              <div class="form-row">
                <div class="col-md-6">
                  <div class="position-relative form-group"><label for="nome" class="">Nome do Documento</label>
                    <input name="nome" id="nome" v-model="documento_incluido" required placeholder="Comprovante X" type="text" class="form-control">
                  </div>
                </div>
              </div>
              <!-- 
              <div class="form-row">
                <div class="col-md-6">
                  <b-form-checkbox name="check" v-model="obrigatorio_incluido" id="exampleCheck">
                      Obrigatório?
                  </b-form-checkbox>
                </div>
              </div>
                 -->
            </b-modal>
            
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
      VueInstantLoadingSpinner,
    },
    data: () => ({
      heading: 'Documentação',
      subheading: 'Cadastrado da documentação.',
      icon: 'pe-7s-graph text-success',

      documentacao: { 
        nome: null,
        documentos: []
      },

      filter: null,
      filterOn: [],

      fields: [ 
        { key: 'nome', label: 'Documento', sortable: true, sortDirection: 'desc' },
        { key: 'dataCadastro', label: 'Data Cadastro', class: 'text-center', sortable: true, sortDirection: 'desc' },
        { key: 'actions', label: 'Ação' , class: 'text-center' }
      ],

      showModalIncluiDoc: false,
      idModelIncluiDoc:{
        id: 'info-inclui-doc-modal',
        idDoc: undefined,
        title: 'Inserir',
        content: 'Por favor, preencha os campos'
      },

      showModal: false,
      infoModal: {
        id: 'info-modal',
        idDoc: undefined,
        title: '',
        content: ''
      },
      documento_incluido: null,
      obrigatorio_incluido:false

    }),
    mounted() {
      this.carregar(this.$route.params.id)
    },
    methods: {

      showModalInclirDoc(){
        this.showModalIncluiDoc = true
        this.documento_incluido = null,
        this.obrigatorio_incluido = false,
        this.idModelIncluiDoc.title = 'Inserir'
      },

      save(){

        this.$refs.Spinner.show();

        if(this.$route.params.id == null){

          console.log('Salvando documentação ' + this.documentacao.nome); 

          api
            .post("/tipoDocumentacao/", this.documentacao )
            .then((res) => {
              this.$notify({
                  type: 'success',
                  title: 'Sucesso',
                  text: 'Sua solicitação foi atendida!'
              });
              this.documentacao.nome = null
              this.documentacao.documentos = []
              console.log(res.data)
              this.$refs.Spinner.hide();
              this.$router.push( '/documentationList' );
            })
            .catch((error) => {
              this.$refs.Spinner.hide();
              console.log(error);
              this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro na sua solicitação!'
              });
            });

        }else{
          
          console.log('Atualizando documentação ' + this.documentacao.nome); 

          api
            .put(`/tipoDocumentacao/${this.$route.params.id}`, this.documentacao )
            .then((res) => {
              this.$notify({
                  type: 'success',
                  title: 'Sucesso',
                  text: 'Sua solicitação foi atendida!'
              });
              this.documentacao.nome = null
              this.documentacao.documentos = []
              console.log(res.data)
              this.$refs.Spinner.hide();
              this.$router.push( '/documentationList' );
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

          console.log('Editar documentação ' + id); 

          api
            .get(`/tipoDocumentacao/${id}`)
            .then((res) => {
              console.log( res.data )
              this.documentacao = res.data;
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
      },

      formataData(valor){
        if(valor.toString().length == 2){
          return valor;
        }else{
          return "0"+valor;
        }
      },

      excluirDoc(idDoc){
        
        console.log('Excluir doc ' + idDoc); 

        if(idDoc != null){
          this.documentacao.documentos = this.documentacao.documentos.filter((item) => item.id !== idDoc);

          this.resetInfoModal()
        }
      },

      editarDoc(idDoc){

        console.log('Editar doc ' + idDoc); 

        if(idDoc != null){

          this.documentacao.documentos.forEach(element => {
            if( element.id == idDoc){
                element.nome = this.documento_incluido
                element.obrigatorio = this.obrigatorio_incluido
               // console.log('TESTE EDITAR ' + idDoc)
            }
          });
          this.resetInfoModalIncluirDoc();
        }
      },

      incluirDoc(){

        if(this.documento_incluido != null){

          const current = new Date();
          let _id = this.documentacao.documentos.length + 1
          let _data = this.formataData( current.getDate())+'/'+this.formataData( current.getMonth()+1)+'/'+current.getFullYear();

         // console.log('Documento incluido id ' + _id);
         // console.log('Documento incluido data ' + _data);
          
          this.documentacao.documentos.push( 
            { 
              id: _id, 
              nome: this.documento_incluido , 
              obrigatorio: this.obrigatorio_incluido, 
              dataCadastro: _data 
            } 
          )
          this.resetInfoModalIncluirDoc();
        }
      },

      editarModal(item, button) {
        this.showModalIncluiDoc=true
        this.idModelIncluiDoc.title = `Editar`
        //this.infoModal.content = JSON.stringify(item, null, 2)
        this.idModelIncluiDoc.content = `Deseja editar o documento ${item.nome}?`
        this.idModelIncluiDoc.idDoc = item.id

        this.documento_incluido= item.nome
        this.obrigatorio_incluido=item.obrigatorio

        this.$root.$emit('bv::show::modal', this.idModelIncluiDoc.id, button)
      },

      deletaModal(item, button) {
        this.showModal=true
        this.infoModal.title = `Deletar`
        //this.infoModal.content = JSON.stringify(item, null, 2)
        this.infoModal.content = `Deseja deletar o documento ${item.nome}?`
        this.infoModal.idDoc = item.id
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModalIncluirDoc() {
        this.idModelIncluiDoc.title = ''
        this.idModelIncluiDoc.content = ''
        this.idModelIncluiDoc.idDoc = undefined
        this.showModalIncluiDoc=false
        this.documento_incluido=null
        this.obrigatorio_incluido=false
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.infoModal.idDoc = undefined
        this.showModal=false
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
