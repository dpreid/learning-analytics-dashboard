<template>
<div id="app" class='container-fluid-sm m-0 background-white'>
    <navigation-bar @save="saveDataToLocalStorage"/>
    <streams />

    <analytics-dashboard :url="getLogURL"/>


</div>
</template>

<script>
import Streams from "./components/Streams.vue";
import AnalyticsDashboard from "./components/AnalyticsDashboard.vue"
import NavigationBar from "./components/NavigationBar.vue"
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    NavigationBar,
    Streams,
    AnalyticsDashboard
  },
  mounted(){
        this.loadFromLocalStorage();
  },
  computed:{
        ...mapGetters([
            'getLogURL',
            'getExperiment',
            'getLogConsent',
            'getSaved',
            'getTasks',
            'getIndicators'
        ])
  },
  methods:{
        ...mapActions([

        ]),
        hasStorage(){
            try {
                window.localStorage.setItem('test', 'storage');
                window.localStorage.removeItem('test');
                return true;
            } catch (exception) {
                return false;
            }
        },
        hasDataToLoad(exp){
            let item_name = exp + '-la-data';
            if(window.localStorage.getItem(item_name)){
                return true;
            } else{
                return false;
            }
        },
        loadFromLocalStorage(){
            let exp = this.getExperiment;
            if(this.hasStorage() && this.hasDataToLoad(exp)){

                this.loadData(exp);
                return true;

            } else{

                console.log('no local storage or data to load');
                return false;
            }
            
        },
        loadData(exp){
            if(window.localStorage.getItem(exp + '-la-data')){
                let data = window.localStorage.getItem(exp + '-la-data');
                data = JSON.parse(data);
                this.$store.dispatch('setSaved', data);
            }
        },
        saveDataToLocalStorage(){
            if(this.hasStorage() && this.getLogConsent){
                
                this.saveData();
                return true;
                
            } else{

                console.log('no localStorage allowed');
                return false;
            }
        },
        saveData(){
            let exp = this.getExperiment;
            let saved = this.getSaved;
            let taskcompletion = this.getTasks;
            let indicators = this.getIndicators;
            let date = new Date();
            let to_save = {"date": date, "taskcompletion":taskcompletion, "indicators":indicators}
            saved.push(to_save);
            let data_json = JSON.stringify(saved);
            window.localStorage.setItem(exp + '-la-data', data_json);  
        },
        
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
