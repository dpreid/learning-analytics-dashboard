<template>
    <div id='chat-widget'>
        <div id='message-container'>
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide='false'>
                <div class='toast-header'>
                    <strong class="me-auto">Feedback Bot Chat</strong>
                </div>
            </div>



            <div v-for='message, index in message_list' :key='index' :id='index' >
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide='false'>
                
                    <!-- Message header -->
                    <div :class='getHeaderClass(message.sender)'>
                        <!-- <img src="..." class="rounded me-2" alt="..."> -->
                        <strong class="me-auto">{{ message.sender }}</strong>
                        <small>{{ getFormattedTime(message.time) }}</small>
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> -->
                    </div>
                    <!-- Message body -->
                    <div :class="getMessageClass(message.sender)">
                        <strong>{{ message.text }}</strong>
                        <!-- <div id='response-buttons' class='col-12'>
                            <button class='btn btn-outline-primary' v-for='button in message.buttons' :key='button.title' @click='saveResponse(button.title)'>{{ button.title }}</button>
                        </div> -->
                    </div>

                </div>

            </div>

            <div v-if='awaiting_response' id="waiting-icon-container">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>

            <div id='bottom-container'></div>

        </div>

        <div class="input-group mt-3">
            <input type="text" class="form-control" v-model='user_input' @keydown.enter="sendMessage" placeholder="Enter message..." aria-label="message input" aria-describedby="user-input">
            <button class="button-toolbar button-primary" type="button" id="user-input-submit" @click="sendMessage">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
            </button>
        </div>
    
    </div>

</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: 'ChatWidget',
    props:{
        message_list: Array,
        message_count: Number,
    },
    emits:['onMessageSent', 'onMessageReceived'],
    data () {
        return {
            user_input: '',
            awaiting_response: false
        }
    },
    computed:{
        ...mapGetters([
            'getLogUUID',
            'getChatHost',
            'getCourse',
            'getSelectedHardware'
        ])
        
    },
    watch:{
        message_count(){
            let element = document.getElementById('bottom-container');
            element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    },
    methods:{
        sendMessage(){
            this.awaiting_response = true;
            //let message = {sender:this.getLogUUID, time: new Date().getTime(), text: this.user_input}
            let message = {
                "time": new Date().getTime(), 
                "level": "INFO",
                "type": "chat", 
                "actor":
                {
                    "id": this.getLogUUID,
                    "course": this.getCourse
                },
                "verb": 
                {
                    "name": "sent-message", 
                    // "definition": `${this.instance_path}${config.definitions_path}/clicked`
                }, 
                "object": 
                {
                    "name": "feedback-bot",
                    "text": this.user_input
                },
                "context": 
                {
                    "experiment": this.getSelectedhardware
                }
            };

            var accessURL = `${this.getChatHost}/chat?username=${this.getLogUUID}&bot_type=silly-bot`; 
            console.log(accessURL)
            axios
            .post(accessURL, 
                message, 
                { headers: 
                    { 
                    'Content-Type': 'application/json',
                    } 
            }).then((response) => {
                this.awaiting_response = false;
                this.$emit('onMessageReceived', response);
            })
            .catch((err) => {
                this.awaiting_response = false;
                console.log(err)
            });

            this.$emit('onMessageSent', message);
            this.user_input = '';            
                
        },
        getMessageClass(sender){
            if(sender == this.getLogUUID){
                return 'toast-body text-end';
            } else {
                return 'toast-body text-start'
            }
        },
        getHeaderClass(sender){
            if(sender == 'admin'){
                return 'toast-header header-admin'
            } else if(sender == 'hardware'){
                return 'toast-header header-hardware'
            } else if(sender == 'chatbot'){
                return 'toast-header header-chatbot'
            } 
            else {
                return 'toast-header header-standard'
            }
            
        },
        saveResponse(response){
            console.log(response);
        },
        getFormattedTime(time_ms){
            let date = new Date(time_ms);
            if(Date.now() - date.getTime() > 24*60*60*1000){
                return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            } else{
                return `${date.toLocaleTimeString()}`;
            }
            
            
        }
    }
}
</script>

<style scoped>

#message-container{
    overflow: scroll;
    max-height: 500px;
    background-color: var(--background-color-inverted);
}

#bottom-container{
    min-height:100px;
}

.header-admin{
    background-color: var(--background-color-warning);
    color: var(--text-color-inverted);
}

.header-chatbot{
    background-color: var(--background-color-warning);
    color: var(--text-color-inverted);
}

.header-hardware{
    background-color: var(--background-color-danger);
    color: var(--text-color-inverted);
}

.header-standard{
    background-color: var(--button-color-secondary);
    color: var(--text-color-inverted);
}


.lds-ellipsis,
.lds-ellipsis div {
  box-sizing: border-box;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33.33333px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-color-inverted);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 16px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 28px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(12px, 0);
  }
}


</style>