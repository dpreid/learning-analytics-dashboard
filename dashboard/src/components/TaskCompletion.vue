<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-8 pt-3 ps-3">
                <h3 class="text-start">Task Completion</h3>
            </div>
            
            <div class="col-sm-4">
                <button class="btn btn-success button-sm" @click="send">Request Data</button>
            </div>
        </div>

       
        <div class="form-check-inline form-switch">
            <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" @click="toggleChart">
            <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Show Chart</label>
        </div>
      
        

        <simple-line-graph v-if="showGraph" heading="TaskCompletion" :x_labels="labels" :y_values="y_values"/>

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
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgress(response[key])"></div>
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
  
  export default {
      name: "TaskCompletion",
      components:{
          SimpleLineGraph,
      },
      props: ['response'],
      data(){
          return{
            showGraph: false,
            headings: ['Task', 'Relative Similarity', 'Comment'],
            //TESTING
            labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
            y_values: [{title:'task1', values:[86,114,106,106,107,111,133,221,783,2478]},
                        {title:'task2', values:[123,34,76,38,90,76,12,5,300,432]}]
          }
      },
      mounted(){
          
      },
      computed:{
        ...mapGetters([
            // 'getExperiment'
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
          }
  
      },
      methods:{
          ...mapActions([
              'request'
          ]),
          getProgress(value){
            let closest_value = this.getCompleted[1];
            let width = closest_value*100.0/value;
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
        }
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>