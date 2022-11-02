<template>
  
    <div class="m-2">
        <h2>SRL Reflection Space</h2>
        <div class="row">
            <div class="state-input col-sm-4 border" @click="selected_state = null">{{ selected_state }}</div>
            <p class="col-sm-2 mt-2">about</p>
            <div class="subject-input col-sm-4 border me-4" @click="selected_subject = null">{{ selected_subject }}</div>
            <button class="btn btn-success btn-sm col-sm-1" :disabled="!getSubmitAllowed" @click="submit">Submit</button>
        </div>

        <div class="row">
            <div class="container-fluid border mt-4 col-lg-6">
                <button class="button-regulation button-sm" @click="selected_state = 'Planning'">Planning</button> 
                
            </div>

            <div class="container-fluid border mt-4 col-lg-6">
                <button class="button-tertiary button-sm" @click="selected_subject = 'Tasks'">Tasks</button> 
                
            </div>
        </div>
        

    </div>



</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "RegulatoryFeedback",
      components:{
          
      },
      props: [],
      data(){
          return{
                selected_state: null,
                selected_subject: null
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
        }
      }
}
</script>

<style>
#state-input{
    display: inline-block;
    width: 25%;
}

#subject-input{
    display: inline-block;
    width: 25%;
}

.button-regulation{
    background-color: blueviolet;
}
</style>