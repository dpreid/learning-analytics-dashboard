<template>
  
    <div class="m-2">
        <h2>Planning space</h2>
        <div class="row">
            <div class="col-lg-6">
                <h5>Regulation process</h5>
            </div>
            <div class="col-lg-6">
                <h5>Subject of reflection</h5>
            </div>
        </div>
        <div class="row">
            <div class="container-fluid border col-lg-6">
                <button class="button button-positive button-sm" @click="selected_process = 'Monitor'">Monitor</button> 
                <button class="button button-positive button-sm" @click="selected_process = 'Seek help'">Seek help</button> 
                

                
                
            </div>


            <div class="container-fluid border col-lg-6">
                <button class="button button-subject button-sm" @click="selected_subject = 'Course content'">Course content</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Remote lab'">Remote lab</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Task 1'">Task 1</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Task 2'">Task 2</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Task 3'">Task 3</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Task 4'">Task 4</button> 
            </div>
        </div>

        <div class="row justify-content-center">
            <span class="col-sm-1 mt-3"> I will </span>
            <div class="state-input col-lg-4" @click="selected_evaluation = null">{{ selected_evaluation }}</div>
            <span class="col-sm-1 mt-3"> the </span>
            <div class="subject-input col-lg-4" @click="selected_component = null">{{ selected_component }}</div>
        </div>

        <button class="btn btn-success btn-lg" :disabled="!getSubmitAllowed" @click="submit">Submit</button>
        

    </div>



</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "PlanningFeedback",
      components:{
          
      },
      props: [],
      data(){
          return{
            selected_process: null,
            selected_subject: null
          }
      },
      mounted(){
        
      },
      computed: {
        ...mapGetters([

        ]),
        getSubmitAllowed(){
            if(this.selected_process != null && this.selected_subject != null){
                return true;
            } else{
                return false;
            }
        }
      },
      methods: {
        ...mapActions([
            'feedback'
        ]),
        submit(){
            this.feedback({"state": this.selected_state, "subject": this.selected_subject});
        }
      }
}
</script>

<style scoped>


.state-input{
    border: 4px solid blue;
    border-radius: 4px;
    background-color: rgb(177, 177, 177);
    color: rgb(255, 255, 255);
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    margin: 8px 4px;
    cursor: pointer;
    min-height: 50px;
}
.subject-input{
    border: 4px solid blue;
    border-radius: 4px;
    background-color: rgb(177, 177, 177);
    color: rgb(255, 255, 255);
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    margin: 8px 4px;
    cursor: pointer;
    min-height: 50px;
}

.button{
      border: none;
      border-radius: 4px;
      color: white;
      padding: 8px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 18px;
      margin: 8px 4px;
      transition-duration: 0.2s;
      cursor: pointer;
  }
  
  .button-sm{
      border: none;
      border-radius: 4px;
      color: white;
      padding: 8px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 18px;
      margin: 8px 4px;
      transition-duration: 0.2s;
      cursor: pointer;
  }


.button-positive{
    background-color:darkorange;
    color: white; 
    border: 2px solid darkorange;
}

.button-positive:hover{
    background-color: white; 
    color: black; 
}

.button-negative{
    background-color:darkolivegreen;
    color: white; 
    border: 2px solid darkolivegreen
}

.button-negative:hover{
    background-color: white; 
    color: black; 
}

.button-subject{
    background-color:rgb(4, 179, 248);
    color: white; 
    border: 2px solid rgb(4, 179, 248);
}

.button-subject:hover{
    background-color: white; 
    color: black; 
}
</style>