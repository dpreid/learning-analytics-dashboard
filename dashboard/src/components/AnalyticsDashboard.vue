<template>
<div>
    <div class='row'>
        <div class="col-sm-6">
            <send-message />
        </div>
        <div class="col-sm-6">
            <receive-message :message="response"/>
        </div>
    </div>

    <div class='row'>
        <div class="col-sm-6">
            <mock-logging />
        </div>
        <div class='col-sm-6'>
            <task-completion :result="taskdistance" />
        </div>
    </div>
    <div class='row'>
        <div class="col-sm-6">
            <graph-display :nodes="nodes" :edges="edges"/>
        </div>
    </div>

</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import SendMessage from "./SendMessage.vue";
import ReceiveMessage from "./ReceiveMessage.vue";
import MockLogging from "./MockLogging.vue";
import GraphDisplay from "./GraphDisplay.vue"
import TaskCompletion from "./TaskCompletion.vue"

export default {
    name: 'AnalyticsDashboard',
    props: {
        url: String,   
    },
    components: {
        SendMessage,
        ReceiveMessage,
        MockLogging,
        GraphDisplay,
        TaskCompletion
  },
    data () {
        return {
            logSocket: null,
            response: null,
            nodes: [],
            edges: [],
            taskdistance: null,
        }
    },
    mounted(){
        this.connect(); //TESTING
        
    },
    watch:{
        url(){
			try{
				if(this.url != '' && this.getLogURLObtained){
					this.connect();								
				} else{
					console.log('disconnecting: ' + this.url);
				}
			} catch(e){
				console.log(e);
			}
		},
        
    },
    computed:{
        ...mapGetters([
            'getLogURLObtained',
            'getLogConsent',
            'getSessionExpired',
            
        ]),

    },
    methods:{
        ...mapActions([
            
        ]),
        
        connect(){
            let _store = this.$store;

			//this.logSocket = new WebSocket(this.url);
            this.logSocket = new WebSocket('ws://127.0.0.1:8000');  //TESTING
			_store.dispatch('setLogSocket', this.logSocket);
            
            this.logSocket.onopen = () => {
				console.log('log connection opened at ', this.url);
                
			};

            this.logSocket.onmessage = (event) => {
				try {
                    this.response = event.data;
                    let json_response = JSON.parse(this.response)

                    if(json_response.type == 'response'){
                        if(json_response.nodes){
                            this.nodes = json_response.nodes
                            this.edges = json_response.edges
                        }

                        if(json_response.taskdistance){
                            this.taskdistance = json_response.taskdistance
                        }
                    }
                    
                    
                    


                } catch {
                    console.log('No data to show');
                }
                

			};
        }
    }
}
</script>

<style>

</style>