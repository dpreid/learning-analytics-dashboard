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
            <canvas id='interactions-chart-canvas'></canvas>
        </div>

        <div class="col-12">
            <canvas id='session-times-chart-canvas'></canvas>
        </div>

        <div>
            {{ interactionCounts }}
        </div>

        <div>
            {{ numLogs }}
        </div>

        <div>
            {{ session_dates.length }}
        </div>
        

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Chart from 'chart.js/auto';
import axios from 'axios';

var bar_chart = null;
var pie_chart = null;

export default {
    name: "UsageStats",
      components:{
          
      },
      props: [],
      data(){
          return{
            interactionCounts: [],
            numLogs: 0,
            session_dates: [],
            session_times: []
          }
      },
      mounted(){
        bar_chart = this.createInteractionChart();
        pie_chart = this.createSessionTimesChart();
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
                    pie_chart.destroy();
                    this.formatUsageStats(response.data);
                    bar_chart = this.createInteractionChart();
                    pie_chart = this.createSessionTimesChart();
                    
				})
				.catch((err) => console.log(err));
        },
        createInteractionChart() {
            var _this = this;
            const canvas = document.getElementById('interactions-chart-canvas');
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
        createSessionTimesChart() {
            var _this = this;
            const canvas = document.getElementById('session-times-chart-canvas');
            const ctx = canvas.getContext('2d');
            return new Chart(ctx, {
            type: 'doughnut',
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
                labels: this.session_times.map(row => row.name),
                datasets: [
                    {
                        label: 'counts',
                        data: this.session_times.map(row => row.count)
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

            let first_four = 0       //between 00.00 and 04.00
            let second_four = 0       //between 04.00 and 08.00
            let third_four = 0       //between 08.00 and 12.00
            let fourth_four = 0       //between 12.00 and 16.00
            let fifth_four = 0       //between 16.00 and 20.00
            let sixth_four = 0       //between 20.00 and 00.00
            
            data.session_times.forEach(time => {
                let hour = time.slice(0,2);
                switch (hour) {
                    case '00':
                    case '01':
                    case '02':
                    case '03':
                        first_four += 1;
                        break;

                    case '04':
                    case '05':
                    case '06':
                    case '07':
                        second_four += 1;
                        break;
                        
                    case '08':
                    case '09':
                    case '10':
                    case '11':
                        third_four += 1;
                        break;

                    case '12':
                    case '13':
                    case '14':
                    case '15':
                        fourth_four += 1;
                        break;

                    case '16':
                    case '17':
                    case '18':
                    case '19':
                        fifth_four += 1;
                        break;

                    case '20':
                    case '21':
                    case '22':
                    case '23':
                        sixth_four += 1;
                        break;
                    
                }
            })

            this.session_times = [
                {"name": '00:00 - 03:59', "count": first_four},
                {"name": '04:00 - 07:59', "count": second_four},
                {"name": '08:00 - 11:59', "count": third_four},
                {"name": '12:00 - 15:59', "count": fourth_four},
                {"name": '16:00 - 19:59', "count": fifth_four},
                {"name": '20:00 - 23:59', "count": sixth_four}

            ]

            this.numLogs = data.numLogs;
            this.session_dates = data.session_dates;
            
        }
      }
}
</script>

<style scoped>


</style>