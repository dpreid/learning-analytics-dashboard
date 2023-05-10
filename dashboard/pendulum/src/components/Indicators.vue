<template>
    <div class="border-dashed" @mouseenter="logInteraction">
        <div class="row">
            <div class="col-lg-6">
                <h2 class="text-start">Learning Indicators</h2>
            </div>
            
            <div class="col-lg-3">
                <div class="form-check-inline form-switch">
                    <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" @click="toggleChart">
                    <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Show Chart</label>
                </div>
            </div>

            <div class="col-lg-3">
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Learning Indicators</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This component provides some feedback on different learning indicators. There is no expectation that to complete tasks you must have a specific value in these indicators.
                        It is simply data for you to reflect on that may help you consider your next steps to approach tasks.<br>
                        <br>
                        Most indicators do not provide you with a numerical value, but instead a relative score represented by a bar.
                        <br>
                        For an explanation of each indicator, click on the ? in the corresponding row.<br>
                        <br>
                        <b>Please note: this component is experimental and calculated values may not accurately reflect the work you have done. </b>
                        
                    </template>
                </popup-help>
            </div>
            
        </div>

        <simple-line-graph v-if="showGraph" id="indicators-line-chart" heading="SRL Indicators" :x_labels="getXLabels" :y_values="getYValues" :hide_y_axis='hide_axis' :invert="invert"/>
        

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
                                    Exploration is calculated by considering how many edges exist on your graph that are not necessary to complete tasks when compared to the expected workbook procedure. 
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
                                    This is the difference between your positive and negative responses to the lab in the Affective State component.
                                </template>
                            </popup-help>
                        </td>
                    </tr>

                    <!-- Number of runs INDICATOR -->
                    <tr>
                        <td v-if="response['edges']">edges</td>
                        <td v-if="response['edges']">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgress(response['edges'], 100)"></div>
                            </div>
                        </td>
                        <td v-if="response['edges']">{{ getEdgesComment(response['edges']) }}</td>
                        <td v-if="response['edges']">
                            <popup-help>
                                <template v-slot:popup-help-header id='p-h-header'>Graph edges</template>
                                <template v-slot:popup-help-body id='p-h-header'>
                                    This is the percentage of edges your graph contains in comparison to the expected full procedure. It does not consider whether the edges are appropriate for tasks or not, 
                                    so do not consider 100% as proof that you have finished tasks!


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
              showGraph: false,
              hide_axis: false,
              invert: false
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
              'request',
              'log'
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
        getEdgesComment(value){
            return 'Your graph contains ' + value.toFixed(0) + '% of the expected number of edges.'
        },
        send(){
            this.request({"content": 'indicators'});
        },
        toggleChart(){
            this.showGraph = !this.showGraph;
        },
        logInteraction(){
            //console.log('mouse entering indicators feedback')
            this.log({log:"analytics-interaction", type: "mouseenter", component: "learning-indicators"})
    }
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>