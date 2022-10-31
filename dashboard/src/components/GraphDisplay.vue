<template>
    <div >
        <div class="row">
            <h2>{{ title }}</h2>
        </div>

        <div class='mynetwork' :id="id"></div>

        <div v-if="graph_type == 'variable_graph'" class="row">
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
 
    // initialize global variables.
    var edges;
    var nodes;
    var network; 
    var container;
    var options, data;

    
    // This method is responsible for drawing the graph, returns the drawn network
    function drawGraph(id, n_list, e_list) {
        container = document.getElementById(id);
        // parsing and collecting nodes and edges from the python
        if(n_list.length > 0){
            //nodes= new DataSet(n_list)
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
          
      },
      props:['id', 'title', 'graph_type', 'nodes', 'edges'],
      data(){
          return{
              selected: 'student_graph',      //defaults to requesting the student graph
          }
      },    
      mounted(){
        drawGraph(this.id, this.nodes, this.edges);
      },
      computed:{
            ...mapGetters([
                'getExperiment'
            ])
      },
      watch:{
        edges(edges){
            drawGraph(this.id, this.nodes, edges);
        }
      },
      methods:{
        ...mapActions([
            'request'
        ]),
        send(){
            this.request(this.selected);
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