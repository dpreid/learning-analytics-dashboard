<template>
    <div class='container-fluid'>
    <div class="row" :id="id + 'chart'">
        <div class="col-sm-12">
            <canvas :id='id'></canvas>
        </div>
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
        coords: Array
     },
      data(){
          return{
              
          }
      },    
      mounted(){
        this.createChart();
      },
      computed:{
            ...mapGetters([
                
            ])
      },
      watch:{
        
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
                    datasets: [{
                        label: 'Centroid',
                        data: [{
                            x: _this.coords[0],
                            y: _this.coords[1]
                        }]
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom'
                        }]
                    }
                }
                });

            return chart;

        },
        
          
      }
  }
  </script>
  
  <style scoped>
  
  </style>