import { createStore } from 'vuex'
import uiStore from './modules/uiStore.js'
import streamStore from './modules/streamStore.js'
import logging from './modules/logging.js'
import dataStore from './modules/dataStore.js'

const store = createStore({
    modules:{
        ui: uiStore,
        stream: streamStore,
        logging: logging,
        data: dataStore
    }
})

export default store;