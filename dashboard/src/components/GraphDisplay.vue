<template>
    <div class="border-dashed" @mouseenter="logInteraction">
        <div v-if="graph_type == 'student_graph'" class="row">
            <div class="col-lg-3"> </div>
            <div class="col-lg-6"> 
                <h2 >{{ title }}</h2>
            </div>
            <div class="col-lg-3"> 
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Your Graph</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This graph (network) is a concise visualisation of the procedure you have followed during your remote lab work.
                        The nodes of the graph represent the different commands you can send to the remote lab hardware.
                        Graph edges represent the order that commands have been sent and the number of times those commands have been used.
                        
                        The feedback provided on this dashboard is based upon a similarity between your graph and a range of comparison graphs.

                        <b>Please note: all analysis is experimental and your data is completely anonymous.</b>
                    </template>
                </popup-help>
            </div>
            
            
            
        </div>
        <div v-else class="row">
            <div class="col-lg-2"> </div>
            <div class="col-lg-8"> 
                <h2 >{{ title }}: {{ selected }}</h2>
            </div>
            <div class="col-lg-2"> 
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Example Graph</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        You can display different possible comparison graphs here. It is not expected that your graph will match any particular comparison graph in this list 
                        and it is not the aim of the practical work to get "close" to any particular graph. These are intended as demonstrations of possible procedures to complete tasks 
                        and to help you overcome any difficulties you are having with the practical tasks.  
                        
                        Use the dropdown menu and request graph button at the bottom to display a different example graph.
                    </template>
                </popup-help>
            </div>
            
            
            
        </div>

        <div class='mynetwork' :id="id"></div>

        <div v-if="graph_type == 'comparison_graph'" class="row">
            <div class="col-lg-6 mt-2">
                <div class='input-group'>
                    <span class='input-group-text' for="graph">Graph:  </span>
                    <select class='form-select form-select-sm' name="function" id="function" v-model="selected">
                        <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-all">Full procedure</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-1-2">Task 1+2</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-3">Task 3</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-4">Task 4</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'cie3'" value="spinner-cie3-mean-21-22">CIE3 2021-22 Mean</option>
                        <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-1-core">Lab 1 Core</option>
                        <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-1-ext">Lab 1 Extension</option>
                        <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-1-core-ext">Lab 1 Core + Ext.</option>
                        <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-2">Lab 2</option>
                        <option v-if="getExperiment == 'pendulum' && getCourse == 'engdes1'" value="pendulum-engdes1-all">All tasks</option>

                        <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-1-core">Lab 1 Core</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-1-ext">Lab 1 Extension</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-1-core-ext">Lab 1 Core + Ext.</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-2">Lab 2</option>
                        <option v-if="getExperiment == 'spinner' && getCourse == 'engdes1'" value="spinner-engdes1-all">All tasks</option>
                        
                    </select> 
                </div>
            </div>
            <div class="col-lg-6">
                <button class='btn button-sm btn-success' id="request_button" @click="send">Request Graph</button>
            </div>
            
        </div>

        <!-- Ensures that border around component reaches to below the graph-->
        <div v-else class="row">
            <div class="col-sm-12"></div>
        </div>
        
        
        

    </div>
    


</template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex';
  import { DataSet, Network } from 'vis-network/standalone'
  import PopupHelp from './elements/PopupHelp.vue'
 
    // initialize global variables.
    var edges;
    var nodes;
    var network; 
    var container;
    var options, data;

    
    // This method is responsible for drawing the graph, returns the drawn network
    function drawGraph(id, n_list, e_list, node_titles, getExperiment) {
        container = document.getElementById(id);

        // force edge width to 1 for each edge
        e_list.forEach(edge => {
            edge.width = 1
        });

        // parsing and collecting nodes and edges from the python
        if(n_list.length > 0){
            if(getExperiment == 'spinner'){
                nodes = new DataSet([{"id": "voltage_step", "label": "voltage_step", "physics": false, "shape": "dot", "x": 100, "y": -173.20508075688772, 'title': node_titles['voltage_step']}, {"id": "position_step", "label": "position_step", "physics": false, "shape": "dot", "x": 200, "y": 0, 'title': node_titles['position_step']}, {"id": "position_ramp", "label": "position_ramp", "physics": false, "shape": "dot", "x": -200, "y": 0, 'title': node_titles['position_ramp']}, {"id": "voltage_ramp", "label": "voltage_ramp", "physics": false, "shape": "dot", "x": -100, "y": -173.20508075688772, 'title': node_titles['voltage_ramp']}, {"id": "speed_step", "label": "speed_step", "physics": false, "shape": "dot", "x": 100, "y": 173.20508075688772, 'title': node_titles['speed_step']}, {"id": "speed_ramp", "label": "speed_ramp", "physics": false, "shape": "dot", "x": -100, "y": 173.20508075688772, 'title': node_titles['speed_ramp']}]);
                edges = new DataSet(e_list)
            } else if(getExperiment == 'pendulum'){
                nodes = new DataSet([{"id": "start", "label": "start", "physics": false, "shape": "dot", "x": 0, "y": -200, 'title': node_titles['start']}, {"id": "brake", "label": "brake", "physics": false, "shape": "dot", "x": 128, "y": -154, 'title': node_titles['brake']}, {"id": "free", "label": "free", "physics": false, "shape": "dot", "x": 196, "y": -34, 'title': node_titles['free']}, {"id": "load", "label": "load", "physics": false, "shape": "dot", "x": 174, "y": 100, 'title': node_titles['load']}, {"id": "sampling", "label": "sampling", "physics": false, "shape": "dot", "x": 68, "y": 188, 'title': node_titles['sampling']}, {"id": "drive_perc", "label": "drive_perc", "physics": false, "shape": "dot", "x": -68, "y": 188, 'title': node_titles['drive_perc']}, {"id": "brake_perc", "label": "brake_perc", "physics": false, "shape": "dot", "x": -174, "y": 100, 'title': node_titles['brake_perc']}, {"id": "measuring_tools", "label": "measuring_tools", "physics": false, "shape": "dot", "x": -196, "y": -34, 'title': node_titles['measuring_tools']}, {"id": "record", "label": "record", "physics": false, "shape": "dot", "x": -128, "y": -154, 'title': node_titles['record']}]);
                edges = new DataSet(e_list)
            } else{
                nodes = new DataSet([])
                edges = new DataSet([])
            }
            
        } else{
            if(getExperiment == 'spinner'){
                nodes = new DataSet([{"id": "voltage_step", "label": "voltage_step", "physics": false, "shape": "dot", "x": 100, "y": -173.20508075688772}, {"id": "position_step", "label": "position_step", "physics": false, "shape": "dot", "x": 200, "y": 0}, {"id": "position_ramp", "label": "position_ramp", "physics": false, "shape": "dot", "x": -200, "y": 0}, {"id": "voltage_ramp", "label": "voltage_ramp", "physics": false, "shape": "dot", "x": -100, "y": -173.20508075688772}, {"id": "speed_step", "label": "speed_step", "physics": false, "shape": "dot", "x": 100, "y": 173.20508075688772}, {"id": "speed_ramp", "label": "speed_ramp", "physics": false, "shape": "dot", "x": -100, "y": 173.20508075688772}]);
            } else if(getExperiment == 'pendulum'){
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
      props:['id', 'title', 'graph_type', 'nodes', 'edges', 'node_info'],
      data(){
          return{
              selected: 'pendulum-engdes1-1',      //defaults to requesting the student graph
          }
      },    
      mounted(){
        this.getCourse == 'cie3' ? this.selected = 'spinner-cie3-all' : this.selected = 'pendulum-engdes1-all';
        drawGraph(this.id, this.nodes, this.edges, [], this.getExperiment);
      },
      computed:{
            ...mapGetters([
                'getExperiment',
                'getCourse'
            ]),
            getNodeTitles(){
                if(this.node_info != undefined){
                    let info = {}
                    Object.keys(this.node_info['in_centrality']).forEach((key) => {
                        info[key] = 'centrality = ' + this.node_info['in_centrality'][key].toFixed(2)
                    })
                    return info

                } else{

                    return {}
                }
                
            }
      },
      watch:{
        edges(edges){
            drawGraph(this.id, this.nodes, edges, this.getNodeTitles, this.getExperiment);
        },
        
      },
      methods:{
        ...mapActions([
            'request',
            'log'
        ]),
        send(){
            if(this.graph_type == 'student_graph'){
                this.request({"content": this.graph_type});
            } else{
                this.request({"content": this.graph_type, "graph": this.selected});
            }
            
        },
        logInteraction(){
            //console.log('mouse entering graph display feedback')
            this.log({log:"analytics-interaction", type: "mouseenter", component: "graph"})
        }
          
      }
  }
  </script>
  
  <style scoped>
  .mynetwork {
            width: 100%;
            height: 50vh;
            background-color: #ffffff;
            border: 1px solid lightgray;
            position: relative;
            float: left;
        }
  </style>