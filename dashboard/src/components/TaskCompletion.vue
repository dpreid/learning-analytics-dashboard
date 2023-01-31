<template>
    <div class="border-dashed" @mouseenter="logInteraction">
        <div class="row">
            <div class="col-lg-6">
                <h2 class="text-start">Task Completion</h2>
            </div>
            <div class="col-lg-3">
                <div class="form-check-inline form-switch">
                    <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" @click="toggleChart">
                    <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Show Chart</label>
                </div>
            </div>
            <div v-if="getExperiment == 'spinner'" class="col-lg-3">
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Task Completion: Spinner</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This component uses a graph comparison algorithm to predict the task or task combinations that you have completed.
                        It is experimental and should be used to reflect upon, not as evidence that you have finished tasks completely or correctly.<br>
                        <br>
                        <div v-if="getCourse == 'cie3'">
                            The tasks represent the practical aspects of the CIE3 coursework workbook.<br>
                            spinner-1-2: Section 2 and 3.<br>
                            spinner-3: Section 5<br>
                            spinner-4: Section 6
                        </div>
                        <div v-if="getCourse == 'engdes1'">
                            The tasks represent the practical aspects of the Engineering Design 1 workshop workbook.<br>
                            
                        </div>

                        
                    
                    </template>
                </popup-help>
            </div>
            <div v-if="getExperiment == 'pendulum'" class="col-lg-3">
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Task Completion: Pendulum</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This component uses a graph comparison algorithm to predict the task or task combinations that you have completed.
                        It is experimental and should be used to reflect upon, not as evidence that you have finished tasks completely or correctly.
                    </template>
                </popup-help>
            </div>
            <div v-else class="col-lg-3">
                
            </div>
                
            

        </div>

       
        
      
        

        <simple-line-graph v-if="showGraph" id="taskcompletion-line-chart" heading="TaskCompletion" :x_labels="getXLabels" :y_values="getYValues" :hide_y_axis='hide_axis' :invert="invert"/>

        <div v-else class="row table" id='task-completion-table' >

            <table>
                <thead class='table-head background-primary'>
                    <tr class='background-primary text-white'>
                        <th v-for='heading in headings' :key="heading" scope="col">{{ heading }}</th>
                    </tr>
                </thead>
                    <tr v-for="key in Object.keys(response)" :key="key">
                        <td>{{ key }}</td>
                        <!-- <td>{{ response[key].toFixed(2) }}</td> -->
                        <td>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgressAsString(response[key])"></div>
                            </div>
                        </td>
                        
                        <td>{{ getComment(response[key]) }}</td>
                    </tr>
            </table> 

        </div>
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  import SimpleLineGraph from './elements/SimpleLineGraph.vue'
  import PopupHelp from './elements/PopupHelp.vue'
  
  export default {
      name: "TaskCompletion",
      components:{
          SimpleLineGraph,
          PopupHelp,
      },
      props: ['response'],
      data(){
          return{
            showGraph: false,
            headings: ['Task', 'Relative Similarity', 'Comment'],
            hide_axis: true,
            invert: true,
          }
      },
      mounted(){
        
      },
      computed:{
        ...mapGetters([
            'getSaved',
            'getExperiment',
            'getCourse'
        ]),
        
        getSeparateCompleted(){
            let completed = this.getCompleted[0];
            let components = completed.split("-");
            components.shift();
            return components;
        },
        getCompleted(){
            let value = Infinity;
            let task = '';
            Object.keys(this.response).forEach((key) => {
                if(this.response[key] < value){
                    value = this.response[key]
                    task = key
                }
            })
            
            return [task, value]
          },
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
                    tc.push(data.taskcompletion)
                })
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
            

          }
  
      },
      methods:{
          ...mapActions([
              'request',
              'log'
          ]),
          getProgress(value){
            let closest_value = this.getCompleted[1];
            let width = closest_value*100.0/value;
            return width
        },
        getProgressAsString(value){
            let width = this.getProgress(value)
            return 'width: ' + width.toFixed(2) + '%';
        },
        getComment(value){
            let closest_value = this.getCompleted[1];
            if(value == closest_value){
                return 'Looks like you are closest to completing this task combination'
            }
            else if(value < 10){
                return 'Good progress on this task'
            } else if(value < 20){
                return 'Looks like you have started this task'
            } else{
                return 'You have probably not run some key hardware modes yet.'
            }
            
        },
        send(){
            this.request({"content": 'task_identification'});
        },
        toggleChart(){
            this.showGraph = !this.showGraph;
        },
        logInteraction(){
            //console.log('mouse entering task completion component')
            this.log({log:"analytics-interaction", type: "mouseenter", component: "task-completion"})
        }
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>