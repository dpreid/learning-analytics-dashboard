<template>
    <div class="border-dashed">
        <div class="row mb-2">
            <div class="col-lg-3">

            </div>
            <div class="col-lg-6">
                <h2 >Task Feedback</h2>
            </div>
            <div class="col-lg-3">
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Task Feedback</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                    This component gives details of the steps you may need to take in order to complete the selected task.
                    </template>
                </popup-help>
            </div>
            
        </div>


        <div class="row">

            <div class="col-lg-3 p-4">
                
                    <div class='input-group'>
                        <span class='input-group-text' for="graph">GOAL:  </span>
                        <select class='form-select form-select-sm' name="task" id="task" v-model="selected">
                            <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-all">Full procedure</option>
                            <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-1-2">Task 1+2</option>
                            <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-3">Task 3</option>
                            <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-4">Task 4</option>
                            <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-mean-21-22">CIE3 2021-22 Mean</option>
                            <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-1">Task 1</option>
                            <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-2">Task 2</option>
                            <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-all">Full procedure</option>
                            <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-1">Task 1</option>
                            <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-2">Task 2</option>
                            <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-all">Full procedure</option>
                        </select> 
                    </div>
                
                
                    <button class='btn button-sm btn-success' id="request_feedback" @click="send">Get Feedback</button>
                

            </div>

            <div v-if='Object.keys(this.tasks).length > 0' class="col-lg-9">
                <div class="row">
                    <div class="col border p-2">
                        <h4> Hardware repeat runs</h4>
                        <ul v-if="this.tasks.hardware.length > 0">
                            <li v-for="mode in this.tasks.hardware" :key="mode">You may wish to remain in hardware mode {{ mode }} for multiple runs.</li>
                        </ul>
                        <div v-else>
                            You have performed repeat runs on the correct hardware modes.
                        </div>

                        <ul v-if="this.tasks.hardware_freq.length > 0">
                            <li v-for="mode in this.tasks.hardware_freq" :key="mode">Try running {{ mode }} more times.</li>
                        </ul>
                        
                    </div>

                    <div class="col border p-2">
                        <h4> Hardware transitions</h4>
                        <ul v-if="this.tasks.transition.length > 0">
                            <li v-for="mode in this.tasks.transition" :key="mode">You might need to transition from {{ mode }}.</li>
                        </ul>
                        <div v-else>
                            You have made the correct transitions between hardware modes.
                        </div>

                        <ul v-if="this.tasks.transition_freq.length > 0">
                            <li v-for="mode in this.tasks.transition_freq" :key="mode">You may need to repeat the transition from {{ mode }} more times.</li>
                        </ul>
                        
                    </div>
                </div>
            </div>



        </div>

       
        
      
        

       
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  import PopupHelp from './elements/PopupHelp.vue'
  
  export default {
      name: "TaskFeedback",
      components:{
          PopupHelp
      },
      props: ['tasks'],
      data(){
          return{
            selected: ''
          }
      },
      mounted(){
        
      },
      computed:{
        ...mapGetters([
            'getExperiment',
            'getCourse'
        ]),
        
  
      },
      methods:{
          ...mapActions([
              'request'
          ]),
          
        
        send(){
            this.request({"content": 'task_feedback', 'task': this.selected});
        },
        
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>