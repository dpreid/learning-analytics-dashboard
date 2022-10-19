//Store for variables that are common amongst multiple UI components. 


const uiStore = {
    state: () => ({
        isDraggable: true,
        consent_given: false,
        input_disabled: false,
       }),
       mutations:{
         SET_DRAGGABLE(state, draggable){
            state.isDraggable = draggable;
         },
         SET_CONSENT(state, consent){
            state.consent_given = consent;
         },

       },
       actions:{
         setDraggable(context, draggable){
             context.commit('SET_DRAGGABLE', draggable);
         },
         setConsent(context, consent){
            context.commit('SET_CONSENT', consent);
         },

       },
       getters:{
         getDraggable(state){
             return state.isDraggable;
         },
         getConsent(state){
            return state.consent_given;
         },
          
         
       },  
  
  }

  export default uiStore;
