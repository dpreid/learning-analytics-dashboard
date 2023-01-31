<template>
    <div class='border-dashed' @mouseenter="logInteraction">
        <div class="row">
            <div class="col-lg-3">
                
            </div>
            <div class="col-lg-6">
                <h2>Hardware Centroid</h2>
            </div>
            <div class="col-lg-3">
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Centroid</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This plot displays the weighted average (centroid) hardware mode that you have entered during the remote laboratory.
                        The position for possible centroids for individual tasks is also provided.
                    </template>
                </popup-help>
            </div>
            
            
        </div>
    <div class="row" :id="id + 'chart'">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <canvas :id='id'></canvas>
        </div>
        <div class="col-sm-2"></div>
    </div>
    
</div>
    


</template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex';
  import { Chart } from 'chart.js';
 import PopupHelp from './elements/PopupHelp.vue'

  export default {
      name: "CentroidDisplay",
      components:{
          PopupHelp,
      },
      props:{
        id: String,
        centroids: Object
     },
      data(){
          return{
            colourList: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#0000FF", "#006400", "#4B0082", "#FFA500", "#A0522D"]
          }
      },    
      mounted(){
        
      },
      computed:{
            ...mapGetters([
                'getSaved'
            ])
      },
      watch:{
        centroids(){
            this.createChart();
        }
      },
      methods:{
        ...mapActions([
            'log'
        ]),
        createChart() {
            let _this = this;
            const canvas = document.getElementById(this.id);
            const ctx = canvas.getContext('2d');
            let chart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: _this.generateDatasets()
                },
                options: {
                    responsive: true,
                    legend:{
                        position: 'bottom'
                    },
                    aspectRatio: 1,
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            ticks: {
                                min: -1.2,
                                max: 1.2
                            },
                            
                        }],
                        yAxes: [{
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                min: -1,
                                max: 1
                            },
                            
                        }],
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                
                                return label;
                                }
                            },
                            intersect: false,
                            mode: 'nearest',
                            axis: 'xy'
                        }
                    },
                });

            return chart;

        },
        generateDatasets(){
            let _this = this;
            let dataset = [];
            
            Object.keys(this.centroids).forEach((data, index) => {
                if(data != 'vertices'){
                    let coords = _this.centroids[data]
                    if(data == 'student'){
                        dataset.push(
                        {
                            type: 'line',
                            data: [{x: coords[0], y: coords[1]}],
                            label: data,
                            borderColor: 'blue',
                            pointBackgroundColor: 'blue',
                            pointRadius: 5,
                            pointHoverRadius: 10,
                            fill: false
                        }
                    )
                    } else {
                        dataset.push(
                        {
                            type: 'scatter',
                            data: [{x: coords[0], y: coords[1]}],
                            label: data,
                            borderColor: _this.colourList[index],
                            pointRadius: 5,
                            pointHoverRadius: 10,
                            fill: false
                        }
                    )
                    }
                    
                }
            })

            //add vertices
            this.centroids['vertices'].forEach((vertex) => {
                dataset.push(
                        {
                            type:'scatter',
                            data: [{x: vertex['x'], y: vertex['y']}],
                            label: vertex['name'],
                            borderColor: 'red',
                            pointBackgroundColor: 'red',
                            pointRadius: 20,
                            pointHoverRadius: 25,
                            fill: false
                        }
                    )
            })

            //add saved centroid data for student if available
            let previous_data = []
            this.getSaved.forEach((save) => {
                if(save['student_centroid'] != undefined){

                    let coord = save['student_centroid'];
                    previous_data.push({x: coord[0], y: coord[1]})

                }
            })

            dataset.push(
                        {
                            type:'line',
                            data: previous_data,
                            label: 'student_previous',
                            borderColor: 'green',
                            pointBackgroundColor: 'green',
                            pointRadius: 5,
                            pointHoverRadius: 10,
                            fill: false
                        }
                    )

            return dataset;
        },
        logInteraction(){
            console.log('mouse entering centroid feedback')
            this.log({"log":"analytics-interaction", "type": "mouseenter", "component": "centroid"})
        }
        
          
      }
  }
  </script>
  
  <style scoped>
  
  </style>