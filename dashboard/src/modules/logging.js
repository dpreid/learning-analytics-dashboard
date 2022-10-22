

const loggingStore = {
    state: () => ({
        logSocket: null,
        uuid: 'david',                      //SET HERE FOR TESTING
        logging_consent_given: true,        //SET HERE FOR TESTING
        hardware: 'spinner'

       }),
       mutations:{
            SET_LOG_SOCKET(state, socket){
                state.logSocket = socket;
            },
            SET_LOGGING_CONSENT(state, consent){
                state.logging_consent_given = consent;
            },
            SET_UUID(state, uuid){
                state.uuid = uuid;
            },
            SET_HARDWARE(state, hardware){
                state.hardware = hardware;
            },
            LOG(state, payload){
                //only log to server if user has given consent.
                //Still may require logging internally for achievements etc.
                if(state.logging_consent_given && state.logSocket != null){
                    console.log('logged')
                    state.logSocket.send(JSON.stringify({
                        user: state.uuid,
                        t: Date.now(),          
                        exp: state.hardware, 
                        type: "log",       
                        payload: payload
                    }));
                }
                
                
            },  
            REQUEST(state){
                if(state.logging_consent_given && state.logSocket != null){
                    state.logSocket.send(JSON.stringify({
                        user: state.uuid,
                        t: Date.now(),          
                        exp: state.hardware,    
                        type: "request",    
                    }));
                }
            }, 
            FEEDBACK(state, payload){
                if(state.logging_consent_given && state.logSocket != null){
                    state.logSocket.send(JSON.stringify({
                        user: state.uuid,
                        t: Date.now(),          
                        exp: state.hardware, 
                        type: "feedback",       
                        payload: payload
                    }));
                }
                
                
            },

       },
       actions:{
            setLogSocket(context, socket){
                context.commit('SET_LOG_SOCKET', socket);
            },
            setLoggingConsent(context, consent){
                context.commit('SET_LOGGING_CONSENT', consent);
            },
            setUUID(context, uuid){
                context.commit('SET_UUID', uuid);
            },
            setHardware(context, hardware){
                context.commit('SET_HARDWARE', hardware);
            },
            log(context, payload){
                //context.commit('LOG_PARAMETERS', payload.data);
                context.commit('LOG', payload);
            },
            request(context){
                context.commit('REQUEST');
            },
            feedback(context, payload){
                context.commit('FEEDBACK', payload);
            }

       },
       getters:{
           getLogSocket(state){
                return state.logSocket;
           },
           getLogConsent(state){
            return state.logging_consent_given;
            },
            getLogUUID(state){
                return state.uuid;
            },
          
       },  
  
  }

  export default loggingStore;
