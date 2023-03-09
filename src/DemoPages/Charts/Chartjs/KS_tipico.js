import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  
  mounted() {
    this.renderChart({
      labels: ['1', '2', '3', '4', '5', '6', '7' , '8', '9', '10', 'Faixa 0'],
      datasets: [
        {
          label: 'Mau Prob. Acum.',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#ed0f51',
          borderColor: '#ed0f51',
          borderCapStyle: 'round',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#ed0f51',
          pointBackgroundColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: '#ed0f51',
          pointHoverBorderColor: '#ed0f51',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 0.094, 0.192, 0.290, 0.390, 0.490, 0.592, 0.693, 0.795, 0.896, 1]
        },
        {
          label: 'Bom Prob. Acum.',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#22a3ec',
          borderColor: '#22a3ec',
          borderCapStyle: 'round',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#22a3ec',
          pointBackgroundColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: '#22a3ec',
          pointHoverBorderColor: '#22a3ec',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0, 0.231, 0.377, 0.502, 0.603, 0.696, 0.776, 0.845, 0.914, 0.981, 1]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}
