<template>
    <div>
        <div class="row">
            <div class="col-lg-6 pt-3 ps-3">
                <h3 class="text-start">SRL Indicators</h3>
            </div>
            <!-- <div class="col-sm-4">
                <button class="btn btn-success button-sm" @click="send">Request Data</button>
            </div> -->
            <div class="col-lg-6 pt-3 ps-3">
                <div class="form-check-inline form-switch">
                    <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" @click="toggleChart">
                    <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Show Chart</label>
                </div>
            </div>
            
        </div>

        <simple-line-graph v-if="showGraph" id="indicators-line-chart" heading="SRL Indicators" :x_labels="getXLabels" :y_values="getYValues"/>
        

        <div v-else class="row table" id='indicators-table' >

            <table>
                <thead class='table-head background-primary'>
                    <tr class='background-primary text-white'>
                        <th v-for='heading in headings' :key="heading" scope="col">{{ heading }}</th>
                    </tr>
                </thead>
                    <!-- EXPLORATION INDICATOR -->
                    <tr>
                        <td v-if="response['exploration']">exploration</td>
                        <td v-if="response['exploration']">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgress(response['exploration'], 100)"></div>
                            </div>
                        </td>
                        <td v-if="response['exploration']">{{ getExplorationComment(response['exploration']) }}</td>
                        <td v-if="response['exploration']">
                            <popup-help>
                                <template v-slot:popup-help-header id='p-h-header'>Exploration</template>
                                <template v-slot:popup-help-body id='p-h-header'>
                                    Exploration concerns how much you have investigated hardware modes outside of those necessary to complete tasks.
                                </template>
                            </popup-help>
                        </td>
                    </tr>

                     <!-- ENJOYMENT INDICATOR -->
                     <tr>
                        <td v-if="response['enjoyment']">enjoyment</td>
                        <td v-if="response['enjoyment']">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgressMidZero(response['enjoyment'], 20)"></div>
                            </div>
                        </td>
                        <td v-if="response['enjoyment']">{{ getEnjoymentComment(response['enjoyment']) }}</td>
                        <td v-if="response['enjoyment']">
                            <popup-help>
                                <template v-slot:popup-help-header id='p-h-header'>Enjoyment</template>
                                <template v-slot:popup-help-body id='p-h-header'>
                                    This is the difference between your positive and negative responses to the lab
                                </template>
                            </popup-help>
                        </td>
                    </tr>

                    <!-- ADD IN OTHER INDICATORS WHEN AVAILABLE-->

            </table> 

        </div>
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  import PopupHelp from './elements/PopupHelp.vue'
  import SimpleLineGraph from './elements/SimpleLineGraph.vue';

  export default {
      name: "Indicators",
      components:{
          PopupHelp,
          SimpleLineGraph
      },
      props: ['response'],
      data(){
          return{
              headings: ['Indicator', 'Relative Value', 'Comment', 'Help'],
              showGraph: false
          }
      },
      mounted(){
          
      },
      computed:{
        ...mapGetters([
            'getSaved'
        ]),
        getXLabels(){
            let labels = []
            this.getSaved.forEach((data) => {
                labels.push(data.date)
                })

            return labels;
          },
          getYValues(){
            // return [{title:'task1', values:[86,114,106,106,107,111,133,221,783,2478]},
            //         {title:'task2', values:[123,34,76,38,90,76,12,5,300,432]}]
            if(this.getSaved.length > 0){
                let tc = []
                this.getSaved.forEach((data) => {
                    tc.push(data.indicators)
                })
                console.log(tc)
                let result = []
                const keys = Object.keys(tc[tc.length - 1])
                keys.forEach((key) => {
                    let values = [];
                    tc.forEach((entry) => {
                        values.push(entry[key])
                    })
                    result.push({"title":key, "values":values})
                })
                
                return result;
            } else {
                return []
            }
            

          },
      },
      methods:{
          ...mapActions([
              'request'
          ]),
          getProgress(value, max){
            let width = value*100.0/max;
            return 'width: ' + width.toFixed(2) + '%';
        },
        getProgressMidZero(value, max){
            let width = 50.0 + value*100.0/max;
            return 'width: ' + width.toFixed(2) + '%';
        },
        getExplorationComment(value){
            if(value > 100){
                return 'You have explored well beyond expectations!'
            }
            else if(value > 75){
                return 'You have been trying out other hardware modes'
            }
            else if(value > 25){
                return 'You have followed the tasks quite closely'
            } else{
                return 'You probably haven\'t completed the main tasks yet'
            }
            
        },
        getEnjoymentComment(value){
            if(value == 0){
                return 'Not sure if you are enjoying it or not?'
            } else if(value > 0){
                return 'Seems like you are enjoying the remote lab'
            } else{
                return 'Let us know if there is anything that would help improve your experience'
            }
        },
        send(){
            this.request({"content": 'indicators'});
        },
          toggleChart(){
            this.showGraph = !this.showGraph;
          }
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>