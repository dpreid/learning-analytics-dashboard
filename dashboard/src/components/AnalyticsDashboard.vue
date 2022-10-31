<template>
<div>

    <div class='row'>
        <div class="col-lg-6">
            <graph-display id="student-network" title="Student Graph" graph_type="student_graph" :nodes="nodes" :edges="edges"/>
        </div>
        <div class="col-lg-6">
            <graph-display id="comparison-network" title="Comparison Graph" graph_type="variable_graph" :nodes="nodes" :edges="compare_edges"/>
        </div>
    </div>


    <div class='row mt-2'>
        <div class='col-sm-6'>
            <task-completion :response="tasks" />
        </div>
        
        
    </div>

    <div class='row'>
        <div class="col-sm-6">
            <mock-logging />
        </div>
        <div class="col-sm-6">
            <receive-message :message="response"/>
        </div>
        
    </div>
    

</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
//import RequestAnalytics from "./RequestAnalytics.vue";
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
        //RequestAnalytics,
        ReceiveMessage,
        MockLogging,
        GraphDisplay,
        TaskCompletion
  },
    data () {
        return {
            logSocket: null,
            response: null,
            nodes: [],      //graph nodes to display
            edges: [],      //student graph edges
            compare_edges: [],  //comparison graph edges
            tasks: {},        //response from a task completion request
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
            'request'
        ]),
        
        connect(){
            let _store = this.$store;

			//this.logSocket = new WebSocket(this.url);
            this.logSocket = new WebSocket('ws://127.0.0.1:8000');  //TESTING
			_store.dispatch('setLogSocket', this.logSocket);
            
            this.logSocket.onopen = () => {
				console.log('log connection opened at ', this.url);

                this.request('student_graph');                
			};

            this.logSocket.onmessage = (event) => {
				try {
                    this.response = event.data;
                    let json_response = JSON.parse(this.response)

                    if(json_response.type == 'response'){
                        if(json_response.content == 'student_graph'){
                            this.nodes = json_response.nodes
                            this.edges = json_response.edges
                        }

                        if(json_response.content == 'comparison_graph'){
                            this.nodes = json_response.nodes
                            this.compare_edges = json_response.edges
                        }

                        if("tasks" in json_response){
                            this.tasks = json_response.tasks
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