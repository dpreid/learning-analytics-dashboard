//TEMPORARY component for mocking logging from the remote lab UI

<template>
    <div>
  
      <h1>Log</h1>
      <input type="text" class="form-control" id="send_message" v-model="message">
      <button id="send_button" @click="send">Submit</button>
      <button id="clear_button" @click="clear">Clear</button>
  
    </div>
  </template>
  
  <script>
  import {mapActions} from 'vuex'
  
  export default {
      name: "MockLogging",
      components:{
          
      },
      data(){
          return{
              message: ''
          }
      },
      mounted(){
          
      },
      computed:{
  
      },
      methods:{
          ...mapActions([
              'mockLogAnalytics'
          ]),
          send(){
              this.mockLogAnalytics(JSON.parse(this.message));
          },
          clear(){
              this.message = ''
          }
      }
  }
  </script>
  
  <style>
  
  </style>