
<template>
<div class='container-fluid'>
    <div class="row" id="chart-canvas">
        <div class="col-12">
            <canvas id='line-canvas'></canvas>
        </div>
    </div>
    
</div>

</template>

<script>

import { Chart } from 'chart.js';
import { mapActions, mapGetters } from 'vuex';

export default {
    
    name: 'SimpleLineGraph',
    props:{
        heading: String,
        x_labels: Array,
        y_values: Array        //array of Objects {title: task_1, values: [0.1, 0.2...]}
    },         
    emits: [],
    components:{
        
    },
    data(){
        return{
            colourList: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#0000FF", "#006400", "#4B0082", "#FFA500", "#A0522D"]
            
        }
    },
    mounted() {
        this.createChart();
        
      },
    computed:{
        ...mapGetters([
           
        ]),
      },
    watch:{
        
    },
    methods: {
        ...mapActions([
            
        ]),
        
        createChart() {
            let _this = this;
            const canvas = document.getElementById('line-canvas');
            const ctx = canvas.getContext('2d');
            let chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: _this.x_labels,
                        datasets: _this.generateDatasets()
                    },
                    options: {
                        title: {
                        display: true,
                        text: _this.heading
                        }
                    }
                });

            return chart;

        },
        generateDatasets(){
            let _this = this;
            let dataset = [];
            this.y_values.forEach((data, index) => {
                dataset.push(
                    {
                        data: data.values,
                        label: data.title,
                        borderColor: _this.colourList[index],
                        fill: false
                    }
                )
            })

            return dataset;
        }
        
        
        
        
        
        
        
        

      },
      
}
</script>



<style scoped>




</style>
