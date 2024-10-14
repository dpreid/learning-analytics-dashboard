import { createStore } from 'vuex'
import uiStore from './modules/uiStore.js'
import chatStore from './modules/chatStore.js'

const store = createStore({
    modules:{
        ui: uiStore,
        chat: chatStore
    }
})

export default store;