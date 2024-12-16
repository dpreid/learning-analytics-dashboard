<template>
    <div class="practable-component">
        <div class="d-flex flex-row justify-content-end align-items-center mb-2"> 
            
            <h4 class="me-2 text-start flex-fill">Task Completion</h4>
            
            <div class="form-check-inline form-switch">
                <input class="form-check-input me-2" type="checkbox" id="flexSwitchCheckDefault" @click="toggleChart">
                <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Show Chart</label>
            </div>
           
            <button type='button' class='button-toolbar button-primary me-2' id="request_usage_stats" aria-label='request usage statistics' @click="requestTaskCompletion">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
            </button>

            <request-chat-feedback class="me-2" id="chat-feedback-task-completion" :awaiting="awaiting_response" @request-feedback="requestFeedback">
                <template v-slot:header>
                    <h5> Task Completion feedback </h5>
                </template>

                <template v-slot:body>
                    
                        {{ feedback_response }}
                    
                </template>
            </request-chat-feedback>

            <div v-if="getSelectedHardware == 'spinner'">
                <popup-help class="me-2" id="popup-help-task-completion">
                    <template v-slot:header>
                        <h5> Task completion Help </h5>
                    </template>
                    <template v-slot:body>
                        This component uses a graph comparison algorithm to predict the task or task combinations that you have completed.
                        It is experimental and should be used to reflect upon, not as evidence that you have finished tasks completely or correctly.<br>
                        <br>
                        <div v-if="getCourse == 'cie3'">
                            The tasks represent the practical aspects of the CIE3 coursework workbook.<br>
                            spinner-1-2: Section 2 and 3.<br>
                            spinner-3: Section 5<br>
                            spinner-4: Section 6
                        </div>
                        <div v-if="getCourse == 'ed1'">
                            This component uses a graph comparison algorithm to predict the task or task combinations that you have completed.
                            <br>
                            The tasks represent the practical aspects of the Engineering Design 1 workshop workbook.<br>
                            <br>
                            spinner-engdes1-1-core -> Lab 1 Core tasks<br>
                            spinner-engdes1-1-ext -> Lab 1 Extension tasks<br>
                            spinner-engdes1-1-core-ext -> Lab 1 Core and Extension tasks combined<br>
                            spinner-engdes1-2 -> Lab 2 Core tasks<br>
                            spinner-engdes1-all -> all Spinner tasks combined<br>
                            
                            <br>
                            <b>Please note: this component is experimental and should be used to reflect upon, not as evidence that you have finished tasks completely or correctly.</b>
                        </div>
                    </template>
                </popup-help>
            </div>
            <div v-if="getSelectedHardware == 'pendulum'">
                <popup-help class="me-2" id="popup-help-task-completion">
                    <template v-slot:header>
                        <h5> Task completion Help </h5>
                    </template>
                    <template v-slot:body>
                        This component uses a graph comparison algorithm to predict the task or task combination that you have completed. The relative similarity is to the 
                            task or task combination that the algorithm thinks you are closest to. A full bar does not necessarily mean that you have fully completed that task, just that 
                            you are currently closer to completing that task than the others.
                            <br>
                            The tasks represent the practical aspects of the Engineering Design 1 workshop workbook.<br>
                            <br>
                            pendulum-engdes1-1-core -> Lab 1 Core tasks<br>
                            pendulum-engdes1-1-ext -> Lab 1 Extension tasks<br>
                            pendulum-engdes1-1-core-ext -> Lab 1 Core and Extension tasks combined<br>
                            pendulum-engdes1-2 -> Lab 2 Core tasks<br>
                            pendulum-engdes1-all -> all Pendulum tasks combined<br>
                            
                            <br>
                            <b>Please note: this component is experimental and should be used to reflect upon, not as evidence that you have finished tasks completely or correctly.</b>
                            
                    </template>
                </popup-help>
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
                    <tr v-for="key in Object.keys(task_dissimilarity)" :key="key">
                        <!-- <td>{{ key }}</td> -->
                        <td>{{ getTaskReadableFromCode(key) }}</td>
                        <td>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgressAsString(task_dissimilarity[key])"></div>
                            </div>
                        </td>
                        
                        <td>{{ getComment(task_dissimilarity[key]) }}</td>
                    </tr>
            </table> 

        </div>
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  import SimpleLineGraph from './elements/SimpleLineGraph.vue'
  import PopupHelp from './elements/PopupHelp.vue'
  import RequestChatFeedback from './elements/RequestChatFeedback.vue'

  import axios from 'axios'
  
  export default {
      name: "TaskCompletion",
      components:{
          SimpleLineGraph,
          PopupHelp,
          RequestChatFeedback
      },
      props: [],
      data(){
          return{
            showGraph: false,
            headings: ['Task', 'Relative Similarity', 'Comment'],
            hide_axis: true,
            invert: true,
            task_dissimilarity: {},
            //feedback_input: 'Can you give me feedback on my work please?',
            awaiting_response: false,
            feedback_response: ''
          }
      },
      mounted(){
        
      },
      computed:{
        ...mapGetters([
            'getSelectedHardware',
            'getCourse',
            'getLogUUID',
            'getConfigJSON',
            'getTaskCompareHost',
            'getChatHost',
            'getLoggingAuth'
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
            Object.keys(this.task_dissimilarity).forEach((key) => {
                if(this.task_dissimilarity[key] < value){
                    value = this.task_dissimilarity[key]
                    task = key
                }
            })
            
            return [task, value]
          },
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
                    tc.push(data.task_dissimilarity)
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
              
          ]),
          getTaskReadableFromCode(code){
            const readable = this.getConfigJSON['parameters'][this.getSelectedHardware]['tasks'].find((task) => task['code_string'] == code);
            return readable['readable_string']
          },
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
                return this.getConfigJSON['parameters'][this.getSelectedHardware]['task_completion'].find((comment) => comment['value'] == "completed")['comment'];
            }
            else if(value >= this.getConfigJSON['parameters'][this.getSelectedHardware]['max_task_completion_value']){
                return this.getConfigJSON['parameters'][this.getSelectedHardware]['task_completion'].find((comment) => comment['value'] == "other")['comment'];
            }
            else {
                return this.getConfigJSON['parameters'][this.getSelectedHardware]['task_completion'].find((comment) => comment['value'] >= value)['comment'];
            }
            
        },
        
        toggleChart(){
            this.showGraph = !this.showGraph;
        },
        requestTaskCompletion(){
            let accessURL = `${this.getTaskCompareHost}/taskCompletion?username=${this.getLogUUID}&course=${this.getCourse}&hardware=${this.getSelectedHardware}`
            axios
				.get(accessURL, {}, { headers: { Authorization: '' } })
				.then((response) => {
					console.log(response);
                    this.task_dissimilarity = response.data.task_dissimilarity;
                    this.saveLocal(this.task_dissimilarity);
				})
				.catch((err) => console.log(err));
        },
        requestFeedback(){
            console.log('request feedback now')
            this.awaiting_response = true;
            let feedback_observables = {
                "time": new Date().getTime(), 
                "level": "INFO",
                "type": "chat", 
                "actor":
                {
                    "id": this.getLogUUID,
                    "course": this.getCourse
                },
                "verb": 
                {
                    "name": "requested-feedback", 
                    // "definition": `${this.instance_path}${config.definitions_path}/clicked`
                }, 
                "object": 
                {
                    "name": "task-completion-feedback-bot",
                    "task_dissimilarity": this.task_dissimilarity
                    //"text": ''
                },
                "context": 
                {
                    "experiment": this.getSelectedhardware,
                }
            };
            let accessURL = `${this.getChatHost}/taskCompletionFeedback?username=${this.getLogUUID}&course=${this.getCourse}&hardware=${this.getSelectedHardware}&bot_type=task-completion`
            axios
				.post(accessURL, 
                    feedback_observables, 
                    { headers: 
                        {
                            'Content-Type': 'application/json', 
                            'Authorization': '' 
                        } 
                    })
				.then((response) => {
					console.log(response);
                    this.awaiting_response = false;
                    this.feedback_response = response.data;
				})
				.catch((err) => {
                    console.log(err);
                    this.awaiting_response = false;
                });
        },
        saveLocal(task_dissimilarity){
            let item_name = `${this.getLogUUID}-${this.getCourse}-${this.getSelectedHardware}-taskcompletion`
            let saved_item = window.localStorage.getItem(item_name)
            if(saved_item == null){
                saved_item = []
            } else{
                saved_item = JSON.parse(saved_item)
            }
            let date = new Date();
            let to_save = {"date": date, "task_dissimilarity":task_dissimilarity}
            saved_item.push(to_save);
            let data_json = JSON.stringify(saved_item);
            window.localStorage.setItem(item_name, data_json); 
        },
        getLocal(){
            let item_name = `${this.getLogUUID}-${this.getCourse}-${this.getSelectedHardware}-taskcompletion`
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