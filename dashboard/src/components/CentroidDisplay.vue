<template>
    <div class='container-fluid'>
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
 

  export default {
      name: "CentroidDisplay",
      components:{
          
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
                
            ])
      },
      watch:{
        centroids(){
            this.createChart();
        }
      },
      methods:{
        ...mapActions([
            
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
                    }
                }
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
                            data: [{x: coords[0], y: coords[1]}],
                            label: data,
                            borderColor: 'blue',
                            pointRadius: 15,
                            fill: false
                        }
                    )
                    } else {
                        dataset.push(
                        {
                            data: [{x: coords[0], y: coords[1]}],
                            label: data,
                            borderColor: _this.colourList[index],
                            pointRadius: 5,
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
                            data: [{x: vertex['x'], y: vertex['y']}],
                            label: vertex['name'],
                            borderColor: 'red',
                            //pointBackgroundColor: 'red',
                            pointRadius: 20,
                            fill: false
                        }
                    )
            })

            console.log(dataset)
            return dataset;
        }
        
          
      }
  }
  </script>
  
  <style scoped>
  
  </style>