<template>
<div class="practable-component" >
        <div v-if="graph_type == 'student_graph'" class="row">
            <div class="d-flex flex-row justify-content-end align-items-center"> 
                
                    <h4 class="me-2 text-start flex-fill">Your {{ getSelectedHardware }} graph for {{ getCourse }}</h4>

                    <button type='button' class='button-toolbar button-primary me-2' id="request_student_button" aria-label='request student graph' @click="requestStudentGraph">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                    </button>

                    <popup-help class="me-2" id="popup-help-student-graph">
                        <template v-slot:header>
                            <h5> Student Graph Help </h5>
                        </template>
                        <template v-slot:body>
                            This graph (network) is a concise visualisation of the procedure you have followed during your remote lab work.
                                The nodes of the graph represent the different commands you can send to the remote lab hardware.
                                Graph edges represent the order that commands have been sent and the number of times those commands have been used.
                                
                                The feedback provided on this dashboard is based upon a similarity between your graph and a range of comparison graphs.

                                <b>Please note: all analysis is experimental and your data is completely anonymous.</b>
                        </template>
                    </popup-help>
            </div>
        </div>



        <div v-else-if="graph_type == 'comparison_graph'" class="row">
            <div class="d-flex flex-row justify-content-end align-items-center"> 

                <h4 class="me-2 text-start flex-fill">Comparison Graph</h4>

                <label for="task-select-dropdown">Select Task: </label>
                <div class="dropdown me-4">
                    <button class="button-sm button-dropdown dropdown-toggle" type="button" id="task-select-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        {{ selectedTask['readable_string'] }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="task-dropdown-menu">
                        <li v-for="task in task_list"><a class="dropdown-item" :id='task["code_string"] + "-mode-select"' :aria-label="task['readable_string']" @click="selectedTask = task; requestComparisonGraph()">{{ task['readable_string'] }}</a></li>
                    </ul>
                </div>
              
                <popup-help class="me-2" id="popup-help-comparison-graph">
                    <template v-slot:header>
                        <h5> Comparison Graph Help </h5>
                    </template>
                    <template v-slot:body>
                        You can display different possible comparison graphs here. It is not expected that your graph will match any particular comparison graph in this list 
                            and it is not the aim of the practical work to get "close" to any particular graph. These are intended as demonstrations of possible procedures to complete tasks 
                            and to help you overcome any difficulties you are having with the practical tasks.  
                            
                            Use the dropdown menu and request graph button at the bottom to display a different example graph.
                    </template>
                </popup-help>

            </div>

            <!-- <div class="d-flex flex-row justify-content-center align-items-center"> 
                
            </div> -->
            


            <!-- <div class="col-lg-2">
                <button class='button-toolbar button-primary' id="request_comparison_button" @click="requestComparisonGraph">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
                </button>
            </div> -->
            
            
        </div>



        <!-- Ensures that border around component reaches to below the graph-->
        <div v-else class="row">
            <div class="col-sm-12"></div>
        </div>

        <div class='mynetwork' :id="graph_id" @mousedown="setDraggable(false)" @mouseup="setDraggable(true)"></div>
</div>
</template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex';
  import { DataSet, Network } from 'vis-network/standalone'
  import PopupHelp from './elements/PopupHelp.vue';
  import axios from "axios";
 
    // initialize global variables.
    var edges;
    var nodes;
    var network; 
    var container;
    var options, data;

    // This method is responsible for drawing the graph, returns the drawn network
    function drawGraph(id, n_list, e_list, node_titles, hardware) {
        container = document.getElementById(id);

        // force edge width to 1 for each edge
        e_list.forEach(edge => {
            edge.width = 1
        });

        // parsing and collecting nodes and edges
        if(n_list.length > 0){
            if(hardware == 'spinner'){
                nodes = new DataSet([{"id": "voltage_step", "label": "voltage_step", "physics": false, "shape": "dot", "x": 100, "y": -173.20508075688772, 'title': node_titles['voltage_step']}, {"id": "position_step", "label": "position_step", "physics": false, "shape": "dot", "x": 200, "y": 0, 'title': node_titles['position_step']}, {"id": "position_ramp", "label": "position_ramp", "physics": false, "shape": "dot", "x": -200, "y": 0, 'title': node_titles['position_ramp']}, {"id": "voltage_ramp", "label": "voltage_ramp", "physics": false, "shape": "dot", "x": -100, "y": -173.20508075688772, 'title': node_titles['voltage_ramp']}, {"id": "speed_step", "label": "speed_step", "physics": false, "shape": "dot", "x": 100, "y": 173.20508075688772, 'title': node_titles['speed_step']}, {"id": "speed_ramp", "label": "speed_ramp", "physics": false, "shape": "dot", "x": -100, "y": 173.20508075688772, 'title': node_titles['speed_ramp']}]);
                edges = new DataSet(e_list)
            } else if(hardware == 'pendulum'){
                nodes = new DataSet([{"id": "start", "label": "start", "physics": false, "shape": "dot", "x": 0, "y": -200, 'title': node_titles['start']}, {"id": "brake", "label": "brake", "physics": false, "shape": "dot", "x": 128, "y": -154, 'title': node_titles['brake']}, {"id": "free", "label": "free", "physics": false, "shape": "dot", "x": 196, "y": -34, 'title': node_titles['free']}, {"id": "load", "label": "load", "physics": false, "shape": "dot", "x": 174, "y": 100, 'title': node_titles['load']}, {"id": "sampling", "label": "sampling", "physics": false, "shape": "dot", "x": 68, "y": 188, 'title': node_titles['sampling']}, {"id": "drive_perc", "label": "drive_perc", "physics": false, "shape": "dot", "x": -68, "y": 188, 'title': node_titles['drive_perc']}, {"id": "brake_perc", "label": "brake_perc", "physics": false, "shape": "dot", "x": -174, "y": 100, 'title': node_titles['brake_perc']}, {"id": "measuring_tools", "label": "measuring_tools", "physics": false, "shape": "dot", "x": -196, "y": -34, 'title': node_titles['measuring_tools']}, {"id": "record", "label": "record", "physics": false, "shape": "dot", "x": -128, "y": -154, 'title': node_titles['record']}]);
                edges = new DataSet(e_list)
            } else{
                nodes = new DataSet([])
                edges = new DataSet([])
            }
            
        } else{
            if(hardware == 'spinner'){
                nodes = new DataSet([{"id": "voltage_step", "label": "voltage_step", "physics": false, "shape": "dot", "x": 100, "y": -173.20508075688772}, {"id": "position_step", "label": "position_step", "physics": false, "shape": "dot", "x": 200, "y": 0}, {"id": "position_ramp", "label": "position_ramp", "physics": false, "shape": "dot", "x": -200, "y": 0}, {"id": "voltage_ramp", "label": "voltage_ramp", "physics": false, "shape": "dot", "x": -100, "y": -173.20508075688772}, {"id": "speed_step", "label": "speed_step", "physics": false, "shape": "dot", "x": 100, "y": 173.20508075688772}, {"id": "speed_ramp", "label": "speed_ramp", "physics": false, "shape": "dot", "x": -100, "y": 173.20508075688772}]);
            } else if(hardware == 'pendulum'){
                nodes = new DataSet([{"id": "start", "label": "start", "physics": false, "shape": "dot", "x": 0, "y": -200}, {"id": "brake", "label": "brake", "physics": false, "shape": "dot", "x": 128, "y": -154}, {"id": "free", "label": "free", "physics": false, "shape": "dot", "x": 196, "y": -34}, {"id": "load", "label": "load", "physics": false, "shape": "dot", "x": 174, "y": 100}, {"id": "sampling", "label": "sampling", "physics": false, "shape": "dot", "x": 68, "y": 188}, {"id": "drive_perc", "label": "drive_perc", "physics": false, "shape": "dot", "x": -68, "y": 188}, {"id": "brake_perc", "label": "brake_perc", "physics": false, "shape": "dot", "x": -174, "y": 100}, {"id": "measuring_tools", "label": "measuring_tools", "physics": false, "shape": "dot", "x": -196, "y": -34}, {"id": "record", "label": "record", "physics": false, "shape": "dot", "x": -128, "y": -154}]);
            } else{
                nodes = new DataSet([])
            }
            //edges = new DataSet([{"arrows": "to", "from": "voltage_step", "label": "1", "to": "voltage_step", "weight": 1.0}, {"arrows": "to", "from": "voltage_step", "label": "1", "to": "position_step", "weight": 1.0}, {"arrows": "to", "from": "position_step", "label": "2", "to": "position_step", "weight": 2.0}, {"arrows": "to", "from": "position_step", "label": "1", "to": "position_ramp", "weight": 1.0}, {"arrows": "to", "from": "position_ramp", "label": "3", "to": "position_ramp", "weight": 3.0}, {"arrows": "to", "from": "position_ramp", "label": "1", "to": "position_step", "weight": 1.0}]);
            edges = new DataSet([])
        }
        
        


        // adding nodes and edges to the graph
        data = {nodes: nodes, edges: edges};

        options = {"nodes": {"font": {"color": "rgba(0,0,0,1)"}, "size": 20}, "edges": {"color": {"inherit": true}, "smooth": {"forceDirection": "none", "roundness": 1}}, "interaction": {"navigationButtons": true}, "physics": {"minVelocity": 0.75}};
        // options = {
        //     "edges": {
        //         "color": {
        //         "inherit": true
        //         },
        //         "smooth": false
        //     },
        //     "physics": {
        //         "minVelocity": 0.75
        //     }
        // }
        network = new Network(container, data, options);
        
        return network;

    }

  export default {
      name: "GraphDisplay",
      components:{
          PopupHelp,
      },
      props:['graph_id', 'title', 'graph_type'],
      data(){
          return{
              selectedTask: '', 
              task_list: []
          }
      },  
      watch:{
        
      },  
      mounted(){
        //this.setSelectedTask();
        //drawGraph(this.graph_id, this.nodes, this.edges, [], this.getExperiment);
    
      },
      computed:{
            ...mapGetters([
                'getSelectedHardware',
                'getCourse',
                'getLogUUID',
                'getConfigJSON'
            ]),
      },
      watch:{
        getConfigJSON(){
            this.setSelectedTask(this.getSelectedHardware);
            this.setTaskList(this.getSelectedHardware);
            console.log(this.task_list)
        }
      },
      methods:{
        ...mapActions([
            'setDraggable'
        ]),
        setSelectedTask(hardware){
            console.log(this.getConfigJSON)
            this.selectedTask = this.getConfigJSON['parameters'][hardware]['tasks'][0];
        },
        requestStudentGraph(){
            let accessURL = `https://app.practable.io/ed-log-dev/analytics/taskcompare/api/v1/studentGraph?username=${this.getLogUUID}&course=${this.getCourse}&hardware=${this.getSelectedHardware}`
            axios
				.get(accessURL, {}, { headers: { Authorization: '' } })
				.then((response) => {
					console.log(response)
                    drawGraph(this.graph_id, response.data.nodes, response.data.edges, this.getNodeTitles(response.data.node_info), response.data.hardware)
				})
				.catch((err) => console.log(err));
        },
        requestComparisonGraph(){
            let accessURL = `https://app.practable.io/ed-log-dev/analytics/taskcompare/api/v1/comparisonGraph?taskcode=${this.selectedTask['code_string']}&username=${this.getLogUUID}&course=${this.getCourse}&hardware=${this.getSelectedHardware}`
            axios
				.get(accessURL, {}, { headers: { Authorization: '' } })
				.then((response) => {
					console.log(response)
                    drawGraph(this.graph_id, response.data.nodes, response.data.edges, this.getNodeTitles(response.data.node_info), response.data.hardware)
				})
				.catch((err) => console.log(err));
        },
        getNodeTitles(node_info){
            if(node_info != undefined){
                let info = {}
                Object.keys(node_info['in_centrality']).forEach((key) => {
                    info[key] = 'centrality = ' + node_info['in_centrality'][key].toFixed(2)
                })
                return info

            } else{

                return {}
            }
        },
        setTaskList(hardware){
            this.task_list = this.getConfigJSON['parameters'][hardware]['tasks'];
        }
        
        
      }
  }
  </script>
  
  <style scoped>
  .mynetwork {
            width: 100%;
            height: 50dvh;
            background-color: var(--background-color-highlight);
            position: relative;
            float: left;
        }
  </style>