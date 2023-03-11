<template>
   
  <div class="accordion" role="tablist">
    <notifications position="bottom center"  />
    <vue-instant-loading-spinner ref="Spinner" color="#660099">
    </vue-instant-loading-spinner>
    
    <p>
      <button v-if="perfil == 'ADMIN' || perfil == 'MASTER' || perfil == 'SHARING'" class="mt-2 btn btn-vivo" @click="showModalInclirDoc()">
        Incluir Documento
      </button>
    </p>

    <b-card v-for="(doc, index) in documentos" :key="index" no-body class="mb-1">

    <!-- {{ doc }} --> 

      <div v-if="doc.statusArquito == 'PENDENTE'">
			
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="'accordion_' + doc.id" style="background:#e70909" :ref="'accordion_botton'" >
            Documento {{doc.nome}} faltando
          </b-button>
        
          <b-button class="border-0 btn-transition btn btn-outline-vivo pull-right" size="sm" @click="showInfo(doc)">
            <i class="pe-7s-info" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>
          &nbsp;

          <b-button v-if="(doc.notificacaoRecebidaMaster && (isMaster ||  perfil=='SHARING' ) ) || (doc.notificacaoRecebidaUsuario && !isMaster)" class="border-0 btn-transition btn btn-vivo pull-right" size="sm" @click="showNotificacao(doc.id, doc.notificacoes)">
            <i class="pe-7s-chat" title="Você tem uma nova mensagem" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>

          <b-button v-else class="border-0 btn-transition btn btn-outline-vivo pull-right" size="sm" @click="showNotificacao(doc.id, doc.notificacoes)">
            <i class="pe-7s-chat" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>
          &nbsp;&nbsp;

        </b-card-header>

        <b-collapse :id="'accordion_'+ doc.id" :accordion="'my-accordion_'+ doc.id" v-model="visible[index]" :ref="'accordion_upload'" role="tabpanel">
          <b-card-body>
          <b-card-text><small>{{texto}} {{doc.nome}} </small></b-card-text>
          
            <VueFileAgent
            :ref="'vueFileAgent'"
            :multiple="true"
            :deletable="true"
            :readonly="fileRecordsForUpload[index].length > 0"
            :meta="true"
            :accept="'.jpeg,.jpg,.pdf'"
            :maxSize="'7MB'"
            :maxFiles="14"
            :helpText="'Escolha imagens ou pdf'"
            :errorText="{
              type: 'Tipo de arquivo inválido. Somente imagens ou pdf',
              size: 'Os arquivos não devem exceder 7MB de tamanho',
            }"
            @select="filesSelected($event, index)"
            @beforedelete="onBeforeDelete($event, index)"
            @delete="fileDeleted($event, doc.id, index)"
            v-model="fileRecords[doc.id]"
            ></VueFileAgent> 

            <p align="right">
              <button :ref="'button_upload'" class="mt-2 btn btn-vivo" :hidden="!fileRecordsForUpload[index].length" @click="uploadFiles(doc.id, index)">
                Upload arquivo
              </button>
            </p>
          </b-card-body>
        </b-collapse>
      
      </div>
      <div v-else>
        
        <b-card-header v-if="doc.statusArquito =='APROVADO'" header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="'accordion_' + doc.id" style="background:#69aa8a" :ref="'accordion_botton'">
            Documento {{doc.nome}} validado
          </b-button>
        
          <b-button class="border-0 btn-transition btn btn-outline-vivo pull-right" size="sm" @click="showInfo(doc)">
            <i class="pe-7s-info" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>
          &nbsp;

          <b-button v-if="(doc.notificacaoRecebidaMaster && (isMaster || perfil=='SHARING')) || (doc.notificacaoRecebidaUsuario && !isMaster)" class="border-0 btn-transition btn btn-vivo pull-right" size="sm" @click="showNotificacao(doc.id, doc.notificacoes)">
            <i class="pe-7s-chat" title="Você tem uma nova mensagem" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>

          <b-button v-else class="border-0 btn-transition btn btn-outline-vivo pull-right" size="sm" @click="showNotificacao(doc.id, doc.notificacoes)">
            <i class="pe-7s-chat" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>
          &nbsp;&nbsp;

        </b-card-header>

        <b-card-header v-else header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="'accordion_' + doc.id" style="background:#FFD700;" :ref="'accordion_botton'">
            Documento {{doc.nome}} em análise
          </b-button>
        
          <b-button class="border-0 btn-transition btn btn-outline-vivo pull-right" size="sm" @click="showInfo(doc)">
            <i class="pe-7s-info" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>
          &nbsp;

          <b-button v-if="(doc.notificacaoRecebidaMaster && isMaster) || (doc.notificacaoRecebidaUsuario && !isMaster)" class="border-0 btn-transition btn btn-vivo pull-right" size="sm" @click="showNotificacao(doc.id, doc.notificacoes)">
            <i class="pe-7s-chat" title="Você tem uma nova mensagem" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>

          <b-button v-else class="border-0 btn-transition btn btn-outline-vivo pull-right" size="sm" @click="showNotificacao(doc.id, doc.notificacoes)">
            <i class="pe-7s-chat" style="font-size:17px;font-weight: bold;"> </i>
          </b-button>
          &nbsp;&nbsp;


        </b-card-header>

        <b-collapse :id="'accordion_'+ doc.id" :accordion="'my-accordion_'+ doc.id" :ref="'accordion_upload'" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <small><a href="javascript:void(0);" @click="download(doc.idArquivoOriginal)" class="text-vivo">Download {{doc.nome}}</a></small>

              </b-card-text>
              <center>
              <div v-viewer="options" class="images clearfix">

              <!--<img :src="url_foto" /> -->

              <!-- {{ images[index] }} -->

              <img
                v-for="{thumbnail} in images[index]"
                :key="thumbnail"
                :src="thumbnail"
                :data-source="thumbnail"
                class="image"
              >

              <!--
              <img
                v-for="{source, thumbnail} in images"
                :key="source"
                :src="thumbnail"
                :data-source="source"
                class="image"
                :alt="source.split('?image=').pop()"
              >
              -->
            </div>
    
            <div :ref="'vueFileAgent'"></div>
            <div :ref="'button_upload'"></div> 
            
            </center>
            <br>
            <p align="right">
              <button v-if="( doc.statusArquito !='APROVADO' && isMaster) || ( doc.statusArquito !='APROVADO' && perfil=='SHARING' && doc.incluirSharing)" class="mt-2 btn btn-vivo" @click="aprovar(doc.id)">
                Aprovar documento
              </button>&nbsp;&nbsp; 
              <button v-if="isMaster || ( perfil=='SHARING' && doc.incluirSharing)" class="mt-2 btn btn-vivo" @click="deleteFiles(doc.id, index, true)">
                Rejeitar documento
              </button>
            </p>

          </b-card-body>
        </b-collapse>

      </div>
    </b-card>
    <b-modal :id="notificacaoModal.id" v-model="showNotificacaoModal" :title="notificacaoModal.title" ok-only @hide="resetNotificacaoModal">
      <template v-slot:modal-footer="{ hide }">
        <b-button size="sm" variant="outline-vivo" @click="hide()">
          Fechar
        </b-button>
      </template>
      <div>
      <b-form-textarea
        ref="msgNotificacaoText"
        id="msgNotificacaoText"
        rows="8"
        max-rows="8"
        no-auto-shrink
        :value="msgNotificacao"
        readonly
        :autofocus="true"
      >
      </b-form-textarea>
      <b-row class="mt-2" >
        <b-col sm="10">
          <b-form-textarea
            id="textarea-state"
            v-model="msgNotificacaoEnviada"
            placeholder="Envie sua mensagem"
            rows="0"
          ></b-form-textarea>
        </b-col>
        <b-col sm="2">
          <b-button size="sm" variant="outline-vivo" @click="enviarMsg( notificacaoModal.idNotificacao )">
          Enviar
        </b-button>
        </b-col>
      </b-row>
    </div>
      
    </b-modal>
  
    <b-modal :id="infoModal.id" size="lg" v-model="showInfoModal" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <template v-slot:modal-footer="{ hide }">
        <b-button size="sm" variant="outline-vivo" @click="hide()">
          Fechar
        </b-button>
      </template>
      <pre>Nome documento: {{ infoModal.content.nome }}</pre>
      <pre>Status do documento: {{ infoModal.content.statusArquito }}</pre>
      <pre>Histórico do documento</pre>
      <ul id="historico">
      <li v-for="(historico, index) in infoModal.content.historico" :key="index">
        <pre> {{ historico }} </pre> 
      </li> 
    </ul>

    <!--<pre>{{ infoModal.content }}</pre> -->
    </b-modal>
   

    
    <b-modal :id="idModelIncluiDoc.id" v-model="showModalIncluiDoc" :title="idModelIncluiDoc.title" ok-only @hide="resetInfoModal">
      <template v-slot:modal-footer="{ hide }">
        <b-button size="sm" variant="outline-vivo" @click="hide()">
          Fechar
        </b-button>
        <b-button  size="sm" variant="outline-vivo" @click="salvaDoc()">
          Salva
        </b-button>
        
      </template>

      <div class="form-row">
        <div class="col-md-6">
          <label for="nome" class="">Nome do Documento</label>
          <input name="nome" size="sm" id="nome" v-model="documento_incluido" required placeholder="Comprovante X" type="text" class="form-control">
        </div>
        <div class="col-md-6">
          <br>
          <a href="javascript:void(0);" @click="incluirDoc()" class="btn-lg btn btn-link">
            &nbsp;Adicionar documento
          </a>
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
            :items="documentosInseridos"
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

              <b-button class="border-0 btn-transition btn btn-outline-vivo" size="sm" @click="excluirDoc(row.item, $event.target)">
                <font-awesome-icon icon="trash-alt"/>
              </b-button>
              
            </template>

          </b-table>

        </div>
      </div>

    </b-modal>
 
  </div>
</template>

<script>
  import { directive } from '../../../../src/viewDocUtil'
    
  import api from "../../../api";

  import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'

  import 'viewerjs/dist/viewer.css'


  const hoje = new Date()

  export default {
    directives: {
      viewer: directive({
        debug: true,
      }),
    },
    components: {
      VueInstantLoadingSpinner,
    },
    data() {
      return {
        //url_foto: null,
        visible:[],
        idDocUpload: null,  
        indexVueFileAgent: 0,
        fileRecords: [],
       
        fileRecordsForUpload: [], // maintain an upload queue
        texto: "Por favor, realizar o upload do documento ",

        documentos: [],
        options: {
          toolbar: true,
          url: 'data-source',
        },
        nomeUsuario: '',
        isMaster: false,
  
        token: null,
        images:[],
        //urlDownloadImagem: 'http://127.0.0.1:8090/gd/api/v1',
        urlDownloadImagem: 'http://20.127.118.141:8090/gd/api/v1',
        //images: [...sourceImages].splice(0, 1),

        msgNotificacaoEnviada: '',
        msgNotificacao: '',
        showNotificacaoModal: false,
        notificacaoModal: {
          id: 'notificacao-modal',
          idNotificacao: undefined,
          title: '',
          content: ''
        },

        showInfoModal: false,
        infoModal: {
          id: 'info-modal',
          idInfo: undefined,
          title: '',
          content: ''
        },

        perfil: null,

        documentosInseridos: [],

        filter: null,
        filterOn: [],

        documento_incluido: null,
        
        fields: [ 
          { key: 'nome', label: 'Documento', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: 'Ação' , class: 'text-center' }
        ],

        showModalIncluiDoc: false,
        idModelIncluiDoc:{
          id: 'info-inclui-doc-modal',
          idDoc: undefined,
          title: 'Inserir',
          content: 'Por favor, preencha os campos'
        },

      }
    },
    methods: {
      download(idImagemPrincipal) {
          window.location.href =`${this.urlDownloadImagem}/documento/download/${idImagemPrincipal}`
      },
      recuperaToken(){
        let usuario =  JSON.parse( localStorage.getItem('usuario') );
        
        //console.log('TOKEN ' + JSON.stringify( usuario))

        this.perfil = usuario.perfil
        this.isMaster = usuario.master
        this.nomeUsuario = usuario.username;
        this.token = usuario && usuario.jwttoken ? `Bearer ${usuario.jwttoken}` : '';
      },

      listaProjetos(id) {
        
        this.$refs.Spinner.show();

        api
          .get(`/projeto/${id}`)
          .then((res) => {
            this.documentos = res.data.tipoDocumentacao.documentos;
            this.documentos.forEach( d => {
                
              this.fileRecordsForUpload.push([])
              this.fileRecords.push([])

              if( d.idArquivos != null ){
                
                this.visible.push(false)

                let sourceImages = []

                d.idArquivos.forEach( idImag => {
                  //console.log(idImag)
                  sourceImages.push({
                    thumbnail: `${this.urlDownloadImagem}/documento/download/${idImag}`,
                  })
                  
                });
                this.images.push( [...sourceImages].splice(0, d.idArquivos.length ) )
              }else{
                this.visible.push(true)
                this.images.push([])
              }
            })
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
      },
      // visualização de documento
      toggleToolbar(toolbar) {
        // this.options = Object.assign({}, this.options, {toolbar})
        this.options.toolbar = toolbar
      },
      add() {
        //this.images.push(this.sourceImages[this.images.length])
      },
      remove() {
        this.images.pop()
      },
      show() {
        const viewer = this.$el.querySelector('.images').$viewer

        viewer.show()
      },
      //upload
      uploadFiles(idDoc, index){

        this.$notify({
              type: 'success',
              title: 'Upload',
              text: 'Seu arquivo esta sendo processado, assim que finalizar será informado!'});
        
        console.log("id do documento " + idDoc+" index  " + index)   
        
        let uploadUrl = `${this.urlDownloadImagem}/documento/upload?idDocumento=${idDoc}&idProjeto=${this.$route.params.id}`
 
        let uploadHeaders = {
            'Authorization': `${this.token}`
        }

        this.$refs.vueFileAgent[ index ].upload(uploadUrl, uploadHeaders, this.fileRecordsForUpload[index] );

        // formatando após upload
        this.$refs.button_upload[ index ].hidden = true;
        this.$refs.accordion_botton[ index ].style.backgroundColor = "#FFD700";
        this.texto = "";
       // this.visible[ index ] = false;

      },
      
     // deleteUploadedFile(fileRecord, index) {
        
        //this.$refs.vueFileAgent[ index ].deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
        
      //},
      fileDeleted(fileRecord, idDoc, index) {

        var i = this.fileRecordsForUpload[index].indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload[index].splice(i, 1);
        }
        this.deleteFiles(idDoc, index, false);

        if( this.fileRecordsForUpload[index].length < 1 ){
            this.$refs.accordion_botton[ index ].style.backgroundColor = "#e70909";
            this.texto = "Por favor, realizar o upload do documento "
        }
   
      },
      aprovar(idDoc){

        console.log('Documento que será aprovado ' + idDoc);

        if(idDoc != undefined){

          this.$refs.Spinner.show();

          api
            .put(`/documento/${this.$route.params.id}/${idDoc}`)
            .then((res) => {
              //console.log( res.data )
              
              window.location.reload();
              
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
      deleteFiles(idDoc, index, carregar){

        console.log('Documento que será deletado ' + idDoc + " index " + index);

        if(idDoc != undefined){

          this.$refs.Spinner.show();

          api
            .delete(`/documento/${this.$route.params.id}/${idDoc}`)
            .then((res) => {
              //console.log( res.data )
              if(carregar){
                window.location.reload();
              }
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
      
      filesSelected(fileRecordsNewlySelected, index) {
        
        var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload[ index ] = this.fileRecordsForUpload[ index ].concat(validFileRecords); 

        this.$refs.button_upload[ index ].disabled = false;

      },

      onBeforeDelete(fileRecord, index) {
        
        if (confirm('Tem certeza de que deseja excluir?')) {

          var i = this.fileRecordsForUpload[ index ].indexOf(fileRecord);

          if (i !== -1) {
            this.fileRecordsForUpload[ index ].splice(i, 1);
          }
          this.$refs.vueFileAgent[ index ].deleteFileRecord(fileRecord); 

        }

        /*
        var i = this.fileRecordsForUpload[ index ].indexOf(fileRecord);
        
        if (i !== -1) {
          this.fileRecordsForUpload[ index ].splice(i, 1);
          this.readonly[ index ] = false;
        } else {

          if (confirm('Tem certeza de que deseja excluir?')) {
            this.$refs.vueFileAgent[ index ].deleteFileRecord(fileRecord); 
            this.readonly[ index ] = false;
          }
        }
        */


      },

      formataMsgAtual(msg){

        const dia = hoje.getDate().toString().padStart(2,'0')
        const mes = String(hoje.getMonth() + 1).padStart(2,'0')
        const ano = hoje.getFullYear()
        const hora = hoje.getHours().toString().padStart(2,'0')
        const minuto = hoje.getHours().toString().padStart(2,'0')
        const segundo = hoje.getHours().toString().padStart(2,'0')

        const dataAtual = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`
        
        if(this.msgNotificacao != null && this.msgNotificacao != ''){
          this.msgNotificacao = this.msgNotificacao + msg.autor  +'   '+ dataAtual +'\n'+ msg.mensagem + '\n\n';
        }else{
          this.msgNotificacao = msg.autor +'   '+ dataAtual +'\n'+ msg.mensagem + '\n\n';
        }

        this.msgNotificacaoEnviada = ''

        this.$refs['msgNotificacaoText'].focus()
        
      },
      enviarMsg(idDoc){

        if(this.msgNotificacaoEnviada != null && this.msgNotificacaoEnviada != ''){

          let msg = {
            'autor': `${this.nomeUsuario}`,
            'mensagem': `${this.msgNotificacaoEnviada}`
          }

          api
            .put(`/documento/notificacao/${this.$route.params.id}/${idDoc}`, JSON.stringify( msg ))
            .then((res) => {
              console.log( res.data )         
              this.formataMsgAtual(msg);
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
      formataMsg(listMsg){

        let msg = ''   

        if(listMsg != null && listMsg.length > 0 ){
          listMsg.forEach( element => {
            msg += element.autor  +'   '+ element.data +'\n'+ element.mensagem + '\n\n';
          })
        }

        return msg;

      },
      showInfo(item) {
        this.showModalInfo=true
        this.infoModal.title = `Informação do Documento`
        this.infoModal.content = item
        this.infoModal.idInfo = item.id
        this.$root.$emit('bv::show::modal', this.infoModal.id)
      },
      showNotificacao(idDoc, notificacoes ) {
        this.showModalNotificacao=true
        this.notificacaoModal.title = `Notificação do Documento`
        this.msgNotificacao = this.formataMsg(notificacoes)
        //this.notificacaoModal.content = `Esse documento ...`
        this.notificacaoModal.idNotificacao= idDoc
        this.$root.$emit('bv::show::modal', this.notificacaoModal.id)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.infoModal.idInfo = undefined
        this.showModalInfo=false
      },
      resetNotificacaoModal() {
        this.notificacaoModal.title = ''
        this.notificacaoModal.content = ''
        this.notificacaoModal.idNotificacao = undefined
        this.showModalNotificacao=false
      },


      incluirDoc(){

        if(this.documento_incluido != null){

          let _id = this.documentosInseridos.length + 1
          this.documentosInseridos.push( 
            { 
              id: _id, 
              nome: this.documento_incluido, 
            } 
          )
          this.documento_incluido = null
        }
      },

      excluirDoc(item) {
        
        let indice =  this.documentosInseridos.indexOf(item);
        this.documentosInseridos.splice( indice , 1);
      },

      salvaDoc(){

        if( this.documentosInseridos.length > 0 ){

          this.$refs.Spinner.show();

          api
            .put(`/documento/incluirDoc/${this.$route.params.id}`, JSON.stringify( this.documentosInseridos ))
            .then((res) => {
              this.documentosInseridos = []
              window.location.reload();
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

        }else{

          this.$notify({
              type: 'error',
              title: 'Erro',
              text: 'Favor incluir documento!'
            });

        }

        this.showModalIncluiDoc = false;
        this.documento_incluido = null;

      },

      showModalInclirDoc(){
        this.showModalIncluiDoc = true
        this.documento_incluido = null,
        this.obrigatorio_incluido = false,
        this.idModelIncluiDoc.title = 'Inserir Documento'
      },

      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }

    },
    mounted() {
      this.listaProjetos(this.$route.params.id)
      this.recuperaToken()
    }
   
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .image {
    width: calc(20% - 10px);
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }
</style>