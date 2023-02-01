<template>
  
    <div class="border-dashed" @mouseenter="logInteraction">
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <h2>Affective Reflection</h2>
            </div>
            <div class="col-lg-3">
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Affective Reflection</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This component allows you to provide feedback on your experience of the remote laboratory and learning analytics dashboard.<br>
                        <br>
                        Please select an "Affective state" - i.e. how you are feeling - and a "Subject of reflection" - i.e. what you want to provide feedback about. Once you have 
                        added both, you can click Submit to send your feedback.<br>
                        <br>

                        <b>Please note: all feedback is completely anonymous and is being used to help develop better remote lab experiences, so your honesty is appreciated.</b>
                        
                    </template>
                </popup-help>
            </div>
        </div>
        
    
        <div class="row">
            <div class="container-fluid border col-lg-6">
                <h5 class="mt-2">Affective State</h5>
                <button class="button button-positive button-sm" @click="selected_state = 'Engaged'">Focused/Engaged</button> 
                <button class="button button-positive button-sm" @click="selected_state = 'Curious'">Curious</button>  
                <button class="button button-positive button-sm" @click="selected_state = 'Delighted'">Delighted/Excited</button> 

                <button class="button button-negative button-sm" @click="selected_state = 'Bored'">Bored</button> 
                <button class="button button-negative button-sm" @click="selected_state = 'Confused'">Confused</button>  
                <button class="button button-negative button-sm" @click="selected_state = 'Frustrated'">Frustrated</button> 
                <button class="button button-negative button-sm" @click="selected_state = 'Surprised'">Surprised</button> 
                <button class="button button-negative button-sm" @click="selected_state = 'Anxious'">Anxious</button> 
            </div>

            <div class="container-fluid border col-lg-6">
                <h5 class="mt-2">Subject of reflection</h5>
                <button class="button button-subject button-sm" @click="selected_subject = 'Workbook'">Workbook tasks</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Remote work'">Remote working</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'Hardware'">Hardware</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'UI'">User Interface</button> 
                <button class="button button-subject button-sm" @click="selected_subject = 'LA'">Learning Analytics feedback</button> 
               
                <button v-if="getExperiment == 'spinner' && getCourse == 'cie3'" class="button button-subject button-sm" @click="selected_subject = 'spinner-cie3-1-2'">Task spinner-cie3-1-2</button> 
                <button v-if="getExperiment == 'spinner' && getCourse == 'cie3'" class="button button-subject button-sm" @click="selected_subject = 'spinner-cie3-3'">Task spinner-cie3-3</button> 
                <button v-if="getExperiment == 'spinner' && getCourse == 'cie3'" class="button button-subject button-sm" @click="selected_subject = 'spinner-cie3-4'">Task spinner-cie3-4</button> 
            
                <button v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" class="button button-subject button-sm" @click="selected_subject = 'pendulum-engdes1-1'">Task pendulum-engdes1-1</button> 
                <button v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" class="button button-subject button-sm" @click="selected_subject = 'pendulum-engdes1-2'">Task pendulum-engdes1-2</button> 
                
                <button class="button button-subject button-sm" @click="selected_subject = 'Other'">Other</button> 

            </div>
        </div>

        <div class="row justify-content-center">
            <div class="state-input col-lg-5" @click="selected_state = null">{{ selected_state }}</div>
            <span class="col-sm-1 mt-4"> about </span>
            <input v-if="selected_subject == 'Other'" class="input col-lg-5" v-model="user_input" />
            <div v-else class="subject-input col-lg-5" @click="selected_subject = null">{{ selected_subject }}</div>
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
                user_input: '',
                thanks: false
          }
      },
      mounted(){
        
      },
      computed: {
        ...mapGetters([
            'getExperiment',
            'getCourse'
        ]),
        getSubmitAllowed(){
            if(this.selected_state != null && this.selected_subject != null){
                if(this.selected_subject == 'Other' && this.user_input == ''){
                    return false;
                } else {
                    return true;
                }
                
            } else{
                return false;
            }
        }
      },
      methods: {
        ...mapActions([
            'feedback',
            'log'
        ]),
        submit(){
            if(this.selected_subject == 'Other'){
                this.feedback({"state": this.selected_state, "subject": this.selected_subject, "input": this.user_input});
            } else{
                this.feedback({"state": this.selected_state, "subject": this.selected_subject});
            }
            
            this.thanks = true;
            setTimeout(() => {
                this.thanks = false
            }, 10000);
            this.selected_state = null;
            this.selected_subject = null;
            this.user_input = '';
        },
        logInteraction(){
            //console.log('mouse entering analytics feedback')
            this.log({log:"analytics-interaction", type: "mouseenter", component: "affective-feedback"})
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