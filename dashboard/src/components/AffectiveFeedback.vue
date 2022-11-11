<template>
  
    <div class="m-2">
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <h2>Affective Reflection</h2>
            </div>
            <div class="col-lg-3">
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Affective Reflection</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This component allows you to provide feedback on how you are responding to the remote laboratory and learning analytics data.
                        
                    </template>
                </popup-help>
            </div>
        </div>
        
        
        <div class="row">
            <div class="col-lg-6">
                <h5>Affective State</h5>
            </div>
            <div class="col-lg-6">
                <h5>Subject of reflection</h5>
            </div>
        </div>
        <div class="row">
            <div class="container-fluid border col-lg-6">
                <button class="button button-positive button-sm" @click="selected_state = 'Engaged'">Engaged</button> 
                <button class="button button-positive button-sm" @click="selected_state = 'Curious'">Curious</button> 
                <button class="button button-positive button-sm" @click="selected_state = 'Interested'">Interested</button> 
                <button class="button button-positive button-sm" @click="selected_state = 'Excited'">Excited</button> 
                <button class="button button-positive button-sm" @click="selected_state = 'Satisfied'">Satisfied</button> 

                <button class="button button-negative button-sm" @click="selected_state = 'Dissatisfied'">Dissatisfied</button> 
                <button class="button button-negative button-sm" @click="selected_state = 'Bored'">Bored</button> 
                <button class="button button-negative button-sm" @click="selected_state = 'Confused'">Confused</button> 
                <button class="button button-negative button-sm" @click="selected_state = 'Uninterested'">Uninterested</button> 
                <button class="button button-negative button-sm" @click="selected_state = 'Frustrated'">Frustrated</button> 
            </div>

            <div class="container-fluid border col-lg-6">
                <button class="button button-subject button-sm" @click="selected_subject = 'Teaching'">Teaching</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Workbook'">Workbook</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Remote work'">Remote work</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Hardware'">Hardware</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Tasks'">Tasks</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Feedback'">Feedback</button> 
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="state-input col-lg-5" @click="selected_state = null">{{ selected_state }}</div>
            <span class="col-sm-1 mt-4"> about </span>
            <div class="subject-input col-lg-5" @click="selected_subject = null">{{ selected_subject }}</div>
        </div>

        <button class="btn btn-success btn-lg" :disabled="!getSubmitAllowed" @click="submit">Submit</button>
        <div class="row mt-2">
            <h5 v-if="thanks"> Thanks </h5>
        </div>
        

    </div>



</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PopupHelp from './elements/PopupHelp.vue'

export default {
    name: "AffectiveFeedback",
      components:{
          PopupHelp,
      },
      props: [],
      data(){
          return{
                selected_state: null,
                selected_subject: null,
                thanks: false
          }
      },
      mounted(){
        
      },
      computed: {
        ...mapGetters([

        ]),
        getSubmitAllowed(){
            if(this.selected_state != null && this.selected_subject != null){
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
            this.thanks = true;
            setTimeout(() => {
                this.thanks = false
            }, 10000);
            this.selected_state = null;
            this.selected_subject = null;
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