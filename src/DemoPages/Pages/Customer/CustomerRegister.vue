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
              <div class="col-md-4">
                <div class="position-relative form-group"><label for="razaoSocial" class="">Razão Social</label>
                  <input name="razaoSocial" id="razaoSocial" v-model="cliente.razaoSocial" required placeholder="Razão Social" type="text" class="form-control">
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="cnpj" class="">Cnpj</label>
                  <input name="cnpj" id="cnpj" v-model="cliente.cnpj" required placeholder="02.558.157/0001-62" v-mask="'##.###.###/####-##'" type="text" class="form-control">
                </div>
              </div>
              <div class="col-md-2">
                <div class="position-relative form-group"><label for="segmento" class="">Segmento</label>
                  <input name="segmento" id="segmento" v-model="cliente.segmento" required placeholder="Segmento" type="text" class="form-control">
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
                      v-model="cliente.estado"   
                      placeholder="Estado" 
                      :options="estados" 
                   >
                    <template #search="{attributes, events}">
                      <input
                        class="vs__search"
                        :required="!cliente.estado"
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
                  <!--
                  <select name="select" id="estado" v-model="cliente.estado" required class="form-control">
                      <option v-for="(item, index) in estados" 
                        :value="item" 
                        :key="index">
                          {{item}}
                      </option>
                  </select>  
                  -->
                </div>
              </div>
              <div class="col-md-6">
                <div class="position-relative form-group"><label for="cidade" class="">Cidade</label>
                  <input name="cidade" id="cidade" v-model="cliente.cidade" required placeholder="Cidade" type="text" class="form-control">
                </div>
              </div>
              <div class="col-md-2">
                <div class="position-relative form-group"><label for="cep" class="">CEP</label>
                  <input type="text"  v-mask="'#####-###'" name="cep" id="cep" v-model="cliente.cep" required placeholder="06455-911" class="form-control">
                </div>
              </div>
            </div>
            <div class="position-relative form-group"><label for="endereco" class="">Endereço</label>
              <input name="endereco" id="endereco"  v-model="cliente.endereco" required placeholder="Endereço" type="text" class="form-control">
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
      heading: 'Cliente',
      subheading: 'Cadastrado de cliente.',
      icon: 'pe-7s-graph text-success',
      estados: ["Acre",  "Alagoas",  "Amapá",  "Amazonas",  "Bahia",  "Ceará",  "Distrito Federal",  "Espírito Santo",  "Goiás",  "Maranhão",  "Mato Grosso",  "Mato Grosso do Sul",  "Minas Gerais",  "Pará",  "Paraíba",  "Paraná",  "Pernambuco",  "Piauí",  "Rio de Janeiro",  "Rio Grande do Norte",  "Rio Grande do Sul",  "Rondônia",  "Roraima",  "Santa Catarina",  "São Paulo",  "Sergipe",  "Tocantins"],

      cliente: { 
        cidade: null,
        endereco: null,
        cep: null,
        estado: null,
        segmento: null,
        cnpj: null,
        razaoSocial:null,
        sharing: false,
      }

    }),
    mounted() {
      this.carregar(this.$route.params.id)
    },
    methods: {

      save(){

        this.$refs.Spinner.show();

        if(this.$route.params.id == null){

          console.log('Salvando cliente ' + this.cliente.cnpj); 

          api
            .post("/cliente/", this.cliente )
            .then((res) => {
              this.$notify({
                  type: 'success',
                  title: 'Sucesso',
                  text: 'Sua solicitação foi atendida!'
              });
              this.cliente = null
              console.log(res.data)
              this.$refs.Spinner.hide();
              this.$router.push( '/customerList' );
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

        }else{
          
          console.log('Atualizando cliente ' + this.cliente.cnpj); 

          api
            .put(`/cliente/${this.$route.params.id}`, this.cliente )
            .then((res) => {
              this.$notify({
                type: 'success',
                title: 'Sucesso',
                text: 'Sua solicitação foi atendida!'
              });
              this.cliente = null
              console.log(res.data)
              this.$refs.Spinner.hide();
              this.$router.push( '/customerList' );
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

        }
      },
      carregar(id){
        if(id != undefined){
          
          this.$refs.Spinner.show();
          
          console.log('Editar cliente ' + id); 

          api
            .get(`/cliente/${id}`)
            .then((res) => {
              console.log( res.data )
              this.cliente = res.data;
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
