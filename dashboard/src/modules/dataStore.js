

const dataStore = {
    state: () => ({
        nodes: [],      //graph nodes to display
        edges: [],      //student graph edges
        compare_edges: [],  //comparison graph edges
        tasks: {},        //response from a task completion request
        indicators: {},

       }),
       mutations:{
            SET_NODES(state, nodes){
                state.nodes = nodes;
            },
            SET_EDGES(state, edges){
                state.edges = edges;
            },
            SET_COMPARE_EDGES(state, edges){
                state.compare_edges = edges;
            },
            SET_TASKS(state, tasks){
                state.tasks = tasks;
            },
            SET_INDICATORS(state, indicators){
                state.indicators = indicators;
            },

       },
       actions:{
            setNodes(context, nodes){
                context.commit('SET_NODES', nodes);
            },
            setEdges(context, edges){
                context.commit('SET_EDGES', edges);
            },
            setCompareEdges(context, edges){
                context.commit('SET_COMPARE_EDGES', edges);
            },
            setTasks(context, tasks){
                context.commit('SET_TASKS', tasks);
            },
            setIndicators(context, indicators){
                context.commit('SET_INDICATORS', indicators);
            },


       },
       getters:{
           getNodes(state){
            return state.nodes;
           },
           getEdges(state){
            return state.edges;
           },
           getCompareEdges(state){
            return state.compare_edges;
           },
           getTasks(state){
            return state.tasks;
           },
           getIndicators(state){
            return state.indicators;
           }
          
       },  
  
  }

  export default dataStore;
