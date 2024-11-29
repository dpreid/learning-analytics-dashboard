//Store for chat features


const analyticsStore = {
    state: () => ({
         la_auth: '',
         logging_host: '',
         taskcompare_host: '',
       }),
       mutations:{
         SET_LOGGING_AUTH(state, auth){
            state.la_auth = auth;
         },
         SET_LOGGING_HOST(state, host){
            state.logging_host = host;
         },
         SET_TASKCOMPARE_HOST(state, host){
            state.taskcompare_host = host;
         },
         
         

       },
       actions:{
         setLoggingAuth(context, auth){
            context.commit('SET_LOGGING_AUTH', auth);
         },
         setLoggingHost(context, host){
            context.commit('SET_LOGGING_HOST', host);
         },
         setTaskCompareHost(context, host){
            context.commit('SET_TASKCOMPARE_HOST', host);
         },
         


       },
       getters:{
         getLoggingAuth(state){
            return state.la_auth;
         },
         getLoggingHost(state){
            return state.logging_host;
         },
         getTaskCompareHost(state){
            return state.taskcompare_host;
         }
         
         
         
       },  
  
  }

  export default analyticsStore;
