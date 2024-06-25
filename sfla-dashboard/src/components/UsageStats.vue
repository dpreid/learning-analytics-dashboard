<template>
    <div class="practable-component">
        <div class="d-flex flex-row-reverse">
            <button type='button' class='button-toolbar button-secondary' id="request_usage_stats" aria-label='request usage statistics' @click="requestUsageStats">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
            </button>
            <h2 class="col-6 me-2">Usage Statistics</h2>
        </div>

        <div class="col-12">
            <canvas id='usage-chart-canvas'></canvas>
        </div>

        <div>
            {{ interactionCounts }}
        </div>

        <div>
            {{ numLogs }}
        </div>

        <div>
            {{ sessionCounts }}
        </div>
        

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Toolbar from './elements/Toolbar.vue'
import Chart from 'chart.js/auto';
import axios from 'axios';

var bar_chart = null;

export default {
    name: "UsageStats",
      components:{
          Toolbar,
      },
      props: [],
      data(){
          return{
            interactionCounts: [],
            numLogs: 0,
            sessionCounts: 0
          }
      },
      mounted(){
        bar_chart = this.createChart();
      },
      computed: {
        ...mapGetters([
            'getLogUUID',
            'getCourse',
            'getSelectedHardware'
        ]),
        
      },
      methods: {
        ...mapActions([
            
        ]),
        requestUsageStats(){
            let accessURL = `https://app.practable.io/ed-log-dev/analytics/taskcompare/api/v1/usageStats?username=${this.getLogUUID}&course=${this.getCourse}&hardware=${this.getSelectedHardware}`
            axios
				.get(accessURL, {}, { headers: { Authorization: '' } })
				.then((response) => {
					console.log(response)
                    bar_chart.destroy();
                    this.formatUsageStats(response.data);
                    bar_chart = this.createChart();
                    
				})
				.catch((err) => console.log(err));
        },
        createChart() {
            var _this = this;
            const canvas = document.getElementById('usage-chart-canvas');
            const ctx = canvas.getContext('2d');
            return new Chart(ctx, {
            type: 'bar',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            },
            data: {
                labels: this.interactionCounts.map(row => row.name),
                datasets: [
                    {
                        label: 'counts',
                        data: this.interactionCounts.map(row => row.count)
                    }
                ]
                },
            
            });
        },
        formatUsageStats(data){
            this.interactionCounts = [];
            Object.keys(data.interactionCounts).forEach(key => {
                let new_interaction = {'name':key, 'count': data.interactionCounts[key]}
                this.interactionCounts.push(new_interaction);
            })

            this.numLogs = data.numLogs;
            this.sessionCounts = data.sessionCounts;
        }
      }
}
</script>

<style scoped>


</style>