<template>
    <div>
  
      <h1>Receive</h1>
      <p id="receive_message" >{{ message }}</p>
      
      <button id="clear_button" @click="clear">Clear</button>
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  
  export default {
      name: "ReceiveMessage",
      props:['message'],
      components:{
          
      },
      data(){
          return{
            
          }
      },
      mounted(){
        
      },
      computed:{
            ...mapGetters([
                
            ])
      },
      watch:{
        
      },
      methods:{
          ...mapActions([
              
          ]),
        //   clear(){
        //       this.message = ''
        //   }
      }
  }
  </script>
  
  <style>
  
  </style>