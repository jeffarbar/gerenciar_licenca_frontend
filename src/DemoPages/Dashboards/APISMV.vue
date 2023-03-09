<template>

    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

        <div id="content">
            <div class="phone">
                <div class="screen">

                    <div class="top">
                        <div class="dock-left">
                            <span class="icone-top">
                                <img src="@/assets/phone/signal.png" class="img-icone" >
                            </span>
                            <span class="icone-top">VIVO</span>
                            <span class="icone-top">
                                <img src="@/assets/phone/wifi.png" class="img-icone">
                            </span>
                        </div>
                        <div class="dock">
                            <div class="sensor"></div>
                            <div class="speaker"></div>
                            <div class="camera"></div>
                        </div>
                        <div class="dock-right">
                            <span class="icone-top">{{time}}</span>
                            <span class="icone-top">
                                <img src="@/assets/phone/battery-medium.png" class="img-icone-bateria" >
                            </span>
                        </div>
                    </div>
                    <div v-if="cadastrado" class="cadastra">
                        <p>Varejo</p>
                    </div>
                    <div v-else-if="verificado" class="verifica">
                        <div v-if="check == 'OK'">
                            <div class="verificado">
                                <img src="@/assets/phone/verificado.svg" class="img-icone-verificado">
                                <p>Verified</p>
                            </div>
                            <div class="voltar">
                                <button class="button button-verificado" @click="voltar">Voltar</button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="nao-verificado">
                                <img src="@/assets/phone/nao-verificado.png" class="img-icone-verificado">
                                <p>Not Verified</p>
                            </div>
                            <div class="voltar">
                                <button class="button button-nao-verificado" @click="voltar">Voltar</button>
                            </div>
                        </div>
                       
                    </div>
                    <div v-else>

                        <div class="dado_informacao">
                            <table width="90%" align="center" border="0" bgcolor="white">
                                <tr>
                                    <td class="tel">
                                        Telefone
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tel_numero">
                                        <div id="container_bandeira">
                                            <img src="@/assets/phone/brazil.png" class="img-icone-bandeira">
                                            +55&nbsp;
                                            {{numeros_digitado | VMask('## #####-####')}}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="tel_informacao">
                                        <br>
                                        <p>Um código de confirmação será enviado para este número</p>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="confirmacao">
                            <table width="90%" align="center">
                            <tr>
                                <td class="tel_confirmacao">
                                <a href="#" @click=ligar();>Confirmar telefone</a>
                                </td>
                            </tr>
                            </table>
                        </div>
                        <br>
                        <div class="teclado">
                            <table width="100%" align="center" border="0" bgcolor="#4F4F4F">
                                <tr>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(1);><div class="icon-app-numero">
                                            <span>1</span>
                                            </div></a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(2);><div class="icon-app-numero">
                                                <span>2</span>
                                                <div class="numeros-letra">ABC</div>
                                            </div></a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(3);><div class="icon-app-numero">
                                                <span>3</span>
                                                <div class="numeros-letra">DEF</div>
                                            </div></a>
                                        </div> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(4);><div class="icon-app-numero">
                                                <span>4</span>
                                                <div class="numeros-letra">GHI</div>
                                            </div></a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(5);><div class="icon-app-numero">
                                                <span>5</span>
                                                <div class="numeros-letra">JKL</div>
                                            </div></a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(6);><div class="icon-app-numero">
                                                <span>6</span>
                                                <div class="numeros-letra">MNO</div>
                                            </div></a>
                                        </div> 
                                    </td>   
                                </tr>
                                <tr>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(7);><div class="icon-app-numero">
                                                <span>7</span>
                                                <div class="numeros-letra">PQRS</div>
                                            </div></a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(8);><div class="icon-app-numero">
                                                <span>8</span>
                                                <div class="numeros-letra">TUV</div>
                                            </div></a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(9);><div class="icon-app-numero">
                                                <span>9</span>
                                                <div class="numeros-letra">WXYZ</div>
                                            </div></a>
                                        </div> 
                                    </td>   
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                        <div class="numeros">
                                            <a href="#" @click=geraNumeroDigitado(0);><div class="icon-app-numero">
                                                <span>0</span>
                                            </div></a>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="numeros_digitado" class="numeros">
                                            <a href="#" @click=apagar();>
                                            <img src="@/assets/phone/chevron-left-circle-outline.png" class="img-icone">
                                            </a>
                                        </div> 
                                    </td>   
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>    
       
    </div>
</template>

<script>

    const axios = require('axios').default;

    import {publicIp} from 'public-ip';

    import PageTitle from "../../Layout/Components/PageTitle.vue";

    export default {
        name:'APISMV',
        components: {
              PageTitle
        },
        data: () => ({
            heading: '',
            subheading: '',
            icon: 'pe-7s-piggy icon-gradient bg-tempting-azure',
            time: '',
            //numeros_digitado: '11 95600-2211',
            numeros_digitado: '',
            check: null,
            msg_check: null,
            verificado: false,
            cadastrado: true,
            ip_publico: null,
        }),
        mounted() {
            this.getHora()
            this.cadastro()
            this.getIP()
        },
        methods: {
        
            getIP(){
                console.log('Pegando o IP')

                const promise1 = Promise.resolve(publicIp());

                promise1.then((value) => {
                    console.log(value);
                    this.ip_publico = value
                });

            },

            getHora() {
                this.time = new Date().toLocaleTimeString().substring(0,5)  ;
            },
            geraNumeroDigitado(numero){
                let numeros_digitado_formatado = this.numeros_digitado.replaceAll(" ","").replace("-","")   
                if(numeros_digitado_formatado.length < 11){
                    this.numeros_digitado = this.numeros_digitado + numero
                }
            },
            apagar(){
    
                let telefone_formato = this.numeros_digitado
                if( telefone_formato ){
                    let ultimo_caracter = telefone_formato.charAt( telefone_formato.length - 1 )
                    if(ultimo_caracter == " " || ultimo_caracter == "-"){
                        this.numeros_digitado = telefone_formato.substring(0, telefone_formato.length - 2);
                    }else{
                        this.numeros_digitado = telefone_formato.substring(0, telefone_formato.length - 1);
                    }
                }
     
            },
            cadastro(){
                setTimeout(() => {
                    this.cadastrado=false;
                }, 2000);
            },
            ligar(){
             
                console.log('verificando')
                
                let url = "https://aks-smv-prod.brazilsouth.cloudapp.azure.com";

                let msisdn = "55" + this.numeros_digitado.replace('-', '').replace(' ', '')

                let dados = {
                    "data": {
                        "msisdn": `${msisdn}`,
                        "ip":   `${this.ip_publico}`
                    }
                }

                let token = "YXBpbTpZNCF2J1F9ITliVnt4dktI";

                let header =  {
                            'User-Agent': 'PostmanRuntime/7.26.10',
                            'Access-Control-Allow-Origin' : '*',
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${token}` 
                        }

                const instance = axios.create({
                    headers: `${header}`,
                    url: '/mobileidentity/validate',
                    baseURL: `${url}`,
                    method: 'POST',
                    timeout: 1000
                });

                let res = instance.request({
                    dados
                });

                console.log(res)

                /*

                axios.post(url, dados, {
                        headers: {
                            'Access-Control-Allow-Origin' : '*',
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${token}` 
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        if (response.status == 200){
                            this.check = 'OK';
                        }else{
                            this.check = 'NAO';
                        }
                        this.msg_check = response.data.message;
                        this.verificado = true
                    })
                    .catch(function (error) {
                        console.log("ERRO JEFFE " + error);
                        this.verificado = true
                    });
                */
            },
            voltar(){
                this.verificado = false
            },
            geraAsterisco(){
                this.numeros_digitado = this.numeros_digitado + "*"
            },
            geraHashtag(){
                this.numeros_digitado = this.numeros_digitado + "#"
            }
        }
    }

</script>

<style>

body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  font-family: sans-serif;
}

#content {
  position: relative;
  top: 0;
  margin-top: 0px;
  /*width: 100%;*/
  height: 73vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-inline: 35% ;
}

.phone {
  width: 232px;
  max-width: 232px;
  height: 440px;
  background: #000;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen {
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  background: white;
  border-radius: 30px;
  overflow: hidden!important;
  /*
  background-image: url("https://picsum.photos/200/300");
  background-repeat: no-repeat, repeat;
  */
  background-position: center;
  background-size: cover;
}

.top {
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
  background: rgba(128,128,128,0.8);
  overflow: hidden;
  border-bottom: 1px solid hsla(0, 0%, 43%, 0.2);
}

.dock-left, .dock-right {
  display: flex;
  align-items: center;
  text-align: center;
  flex: 1;
  color: white;
  font-size: 8px;
}

.img-icone{
    width: 13px;
    height: 13px;
}

.img-icone-bateria{
    width: 18px;
    height: 18px;
}

.img-icone-bandeira{
    width: 23px;
    height: 23px;
}

.img-icone-verificado{
    width: 150px;
    height: 150px;
}

.dock-left {
   display: flex;
   justify-content: space-around;
   padding: 4px 4px 0 8px;
  /*
  padding: 5px 10px 0 5px;
  font-size: 13px;
  color: #fff;
  text-shadow: -1px 0 #bbb, 0 1px #bbb, 1px 0 #bbb, 0 -1px #bbb;
  */
}

.icone-top {
    width: 100%;
}

.dock-right {
  display: flex;
  justify-content: space-around;
  padding: 4px 15px 0 1px;
}

.dock { 
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 30px;
  padding: -5px 5px 0 7px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

.dock .sensor, .dock .camera {
  width: 12px;
  height: 12px;
  background: #000;
  border-radius: 50%;
  margin: 0 3px 14px 3px;
}

.dock .speaker {
  width: 60px;
  height: 8px;
  background: #000;
  border-radius: 7px;
  margin: 0 5px 17px 5px;
}

#icons {
  overflow: -moz-hidden-unscrollable;
  display: flex;
  justify-content: center;
  flex: 1;
  height: 500px;
  max-height: 450px;
  padding-top: 18px;
  padding-bottom: 18px;
  flex-wrap: wrap;
  align-content: flex-start;
}

.icon-app-numero {
  position:relative; 
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 68px;
  height: 30px;
  background: rgb(128,128,128);
  margin: 0px 0px 0px 1.0px;
  border-radius: 8px;
  color: white;
  font-size:13px;
}

.numeros {
    margin-top: 1px;
    text-align: center;
    vertical-align: baseline;
}

.tel{
    font-size:11px;
}

.tel_informacao{
    font-size:9px;
}

.tel_numero{
    vertical-align: baseline;
    background:	white;
}



.tel_confirmacao{
    text-align: center;
    color: white;
    background: black;
    font-weight: bold;
    height:30px;
    font-size:12px;
}


.numeros-letra {
    font-size:7px;
    text-transform: uppercase;
    margin-top: 0px;

}

.dado_informacao{    
    position:relative;           
    margin-top: 37px;
}

.confirmacao{      
    position:relative;                  
    margin-top: 97px;
}

.teclado{
    position: relative;
}

#container_bandeira {
    position: relative;
    width: 100%;
    background-color: 	#d3d3d3;
    font-size:12px;
    height: 22px;
    vertical-align: baseline;
    vertical-align: bottom;
}

.cadastra{          
    /*background: #0066FF; */ /* telefonica_cor */
    background: #660099;  /* vivo_cor */
    align-items: center;
    justify-content: center;
    font-size:30px;
    font-weight: bold;
    text-align: center;
    color: white;
    height: 100%;
    padding: 180px 0;
}

.verifica {
    position:relative;           
    margin-top:40%;
    background: white;
    display: grid;
    align-items: flex-end;
    justify-content: center;
    font-size:30px;
    font-weight: bold;
    text-align: center;
}

.verificado {
   /* color: #0066FF; */ /* telefonica_cor */
    color: #660099;  /* vivo_cor */
}
.nao-verificado{
    color: rgba(0,0,0 ,0.8);
}

.button {
    border:none;
    padding:8px 13px;
    border-radius:20px;
    color:white;
    margin: 8px;
    cursor: pointer;
    font-size:11px;
}

.button-verificado{
    /* background : #0066FF; */ /* telefonica_cor */
    background : #660099; /* vivo_cor */
}

.button-nao-verificado{
    background : rgba(0,0,0 ,0.8);
}

a:link, a:visited, a:active{
	text-decoration:none;
	color:white;
}
a:hover{
	text-decoration:none;
	color:white;
}



/*
.icon-app .icon {
  margin: 10px 0 10px 0;
  font-size: 2em;
}

.icon-app span {
  width: auto;
  white-space: nowrap;
  font-size: 0.8em;
  color: #fff;
  text-shadow: -1px 0 #333, 0 1px #333, 1px 0 #333, 0 -1px #333;
  margin-bottom: 0px;
}

#dock-home {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 0px;
}
.buttons-home {
  display: flex;
  background: rgba(228, 228, 228, 0.2);
  border-radius: 20px;
  padding: 3px;
}

.buttons-home .icon-app {
  margin: 7px;
  align-items: center;
  justify-content: center;
  font-size: 2em;
}

.dock-bt-home {
  display: flex;
  flex: 1;
  height: 25px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
}

.dock-bt-home .home {
  width: 50px;
  height: 5px;
  background: rgba(117, 117, 117, 0.924);
  border-radius: 30px;
}

*/

</style>
