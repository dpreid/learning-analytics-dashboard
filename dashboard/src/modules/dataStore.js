

const dataStore = {
    state: () => ({
        nodes: [],      //graph nodes to display
        node_info: {},
        edges: [],      //student graph edges
        compare_edges: [],  //comparison graph edges
        compare_node_info: {},
        tasks: {},        //response from a task completion request
        indicators: {},
        centroids: {},
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
            SET_CENTROIDS(state, centroids){
                state.centroids = centroids;
            },
            SET_NODE_INFO(state, info){
                state.node_info = info;
            },
            SET_COMPARE_NODE_INFO(state, info){
                state.compare_node_info = info;
            }

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
            setCentroids(context, centroids){
                context.commit('SET_CENTROIDS', centroids);
            },
            setNodeInfo(context, info){
                context.commit('SET_NODE_INFO', info);
            },
            setCompareNodeInfo(context, info){
                context.commit('SET_COMPARE_NODE_INFO', info);
            }


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
           },
           getCentroids(state){
            return state.centroids;
           },
           getNodeInfo(state){
            return state.node_info;
           },
           getCompareNodeInfo(state){
            return state.compare_node_info;
           }
          
       },  
  
  }

  export default dataStore;
