import { createStore } from 'vuex'
import uiStore from './modules/uiStore.js'


const store = createStore({
    modules:{
        ui: uiStore,
    }
})

export default store;