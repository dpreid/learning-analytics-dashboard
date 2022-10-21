<template>
    <div>
  
      <h1>Task COmpletion</h1>
      <p>{{ result }}</p>>
  
    </div>
  </template>
  
  <script>
  import {mapActions} from 'vuex'
  
  export default {
      name: "TaskCompletion",
      components:{
          
      },
      props: ['result'],
      data(){
          return{
              
          }
      },
      mounted(){
          
      },
      computed:{
  
      },
      methods:{
          ...mapActions([
              
          ]),
          
      }
  }
  </script>
  
  <style>
  
  </style>