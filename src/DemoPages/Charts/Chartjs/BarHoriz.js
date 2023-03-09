import {HorizontalBar} from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  mounted() {
    this.renderChart({
      labels: ['Menos de x dias' , 'Mais de x dias',''],
      datasets: [
        {
          label: 'Última troca do SIM',
          //backgroundColor: '#0066FF', //telefonica_cor
          //borderColor: '#0066FF',  //telefonica_cor
          //hoverBackgroundColor: '#0066FF',  //telefonica_cor
          //hoverBorderColor: '#0066FF',  //telefonica_cor

          backgroundColor: '#660099', //vivo_cor
          borderColor: '#660099',  //vivo_cor
          hoverBackgroundColor: '#660099',  //vivo_cor
          hoverBorderColor: '#660099',  //vivo_cor

          borderWidth: 1,
          borderCapStyle: 'round',
          data: [ 45, 90 , 10 ]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}
