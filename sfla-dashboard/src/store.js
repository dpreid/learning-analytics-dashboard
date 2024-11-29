import { createStore } from 'vuex'
import dataStore from './modules/dataStore.js'
import uiStore from './modules/uiStore.js'
import chatStore from './modules/chatStore.js'
import analyticsStore from './modules/analyticsStore.js'

const store = createStore({
    modules:{
        data: dataStore,
        ui: uiStore,
        chat: chatStore,
        analytics: analyticsStore
    }
})

export default store;