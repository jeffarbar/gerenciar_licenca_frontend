<template>
  <div>
    <notifications position="bottom center"  />
    <vue-instant-loading-spinner ref="Spinner" color="#660099">
    </vue-instant-loading-spinner>
    <page-title :heading=heading :subheading=subheading :icon=icon :link=link></page-title>

    <div class="content">
  
      <div class="main-card mb-3 card">
        <div class="card-body">
          <form @submit.prevent="grafico" class="">
            <div class="form-row">
          
              <div class="col-md-6">

                <v-select 
                  name="cliente" 
                  id="cliente" 
                  v-model="cliente"   
                  placeholder="Cliente" 
                  :options="clientes" 
              
                  label="razaoSocial"
                >
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!cliente"
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

              <div class="col-md-6">

                <date-picker 
   
                  v-model="report.dataPesquisa" 
                  range 
                  :placeholder="placeholderDate" 
                  type="date"
                  value-type="DD/MM/YYYY" format="DD/MM/YYYY"
                ></date-picker>
              </div>
              <div class="col-md-12">
                
                <b-button class="mt-2 btn btn-vivo" size="sm"  @click="grafico()">
                  Pesquisar
                </b-button>&nbsp;&nbsp; 
                 
                <b-button class="mt-2 btn btn-vivo" size="sm" @click="exportar()">
                  Exportar
                </b-button>
                
              </div>
              </div>
           
          </form>
        </div>
      </div>
     
    <div class="mt-2">
      <b-card-group deck  >

        <b-card
        
          header="Documentos Pendentes"
          header-tag="header"
          header-bg-variant="danger"
          :title="quantidadeDocumentoPendente"
          tag="article"
          bg-variant="danger" 
          text-variant="white" 
          class="text-center"
          title-tag="h1"
       
        
        >

        </b-card>
      
        <b-card
          header="Documentos em Análise"
          header-tag="header"
          header-bg-variant="warning"
          :title="quantidadeDocumentoAnalise"
          tag="article"
          bg-variant="warning" 
          text-variant="white" 
          class="text-center"
          title-tag="h1"
         
        >
        </b-card>
     
        <b-card
          header="Documentos Finalizados"
          header-tag="header"
          header-bg-variant="primary"
          :title="quantidadeDocumentoFinalizado"
          tag="article"
          bg-variant="primary"  
          text-variant="white" 
          class="text-center"
          title-tag="h1"
         
        >
        </b-card>
        <b-card 
          bg-variant="dark" 
          header="Total Documentos" 
          cheader-tag="header"
          header-bg-variant="dark"
          tag="article"
          text-variant="white" 
          class="text-center"
          :title="quantidadeDocumentoTotal"  
          title-tag="h1"
         
        >
        </b-card>
       
      </b-card-group>

    </div>
    <div class="mt-2">
      <b-card-group deck>

        <b-card 
          header="Documentos por Mês" 
          class="mb-1"
          style="max-width: 100%;"
        >
        <GChart :type="typeLine" :data="dataLine" :options="optionsLine" />
        </b-card>
      </b-card-group>
    </div>
   
    <div class="mt-2">
      <b-card-group deck>
        <b-card
          header="Quantidade de projeto por localidade"
          tag="article"
          class="mb-1"
         
        >
       

        <GChart 
          :type="typeMap" 
          :data="dataMap" 
          :options="optionsMap" 
          :settings="settingsMap" 
        />


        </b-card>

        <b-card
          header="Projeto por Cliente"
          tag="article"
         
          class="mb-1"
        >

        <GChart :type="typeBarH" :data="dataBarH" :options="optionsBarH" />

        </b-card>
      </b-card-group>
    </div>
    </div>
  </div>

</template>

<script>

  import { GChart } from 'vue-google-charts/legacy';

  import PageTitle from "../../../Layout/Components/PageTitle2.vue";

  import api from "../../../api";

  import VueInstantLoadingSpinner from 'vue-instant-loading-spinner';


  import "vue-select/dist/vue-select.css";


  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  

  const hoje = new Date()

  export default {
    name:'ReportDashboard',
    components: {
      DatePicker,
      GChart,
      VueInstantLoadingSpinner,
      PageTitle

    },
    data() {
      return {
        heading: 'Relatório',
        subheading: 'Informações dos projetos.',
        icon: 'pe-7s-drawer icon-gradient bg-happy-itmeo',
        link: '',

        placeholderDate:  null,

        clientes: [],

        cliente: null,

        report:{
          idCliente:null,
          dataPesquisa:null,
        },

        quantidadeDocumentoPendente: '0',
        quantidadeDocumentoAnalise: '0',
        quantidadeDocumentoFinalizado: '0',
        quantidadeDocumentoTotal: '0',


        typeLine: 'LineChart',
        dataLine:  [
          ['Mês', 'Pendente', 'Em Análise','Finalizado'],
          ['', 0,0,0]
        ],
        optionsLine: {
          width: '100%',
          height: 320,
          axes: {
            x: {
              0: {side: 'top'}
            }
          },
        },


        typeBarH: 'BarChart',
        dataBarH: [ 
          ['Cliente', 'Qtd'], ['',0] 
        ],
        optionsBarH:{
            chartArea: { width: '40%' },
            hAxis: {
              title: 'Total Projeto',
              minValue: 0,
            },
            vAxis: {
              title: 'Cliente',
            },
            width: '40%',
            height: '100%',
        },


        typeMap: 'GeoChart',
        dataMap: [
          ['Estado', 'Quantidade Projetos']
        ],
        optionsMap: {
          width: '60%',
          height: '100%',
          region: 'BR',
          resolution: 'provinces',
          forceIFrame: false,
          colorAxis:{colors: ['#660099']},
          magnifyingGlass:{enable: true, zoomFactor: 3.5},
          
        },
        settingsMap: {
          packages: ['geochart'],
        },

      }
    },
    computed: {
      
    },
    mounted (){
      //this.projetoPorMes();
     // this.projetoPorCliente();
     //this.limpaGrafico();
     this.demonstracaoData();
     this.listaClientes();
      //this.relatorioGrafico();
    },
    methods: {

      demonstracaoData(){

        const dia = hoje.getDate().toString().padStart(2,'0')
        const mes = String(hoje.getMonth() + 1).padStart(2,'0')
        const ano = hoje.getFullYear()

        const dataFormatada = dia + "/" + mes + "/" + ano;
        this.placeholderDate = dataFormatada + " ~ "+dataFormatada;

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

      limpaGrafico(){

        this.quantidadeDocumentoPendente = "0";
        this.quantidadeDocumentoAnalise = "0";
        this.quantidadeDocumentoFinalizado = "0";

        this.quantidadeDocumentoTotal= "0";

        this.dataLine =  [['Mês', 'Pendente', 'Em Análise','Finalizado']],

        this.dataMap = [['Estado', 'Quantidade Projetos'] ],

        this.dataBarH = [['Cliente', 'Qtd'] ]

      },

      dataValida(){

        if( this.cliente == null || this.report.dataPesquisa == null){

          this.$notify({
                  type: 'error',
                  title: 'Erro',
                  text: 'Preencha os campos de cliente e data'
              });
            this.$refs.Spinner.hide();
            return;
          }


        this.report.idCliente = this.cliente.id;

        let dtInicial = this.report.dataPesquisa[0];
        let dtFinal = this.report.dataPesquisa[1];


        const dataSplitInicial = dtInicial.split('/');
        const dataSplitdtFinal= dtFinal.split('/');

        const diffInMs = new Date(dataSplitdtFinal[2], dataSplitdtFinal[1], dataSplitdtFinal[0]) - 
                  new Date(dataSplitInicial[2],dataSplitInicial[1],dataSplitInicial[0]);

        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        console.log(diffInDays)

        if (diffInDays > 90){

          this.$notify({
                type: 'error',
                title: 'Erro',
                text: 'As datas inicial e final, não podem ter uma diferência de 3 meses'
            });
          this.$refs.Spinner.hide();
          return ;
        }

      },
      
      exportar(){

        this.$refs.Spinner.show();

        this.dataValida()

        if(this.report != null && this.report.idCliente != null && this.report.dataPesquisa != null){

          api
          .post(`/report/export/`, this.report, { responseType: 'blob' } )
            //.get(`/report/export/${this.report.idCliente}/${dtInicio}/${dtFinal}`)
            .then((response) => {
              
              const link = document.createElement('a');
      
              // Tell the browser to associate the response data to
              // the URL of the link we created above.
              link.href = window.URL.createObjectURL(
                  new Blob([response.data])
              );
      
              // Tell the browser to download, not render, the file.
              link.setAttribute('download', 'projetos.xlsx');
      
              // Place the link in the DOM.
              document.body.appendChild(link);
      
              // Make the magic happen!
              link.click();

              this.$refs.Spinner.hide();
            })
            .catch((error) => {
              console.log(error)           
              this.$notify({
                  type: 'error',
                  title: 'Erro',
                  text: 'Ocorreu um erro na sua solicitação!'
              });
              this.$refs.Spinner.hide();
            });
        }else{
          this.$refs.Spinner.hide();
        }

      },
      grafico(){

        this.$refs.Spinner.show();
        
        this.dataValida()

        this.limpaGrafico();

        if(this.report != null && this.report.idCliente != null && this.report.dataPesquisa != null){
        
          api
            .post("/report/", this.report)
            .then((res) => {
        
              this.quantidadeDocumentoPendente = res.data.quantidadeDocPendente.toString();
              this.quantidadeDocumentoAnalise = res.data.quantidadeDocAnalise.toString();
              this.quantidadeDocumentoFinalizado = res.data.quantidadeDocFinalizado.toString();

              this.quantidadeDocumentoTotal = (res.data.quantidadeDocPendente + res.data.quantidadeDocAnalise + res.data.quantidadeDocFinalizado).toString();
              
              if( res.data.projetoCliente != null && res.data.projetoCliente.length > 0 ){
  
                res.data.projetoCliente.forEach( item => {
                  this.dataBarH.push( [ item.cliente , item.quantidade ] );
                });

              }else{
                this.dataBarH.push( [ 'Não há' , 0 ] );
              }

              if( res.data.projetoLocalidade != null && res.data.projetoLocalidade.length > 0 ){
  
                res.data.projetoLocalidade.forEach( item => {
                  this.dataMap.push( [ item.localidade , item.quantidade ] );
                });

              }else{
                this.dataMap.push( [ 'Não há' , 0 ] );
              }

              if( res.data.docMes != null && res.data.docMes.length > 0 ){
                
                res.data.docMes.forEach( item => {
                  console.log( "dados" + item.mes , item.pendente ,item.analise, item.finalizado )
                  this.dataLine.push( [ item.mes , item.pendente ,item.analise, item.finalizado ] );
                });

              }else{
                this.dataLine.push( [ 'Não há' , 0 , 0, 0] );
              }
              
              this.$refs.Spinner.hide();
            })
            .catch((error) => {
              console.log(error)           
              this.$notify({
                  type: 'error',
                  title: 'Erro',
                  text: 'Ocorreu um erro na sua solicitação!'
              });
              this.$refs.Spinner.hide();
            });

        }else{
          this.$refs.Spinner.hide();
        }

      },

    },
  
  }
  
</script>

<style>
  .mx-table-date .today {
    color: #660099;
    font-weight: bold;
  }

  .mx-calendar-content .cell.active {
    color: #fff;
    background-color: #660099;
  }

  .mx-calendar-content .cell.in-range, .mx-calendar-content .cell.hover-in-range {
    color: #73879c;
    background-color: #DDA0DD;
  }

</style>

<style scoped>
>>> {
  --vs-dropdown-option--active-bg: #660099;
  --vs-actions-padding: 4px 6px 0 3px;
  --vs-controls-size: 0.85;
}


</style>

