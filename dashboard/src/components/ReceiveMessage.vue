<template>
    <div>
  
      <h1>Receive</h1>
      <input type="text" class="form-control" id="receive_message" v-model="message">
      
      <button id="clear_button" @click="clear">Clear</button>
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  
  export default {
      name: "ReceiveMessage",
      components:{
          
      },
      data(){
          return{
            logSocket: null,
            message: ''
          }
      },
      mounted(){
        this.connect();     //TESTING
      },
      computed:{
            ...mapGetters([
                'getLogURLObtained',
                'getLogSocket'
            ])
      },
      watch:{
        getLogURLObtained(is){
            if(is){
                this.connect();
            }
        }
      },
      methods:{
          ...mapActions([
              
          ]),
          connect(){
            console.log("ready to receive");
              this.logSocket = this.getLogSocket;
              console.log(this.logSocket)

              this.logSocket.onmessage = (event) => {
				try {
                    console.log("message received");
                    this.message = event.data;


                } catch {
                    console.log('No data to show');
                }
                

			};
          },
          clear(){
              this.message = ''
          }
      }
  }
  </script>
  
  <style>
  
  </style>