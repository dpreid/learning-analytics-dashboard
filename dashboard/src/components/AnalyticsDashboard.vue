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

<!-- Below components are for testing purposes only - remove for production -->
    <div class='row'>
        <div class="col-lg-6">
            <mock-logging />
            <auto-logging />
        </div>
        <div class="col-lg-6">
            <receive-message :message="response"/>
        </div>
        
    </div>
    

</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import ReceiveMessage from "./ReceiveMessage.vue";      //only for testing
import MockLogging from "./MockLogging.vue";            //only for testing
import AutoLogging from './test/AutoLogging.vue';       //only for testing

import GraphDisplay from "./GraphDisplay.vue"
import TaskCompletion from "./TaskCompletion.vue"
import Indicators from './Indicators.vue';
import AffectiveFeedback from './AffectiveFeedback.vue';
import CentroidDisplay from './CentroidDisplay.vue';
import TaskFeedback from './TaskFeedback.vue';


export default {
    name: 'AnalyticsDashboard',
    props: {
        url: String,   
    },
    components: {
        ReceiveMessage, //TESTING - remove in production
        MockLogging,    //TESTING - remove in production
        AutoLogging,        //TESTING - remove in production

        GraphDisplay,
        TaskCompletion,
        Indicators,
        AffectiveFeedback,
        CentroidDisplay,
        TaskFeedback,
        
  },
    data () {
        return {
            logSocket: null,
            response: null,
        }
    },
    mounted(){
        //this.connect(); //TESTING
        
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
			this.logSocket = new WebSocket(this.url);
            
			_store.dispatch('setLogSocket', this.logSocket);
            
            this.logSocket.onopen = () => {
				console.log('log connection opened at ', this.url);
                
                // REQUEST student data automatically
                this.requestAll();       
			};

            this.logSocket.onmessage = (event) => {
				try {
                    this.response = event.data;
                    let json_response = JSON.parse(this.response)

                    if(json_response.type == 'response'){
                        console.log(json_response)
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