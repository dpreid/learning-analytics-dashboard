//Store for variables that are common amongst multiple UI components. 


const uiStore = {
    state: () => ({
      uuid: '',
       isDraggable: true,
       usesLocalStorage: false,        //can only use localStorage if the browser allows it.
       config_json: '', 
       darkTheme: document.body.classList.contains('dark-theme') ? true : false,
       course: 'none',
       hardware_options: [],
       selected_hardware: 'none',
       lh: ''
       }),
       mutations:{
         SET_DRAGGABLE(state, draggable){
            state.isDraggable = draggable;
         },
         SET_USES_LOCAL_STORAGE(state, set){
            state.usesLocalStorage = set;
         },
         SET_DARK_THEME(state, set){
            state.darkTheme = set;
         },
         SET_CONFIG_JSON(state, json){
            state.config_json = json;
         },
         SET_UUID(state, uuid){
            state.uuid = uuid;
        },
        SET_COURSE(state, course){
         state.course = course;
        },
        SET_HARDWARE_OPTIONS(state, hardware){
         state.hardware_options = hardware;
        },
        SET_SELECTED_HARDWARE(state, hardware){
         state.selected_hardware = hardware;
        },
        SET_LA_HOST(state, host){
         state.lh = host;
        }
         

       },
       actions:{
         setDraggable(context, draggable){
             context.commit('SET_DRAGGABLE', draggable);
         },
         setUsesLocalStorage(context, set){
            context.commit('SET_USES_LOCAL_STORAGE', set);
         },
         setDarkTheme(context, set){
            context.commit('SET_DARK_THEME', set);
         },
         setConfigJSON(context, json){
            context.commit('SET_CONFIG_JSON', json);
         },
         setUUID(context, uuid){
            context.commit('SET_UUID', uuid);
        },
        setCourse(context, course){
            context.commit('SET_COURSE', course);
        },
        setHardwareOptions(context, hardware){
         context.commit('SET_HARDWARE_OPTIONS', hardware);
        },
        setSelectedHardware(context, hardware){
         context.commit('SET_SELECTED_HARDWARE', hardware);
        },
        setLAHost(context, host){
         context.commit('SET_LA_HOST', host);
        }


       },
       getters:{
         getDraggable(state){
             return state.isDraggable;
         },
         getUsesLocalStorage(state){
            return state.usesLocalStorage;
         },
         getConfigJSON(state){
            return state.config_json;
         },
         getDarkTheme(state){
            return state.darkTheme;
         },
         getLogUUID(state){
            return state.uuid;
        },
        getCourse(state){
         return state.course;
        },
        getHardwareOptions(state){
         return state.hardware_options;
        },
        getSelectedHardware(state){
         return state.selected_hardware;
        },
        getLAHost(state){
         return state.lh;
        }
         
         
       },  
  
  }

  export default uiStore;
