<template>
    <div>
        <div class="row">
            <div class="col-sm-8 pt-3 ps-3">
                <h3 class="text-start">SRL Indicators</h3>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-success button-sm" @click="send">Request Data</button>
            </div>
            
            
        </div>
        

        <div class="row table" id='indicators-table' >

            <table>
                <thead class='table-head background-primary'>
                    <tr class='background-primary text-white'>
                        <th v-for='heading in headings' :key="heading" scope="col">{{ heading }}</th>
                    </tr>
                </thead>
                    <!-- EXPLORATION INDICATOR -->
                    <tr>
                        <td v-if="response['exploration']">exploration</td>
                        <td v-if="response['exploration']">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" :style="getProgress(response['exploration'], 100)"></div>
                            </div>
                        </td>
                        <td v-if="response['exploration']">{{ getComment(response['exploration']) }}</td>
                        <td><popup-help /></td>
                    </tr>

                    <!-- ADD IN OTHER INDICATORS WHEN AVAILABLE-->

            </table> 

        </div>
  
    </div>
  </template>
  
  <script>
  import {mapActions, mapGetters} from 'vuex'
  import PopupHelp from './elements/PopupHelp.vue'

  export default {
      name: "Indicators",
      components:{
          PopupHelp,
      },
      props: ['response'],
      data(){
          return{
              headings: ['Indicator', 'Relative Value', 'Comment', 'Help']
          }
      },
      mounted(){
          
      },
      computed:{
        ...mapGetters([
            // 'getExperiment'
        ]),
      },
      methods:{
          ...mapActions([
              'request'
          ]),
          getProgress(value, max){
            let width = value*100.0/max;
            return 'width: ' + width.toFixed(2) + '%';
        },
        getComment(value){
            if(value > 100){
                return 'You have explored well beyond expectations!'
            }
            else if(value > 75){
                return 'You have been trying out other hardware modes'
            }
            else if(value > 25){
                return 'You have followed the tasks quite closely'
            } else{
                return 'You probably haven\'t completed the tasks yet'
            }
            
        },
        send(){
            this.request({"content": 'indicators'});
        }
          
          
      }
  }
  </script>
  
  <style>
  
  
  </style>