<template>
    <div class="practable-component">
        <div class="d-flex justify-content-end align-items-center">
            <h2 class="text-start me-2">Engagement Indicators</h2>
            
            <div class="form-check-inline form-switch">
                <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" @click="toggleChart">
                <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Show Chart</label>
            </div>

            <button type='button' class='button-toolbar button-secondary me-2' id="request_engagement_indicators" aria-label='request engagement indicators' @click="requestIndicators">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
            </button>

            <popup-help class="me-2" id="popup-help-indicators">
                    <template v-slot:header>
                        <h5> Indicators Help </h5>
                    </template>
                    <template v-slot:body>
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

        <simple-line-graph v-if="showGraph" id="indicators-line-chart" heading="SRL Indicators" :x_labels="getXLabels" :y_values="getYValues" :hide_y_axis='hide_axis' :invert="invert"/>
        

        <div v-else class="row table mt-2" id='indicators-table' >

            <table>
                <thead class='table-head background-primary'>
                    <tr class='background-primary text-white'>
                        <th v-for='heading in headings' :key="heading" scope="col">{{ heading }}</th>
                    </tr>
                </thead>
                    <!-- EXPLORATION INDICATOR -->
                    <!-- <tr>
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
                    </tr> -->

                     <!-- ENJOYMENT INDICATOR -->
                     <!-- <tr>
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
                    </tr> -->

                    <!-- Number of runs INDICATOR -->
                    <tr>
                        <td v-if="indicators['total_edges']">total_edges</td>
                        <td v-if="indicators['total_edges']">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgress(indicators['total_edges'], 100)"></div>
                            </div>
                        </td>
                        <td v-if="indicators['total_edges']">{{ getEdgesComment(indicators['total_edges']) }}</td>
                        <td v-if="indicators['total_edges']">
                            <!-- <toolbar parentCanvasID="" parentComponentName="" parentDivID="indicators-table" :showDownload='false' :showPopupHelp="true" :showOptions="false"> 
                                <template v-slot:popup id='indicators-help'>
                                    This is the percentage of edges your graph contains in comparison to the expected full procedure. It does not consider whether the edges are appropriate for tasks or not, 
                                    so do not consider 100% as proof that you have finished tasks!


                                </template>
                            </toolbar> -->
                            <popup-help class="me-2" id="popup-help-total-edges">
                                <template v-slot:header>
                                    <h5> Total Edges Help </h5>
                                </template>
                                <template v-slot:body>
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
  import {mapActions, mapGetters} from 'vuex';
  import PopupHelp from './elements/PopupHelp.vue';
  import SimpleLineGraph from './elements/SimpleLineGraph.vue';

  import axios from 'axios';

  export default {
      name: "Indicators",
      components:{
        PopupHelp,
        SimpleLineGraph
      },
      props: [],
      data(){
          return{
              headings: ['Indicator', 'Relative Value', 'Comment', 'Help'],
              showGraph: false,
              hide_axis: false,
              invert: false,
              indicators: {}
          }
      },
      mounted(){
          
      },
      computed:{
        ...mapGetters([
            'getLogUUID',
            'getCourse',
            'getSelectedHardware'
        ]),
        getXLabels(){
            let labels = []
            this.getLocal().forEach((data) => {
                labels.push(data.date)
                })

            return labels;
          },
          getYValues(){
            // return [{title:'task1', values:[86,114,106,106,107,111,133,221,783,2478]},
            //         {title:'task2', values:[123,34,76,38,90,76,12,5,300,432]}]
            if(this.getLocal().length > 0){
                let tc = []
                this.getLocal().forEach((data) => {
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
       
        toggleChart(){
            this.showGraph = !this.showGraph;
        },
        requestIndicators(){
            let accessURL = `https://app.practable.io/ed-log-dev/analytics/taskcompare/api/v1/otherIndicators?username=${this.getLogUUID}&course=${this.getCourse}&hardware=${this.getSelectedHardware}`
            axios
				.get(accessURL, {}, { headers: { Authorization: '' } })
				.then((response) => {
					console.log(response);
                    this.indicators = response.data.indicators;
                    this.saveLocal(this.indicators);
				})
				.catch((err) => console.log(err));
        },
        saveLocal(indicators){
            let item_name = `${this.getLogUUID}-${this.getCourse}-${this.getSelectedHardware}-indicators`
            let saved_item = window.localStorage.getItem(item_name)
            if(saved_item == null){
                saved_item = []
            } else{
                saved_item = JSON.parse(saved_item)
            }
            let date = new Date();
            let to_save = {"date": date, "indicators":indicators}
            saved_item.push(to_save);
            let data_json = JSON.stringify(saved_item);
            window.localStorage.setItem(item_name, data_json); 
        },
        getLocal(){
            let item_name = `${this.getLogUUID}-${this.getCourse}-${this.getSelectedHardware}-indicators`
            let saved_item = window.localStorage.getItem(item_name)
            if(saved_item == null){
                return []
            } else{
                return JSON.parse(saved_item)
            }
        }
        
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>