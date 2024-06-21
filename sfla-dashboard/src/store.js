import { createStore } from 'vuex'
import dataStore from './modules/dataStore.js'
import uiStore from './modules/uiStore.js'
import chatStore from './modules/chatStore.js'

const store = createStore({
    modules:{
        data: dataStore,
        ui: uiStore,
        chat: chatStore
    }
})

export default store;