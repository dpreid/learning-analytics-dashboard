<template>
    <div>
        <div class="row">
            <div class="col-sm-8 pt-3 ps-3">
                <h3 class="text-start">Task Completion</h3>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-success button-sm" @click="send">Request Data</button>
            </div>
            
            
        </div>
        

        <div class="row table" id='task-completion-table' >

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

        <!-- <p>{{ response }}</p>
      <div v-for="key in Object.keys(response)" :key="key" >
            <p> {{ key }} : {{ response[key] }}</p>
        </div> -->
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  
  export default {
      name: "TaskCompletion",
      components:{
          
      },
      props: ['response'],
      data(){
          return{
              headings: ['Task', 'Relative Similarity', 'Comment']
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
        }
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>