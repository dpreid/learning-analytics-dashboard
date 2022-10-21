<template>
    
    <div id = "mynetwork"></div>


</template>
  
  <script>
  import {mapActions} from 'vuex'
  import { DataSet, Network } from 'vis-network/standalone'

    // initialize global variables.
    var edges;
    var nodes;
    var network; 
    var container;
    var options, data;

    
    // This method is responsible for drawing the graph, returns the drawn network
    function drawGraph(n_list, e_list) {
        container = document.getElementById('mynetwork');
        // parsing and collecting nodes and edges from the python
        if(n_list.length > 0){
            //nodes= new DataSet(n_list)
            edges = new DataSet(e_list)
        } else{
            nodes = new DataSet([{"id": "voltage_step", "label": "voltage_step", "physics": false, "shape": "dot", "size": 10, "x": 100, "y": -173.20508075688772}, {"id": "position_step", "label": "position_step", "physics": false, "shape": "dot", "size": 10, "x": 200, "y": 0}, {"id": "position_ramp", "label": "position_ramp", "physics": false, "shape": "dot", "size": 10, "x": -200, "y": 0}, {"id": "voltage_ramp", "label": "voltage_ramp", "physics": false, "shape": "dot", "size": 10, "x": -100, "y": -173.20508075688772}, {"id": "speed_step", "label": "speed_step", "physics": false, "shape": "dot", "size": 10, "x": 100, "y": 173.20508075688772}, {"id": "speed_ramp", "label": "speed_ramp", "physics": false, "shape": "dot", "size": 10, "x": -100, "y": 173.20508075688772}]);
            //edges = new DataSet([{"arrows": "to", "from": "voltage_step", "label": 1.0, "to": "voltage_step", "weight": 1.0}, {"arrows": "to", "from": "voltage_step", "label": 1.0, "to": "position_step", "weight": 1.0}, {"arrows": "to", "from": "position_step", "label": 2.0, "to": "position_step", "weight": 2.0}, {"arrows": "to", "from": "position_step", "label": 1.0, "to": "position_ramp", "weight": 1.0}, {"arrows": "to", "from": "position_ramp", "label": 3.0, "to": "position_ramp", "weight": 3.0}, {"arrows": "to", "from": "position_ramp", "label": 1.0, "to": "position_step", "weight": 1.0}]);
            edges = new DataSet([])
        }
        
        // adding nodes and edges to the graph
        data = {nodes: nodes, edges: edges};

        options = {"nodes": {"font": {"color": "rgba(0,0,0,1)"}}, "edges": {"color": {"inherit": true}, "smooth": {"forceDirection": "none", "roundness": 1}}, "physics": {"minVelocity": 0.75}};
        
        network = new Network(container, data, options);
        
        return network;

    }

  export default {
      name: "GraphDisplay",
      components:{
          
      },
      props:['nodes', 'edges'],
      data(){
          return{
              
          }
      },
      mounted(){
        drawGraph(this.nodes, this.edges);
      },
      computed:{
  
      },
      watch:{
        edges(edges){
            drawGraph(this.nodes, edges);
        }
      },
      methods:{
          ...mapActions([
              
          ]),
          
      }
  }
  </script>
  
  <style>
  #mynetwork {
            width: 800px;
            height: 800px;
            background-color: #ffffff;
            border: 1px solid lightgray;
            position: relative;
            float: left;
        }
  </style>