//TEST component for mocking logging automatically from the remote lab UI
// Can set a time interval for sending logs - can then see if dashboard updates with the correct logs
// Also test the server CPU and memory usage with top as the component is logging

<template>
    <div>
  
      <h1>Auto Logging</h1>
        <div class="row">
            <div class="col-6">
                <input type="text" class="form-control" id="user" v-model="user">
            </div>
            <div class="col-6">
                <input type="text" class="form-control" id="hardware" v-model="hardware1">
            </div>
            <div v-if='message_count == 1' class="col-6">
                <input type="text" class="form-control" id="send_message" v-model="message">
                <input type="number" class="form-control" id="interval" v-model="interval">
            </div>
            <div v-if='message_count == 2' class="col-6">
                <input type="text" class="form-control" id="send_message" v-model="message">
                <input type="text" class="form-control" id="send_message2" v-model="message2">
                <input type="number" class="form-control" id="interval" v-model="interval">
            </div>


            <div v-if='message_count == 1' class="col-6">
                <button id="start_button" @click="start">Start</button>
                <button id="stop_button" @click="stop">Stop</button>
                <p>{{ log_count }}</p>
            </div>
            <div v-if='message_count == 2' class="col-6">
                <button id="start_button" @click="start2">Start</button>
                <button id="stop_button" @click="stop2">Stop</button>
                <p>{{ log_count }}</p>
            </div>
        </div>
      
      

      
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  
  export default {
      name: "AutoLogging",
      components:{
          
      },
      data(){
          return{
            logSocket: null,
            user: 'david',
            message_count: 2,
              message: '',
              message2: '',
              interval: 1,      //seconds between logs
              id: '',
              id2: '',
              log_count: 0,
              hardware1: 'spin30',
              hardware2: 'spin31'
              
          }
      },
      mounted(){
          
      },
      computed:{
        ...mapGetters([
            'getLogSocket'
        ])
      },
      methods:{
          ...mapActions([
              
              'setHardware'
          ]),
          start(){
            this.logSocket = this.getLogSocket;
            let _this = this;
            this.log_count = 0;
            this.id = setInterval(() => {
                _this.log(JSON.parse(_this.message));
                _this.log_count += 1;
            }, _this.interval*1000);
              
          },
          start2(){
            this.logSocket = this.getLogSocket;
            let _this = this;
            this.log_count = 0;
            this.id = this.startLogging(this.user, this.message, this.interval, this.hardware1)
            setTimeout(() => this.id2 = this.startLogging(_this.user, _this.message2, _this.interval, _this.hardware1), _this.interval*500);
              
          },
          startLogging(user, message, interval, hardware){
            let _this = this;
            let id = setInterval(() => {
                _this.log(user, JSON.parse(message), hardware);
                _this.log_count += 1;
                
            }, interval*1000);

            return id;
          },
          stop(){
            clearInterval(this.id);
          },
          stop2(){
            clearInterval(this.id);
            clearInterval(this.id2);
          },
          log(user, message, hardware){
            this.logSocket.send(JSON.stringify({
                        user: user,
                        t: Date.now(),          
                        exp: 'spinner',
                        hardware: hardware,
                        course: 'engdes1',
                        type: "analytics",       
                        payload: message
                    }));
          }
      }
  }
  </script>
  
  <style>
  
  </style>