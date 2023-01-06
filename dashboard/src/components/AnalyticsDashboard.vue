<template>
<div>

    <div class='row'>
        <div class="col-lg-6">
            <graph-display id="student-network" title="Your Graph" graph_type="student_graph" :nodes="getNodes" :edges="getEdges" :node_info="getNodeInfo"/>
        </div>
        <div class="col-lg-6">
            <graph-display id="comparison-network" title="Example Graph" graph_type="comparison_graph" :nodes="getNodes" :edges="getCompareEdges" :node_info="getCompareNodeInfo"/>
        </div>
    </div>

    <div class='row'>
        <div class='col-lg-12'>
            <task-feedback :tasks="getFeedback" />
        </div>
    </div>


    <div class='row'>
        <div class='col-lg-6'>
            <task-completion :response="getTasks" />
        </div>
        <div class='col-lg-6'>
            <indicators :response="getIndicators" />
        </div>
    </div>

    <div class='row'>
        <div class='col-lg-6'>
            <affective-feedback />
        </div>
        <div class='col-lg-6'>
            <centroid-display id='centroid' :centroids='getCentroids' />
        </div>
    </div>

    <div class='row'>
        <div class='col-lg-6'>
            <!-- <self-evaluation-feedback /> -->
        </div>
        <div class='col-lg-6'>
            <!-- <planning-feedback /> -->
        </div>
    </div>


    <div class='row'>
        <div class="col-lg-6">
            <mock-logging />
        </div>
        <div class="col-lg-6">
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
import Indicators from './Indicators.vue';
import AffectiveFeedback from './AffectiveFeedback.vue';
//import SelfEvaluationFeedback from './SelfEvaluationFeedback.vue';
//import PlanningFeedback from './PlanningFeedback.vue';
import CentroidDisplay from './CentroidDisplay.vue';
import TaskFeedback from './TaskFeedback.vue';

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
        TaskCompletion,
        Indicators,
        AffectiveFeedback,
        //SelfEvaluationFeedback,
        //PlanningFeedback,
        CentroidDisplay,
        TaskFeedback
  },
    data () {
        return {
            logSocket: null,
            response: null,
            // nodes: [],      //graph nodes to display
            // edges: [],      //student graph edges
            // compare_edges: [],  //comparison graph edges
            // tasks: {},        //response from a task completion request
            // indicators: {},
            //coords: [1,1]
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
            'getNodes',
            'getEdges',
            'getCompareEdges',
            'getTasks',
            'getIndicators',
            'getCentroids',
            'getNodeInfo',
            'getCompareNodeInfo',
            'getExperiment',
            'getFeedback'
            
        ]),

    },
    methods:{
        ...mapActions([
            'request',
            'requestAll'
        ]),
        
        connect(){
            let _store = this.$store;
            let _this = this;
			//this.logSocket = new WebSocket(this.url);
            this.logSocket = new WebSocket('ws://127.0.0.1:8000');  //TESTING
            //this.logSocket = new WebSocket('wss://77a0-2a00-23c8-a417-4a01-9ac7-c293-d47-bdc4.ngrok.io');  //TESTING
            //this.logSocket = new WebSocket('wss://dc0f-2a00-23c8-a417-4a01-39bc-5e41-de06-20a6.eu.ngrok.io');  //TESTING
            
			_store.dispatch('setLogSocket', this.logSocket);
            
            this.logSocket.onopen = () => {
				console.log('log connection opened at ', this.url);
                
                // REQUEST student data automatically
                this.requestAll();
                // this.request({"content": 'student_graph'});    
                // this.request({"content": 'task_identification'});  
                // this.request({"content": 'indicators'}); 
                // if(_this.getExperiment == 'spinner'){
                //     this.request({"content": 'comparison_graph', "graph": 'spinner-cie3-all'}); 
                // } else{
                //     this.request({"content": 'comparison_graph', "graph": 'pendulum-engdes1-1'}); 
                // }
                  
                // this.request({"content": 'centroids'});        
			};

            this.logSocket.onmessage = (event) => {
				try {
                    this.response = event.data;
                    let json_response = JSON.parse(this.response)

                    if(json_response.type == 'response'){
                        if(json_response.content == 'student_graph'){
                            
                            _this.$store.dispatch('setNodes', json_response.nodes);
                            _this.$store.dispatch('setEdges', json_response.edges);
                            _this.$store.dispatch('setNodeInfo', json_response.node_info);
                        }

                        else if(json_response.content == 'comparison_graph'){
                            
                            _this.$store.dispatch('setNodes', json_response.nodes);
                            _this.$store.dispatch('setCompareEdges', json_response.edges);
                            _this.$store.dispatch('setCompareNodeInfo', json_response.node_info);
                        }

                        else if(json_response.content == 'task_identification'){
                            
                            _this.$store.dispatch('setTasks', json_response.tasks);
                        }
                        else if(json_response.content == 'indicators'){
                            
                            _this.$store.dispatch('setIndicators', json_response.indicators);
                        }
                        else if(json_response.content == 'centroids'){
                            
                            _this.$store.dispatch('setCentroids', json_response.centroids);
                        } 
                        else if(json_response.content == 'task_feedback'){

                            _this.$store.dispatch('setFeedback', json_response.feedback);
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