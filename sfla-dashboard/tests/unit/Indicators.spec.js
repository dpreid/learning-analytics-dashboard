import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Indicators from '../../src/components/Indicators.vue';
import { createStore } from 'vuex';



import uiStore from '../../src/modules/uiStore.js'


const createVuexStore = () => 

    createStore({
        modules:{
            ui: uiStore,
        }
    });

let config = {
  "name": "ed1", 
  "version": "1.0", 
  "date": 1720705810, 
  "aud": "https://app.practable.io/ed0/sfla-dashboard-default-2.0", 
  "images": [], 
  "parameters": {
    "spinner":{
      "tasks": [
        {"readable_string": "Lab 1 Core", "code_string": "spinner-ed1-1-core"},
        {"readable_string": "Lab 1 Extension", "code_string": "spinner-ed1-1-ext"},
        {"readable_string": "Lab 1 Core + Ext.", "code_string": "spinner-ed1-1-core-ext"},
        {"readable_string": "Lab 2", "code_string": "spinner-ed1-2"},
        {"readable_string": "All tasks", "code_string": "spinner-ed1-all"},
      ],
      "indicators": {
        "exploration": [
          {"comment": "You have explored well beyond expectations!", "value": 100},
          {"comment": "You have been trying out other hardware modes", "value": 75},
          {"comment": "You have followed the tasks quite closely", "value": 25},
          {"comment": "You probably haven\'t completed the main tasks yet", "value": 0}
        ],
      
      },
      "task_completion": [
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
        ]
      },
    "pendulum":{
      "tasks": [
        {"readable_string": "Lab 1 Core", "code_string": "pendulum-ed1-1-core"},
        {"readable_string": "Lab 1 Extension", "code_string": "pendulum-ed1-1-ext"},
        {"readable_string": "Lab 1 Core + Ext.", "code_string": "pendulum-ed1-1-core-ext"},
        {"readable_string": "Lab 2", "code_string": "pendulum-ed1-2"},
        {"readable_string": "All tasks", "code_string": "pendulum-ed1-all"},
      ],
      "indicators": {
        "exploration": [
          {"comment": "You have explored well beyond expectations!", "value": 100},
          {"comment": "You have been trying out other hardware modes", "value": 75},
          {"comment": "You have followed the tasks quite closely", "value": 25},
          {"comment": "You probably haven\'t completed the main tasks yet", "value": 0}
        ],
      
      },
      "task_completion": [
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
          {"comment": "", "value": 0},
        ]
      },
    }
  }
    
describe('Indicators.vue tests', () => {

  test('Exploration indicator display for value > 100', async () => {
    const store = createVuexStore();
    store.dispatch('setConfigJSON', config);
    store.dispatch('setSelectedHardware', 'spinner');
    const wrapper = mount(Indicators, {
      global:{
        plugins: [store]
      }
    });

    expect(wrapper.vm.getExplorationComment(102)).toEqual('You have explored well beyond expectations!');
  
  })

  test('Exploration indicator display for value > 75', async () => {
    const store = createVuexStore();
    store.dispatch('setConfigJSON', config);
    store.dispatch('setSelectedHardware', 'spinner');
    const wrapper = mount(Indicators, {
      global:{
        plugins: [store]
      }
    });

    expect(wrapper.vm.getExplorationComment(80)).toEqual('You have been trying out other hardware modes');
  
  })

  test('Exploration indicator display for value > 50', async () => {
    const store = createVuexStore();
    store.dispatch('setConfigJSON', config);
    store.dispatch('setSelectedHardware', 'spinner');
    const wrapper = mount(Indicators, {
      global:{
        plugins: [store]
      }
    });

    expect(wrapper.vm.getExplorationComment(65)).toEqual('You have followed the tasks quite closely');
  
  })


  test('Exploration indicator display for value > 25', async () => {
    const store = createVuexStore();
    store.dispatch('setConfigJSON', config);
    store.dispatch('setSelectedHardware', 'spinner');
    const wrapper = mount(Indicators, {
      global:{
        plugins: [store]
      }
    });

    expect(wrapper.vm.getExplorationComment(30)).toEqual('You have followed the tasks quite closely');
  
  })


  test('Exploration indicator display for value > 0', async () => {
    const store = createVuexStore();
    store.dispatch('setConfigJSON', config);
    store.dispatch('setSelectedHardware', 'spinner');
    const wrapper = mount(Indicators, {
      global:{
        plugins: [store]
      }
    });

    expect(wrapper.vm.getExplorationComment(2)).toEqual('You probably haven\'t completed the main tasks yet');
  
  })

 



  


  

})