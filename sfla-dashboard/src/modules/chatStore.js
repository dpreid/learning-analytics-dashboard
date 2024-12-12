//Store for chat features


const chatStore = {
    state: () => ({
         isChatOn: true,
         messages: [{sender:'admin', time: Date.now(), text: 'Messages from the hardware, admin team and collaborators will appear here'}],
         chat_host: ''
       }),
       mutations:{
         ADD_MESSAGE(state, message){
            state.messages.push(message);
         },
         SET_CHAT_HOST(state, host){
            state.chat_host = host;
         },
         

       },
       actions:{
         addMessage(context, message){
            context.commit('ADD_MESSAGE', message);
         },
         setChatHost(context, host){
            context.commit('SET_CHAT_HOST', host);
         },


       },
       getters:{
         getIsChatOn(state){
            return state.isChatOn;
         },
         getMessages(state){
            return state.messages;
         },
         getNumMessages(state){
            return state.messages.length;
         },
         getChatHost(state){
            return state.chat_host;
         },
         
         
       },  
  
  }

  export default chatStore;
