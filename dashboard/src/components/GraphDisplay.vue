<template>
    <div >
        <div v-if="graph_type == 'student_graph'" class="row">
            <div class="col-lg-3"> </div>
            <div class="col-lg-6"> 
                <h2 >{{ title }}</h2>
            </div>
            <div class="col-lg-3"> 
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Your Graph</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This graph displays all the times you have run the hardware. Vertices represent the different hardware modes and edges 
                        between the vertices tell you the number of times that hardware transition has been made. 
                    </template>
                </popup-help>
            </div>
            
            
            
        </div>
        <div v-else class="row">
            <div class="col-lg-3"> </div>
            <div class="col-lg-6"> 
                <h2 >{{ title }}: {{ selected }}</h2>
            </div>
            <div class="col-lg-3"> 
                <popup-help>
                    <template v-slot:popup-help-header id='p-h-header'>Example Graph</template>
                    <template v-slot:popup-help-body id='p-h-header'>
                        This shows an example of a possible graph for completing individual tasks and for the full coursework. It is not expected that you would
                        match this, but it gives a suggestion of the different modes necessary to complete tasks. Use the dropdown and request graph button at the bottom to display a different 
                        example graph.
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
                        <option v-if="getExperiment == 'spinner'" value="spinner-all">Full procedure</option>
                        <option v-if="getExperiment == 'spinner'" value="spinner-1-2">Task 1+2</option>
                        <option v-if="getExperiment == 'spinner'" value="spinner-3">Task 3</option>
                        <option v-if="getExperiment == 'spinner'" value="spinner-4">Task 4</option>
                    </select> 
                </div>
            </div>
            <div class="col-lg-6">
                <button class='btn button-sm btn-success' id="request_button" @click="send">Request Graph</button>
            </div>
            
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
    function drawGraph(id, n_list, e_list, node_titles) {
        container = document.getElementById(id);

        // force edge width to 1 for each edge
        e_list.forEach(edge => {
            edge.width = 1
        });

        // parsing and collecting nodes and edges from the python
        if(n_list.length > 0){
            //nodes= new DataSet(n_list)
            nodes = new DataSet([{"id": "voltage_step", "label": "voltage_step", "physics": false, "shape": "dot", "x": 100, "y": -173.20508075688772, 'title': node_titles['voltage_step']}, {"id": "position_step", "label": "position_step", "physics": false, "shape": "dot", "x": 200, "y": 0, 'title': node_titles['position_step']}, {"id": "position_ramp", "label": "position_ramp", "physics": false, "shape": "dot", "x": -200, "y": 0, 'title': node_titles['position_ramp']}, {"id": "voltage_ramp", "label": "voltage_ramp", "physics": false, "shape": "dot", "x": -100, "y": -173.20508075688772, 'title': node_titles['voltage_ramp']}, {"id": "speed_step", "label": "speed_step", "physics": false, "shape": "dot", "x": 100, "y": 173.20508075688772, 'title': node_titles['speed_step']}, {"id": "speed_ramp", "label": "speed_ramp", "physics": false, "shape": "dot", "x": -100, "y": 173.20508075688772, 'title': node_titles['speed_ramp']}]);
            edges = new DataSet(e_list)
        } else{
            nodes = new DataSet([{"id": "voltage_step", "label": "voltage_step", "physics": false, "shape": "dot", "x": 100, "y": -173.20508075688772}, {"id": "position_step", "label": "position_step", "physics": false, "shape": "dot", "x": 200, "y": 0}, {"id": "position_ramp", "label": "position_ramp", "physics": false, "shape": "dot", "x": -200, "y": 0}, {"id": "voltage_ramp", "label": "voltage_ramp", "physics": false, "shape": "dot", "x": -100, "y": -173.20508075688772}, {"id": "speed_step", "label": "speed_step", "physics": false, "shape": "dot", "x": 100, "y": 173.20508075688772}, {"id": "speed_ramp", "label": "speed_ramp", "physics": false, "shape": "dot", "x": -100, "y": 173.20508075688772}]);
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
              selected: 'spinner-all',      //defaults to requesting the student graph
          }
      },    
      mounted(){
        drawGraph(this.id, this.nodes, this.edges);
      },
      computed:{
            ...mapGetters([
                'getExperiment'
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
            drawGraph(this.id, this.nodes, edges, this.getNodeTitles);
        }
      },
      methods:{
        ...mapActions([
            'request'
        ]),
        send(){
            if(this.graph_type == 'student_graph'){
                this.request({"content": this.graph_type});
            } else{
                this.request({"content": this.graph_type, "graph": this.selected});
            }
            
        },
          
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