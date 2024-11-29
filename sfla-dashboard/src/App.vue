<template>
  <div id="app" class='container-fluid-sm m-0'>
       <navigation-bar :isTaskCompletionOn='isTaskCompletionOn' :isIndicatorsOn='isIndicatorsOn' :isAffectiveReflectionOn='isAffectiveReflectionOn' :isUsageStatsOn='isUsageStatsOn' 
                      @toggleaffectivereflection="toggleAffectiveReflection" @toggleusagestats="toggleUsageStats" @toggleindicators="toggleIndicators" @toggletaskcompletion="toggleTaskCompletion"/>

        <div v-if='!isMobile' class='row' id='component-grid'>
          <!-- Have a layout for desktop -->
            <div class='d-flex' id='first-row'>
              <div class='drop-area drop-area-half' id='drop_0_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><graph-display id="student-graph-display" graph_id="student-graph" title="Your Graph" graph_type="student_graph" /></div>
              <div class='drop-area drop-area-half' id='drop_0_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><graph-display id="comparison-graph-display" graph_id="comparison-graph" title="Comparison Graph" graph_type="comparison_graph" /></div>
            </div>

            <div class='d-flex' id='second-row'>
              <div class='drop-area drop-area-half' id='drop_1_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><indicators v-if='isIndicatorsOn' id='indicators' /></div>
              <div class='drop-area drop-area-half' id='drop_1_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><task-completion v-if='isTaskCompletionOn' id='task-completion'/></div>
            </div>

            <div class='d-flex' id='third-row'>
                <div class='drop-area drop-area-half' id='drop_2_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><affective-feedback v-if='isAffectiveReflectionOn' id='affective-feedback' /></div>
                <div class='drop-area drop-area-half' id='drop_2_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><usage-stats v-if='isUsageStatsOn' id='usage-stats' /></div>
                
            </div>

        </div>

        <div v-else class='d-flex flex-column' id='component-grid'>
          <!-- and a layout for mobile -->
            
            <div class='drop-area drop-area-mobile' id='drop_0_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><graph-display id="graph-display" graph_id="student-graph" title="Your Graph" graph_type="student_graph" /></div>
            <div class='drop-area drop-area-mobile' id='drop_1_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><graph-display id="comparison-graph-display" graph_id="comparison-graph" title="Comparison Graph" graph_type="comparison_graph" /></div>
            <div class='drop-area drop-area-mobile' id='drop_2_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><affective-feedback v-if='isAffectiveReflectionOn' id='affective-feedback' /></div>
            <div class='drop-area drop-area-mobile' id='drop_3_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><usage-stats v-if='isUsageStatsOn' id='usage-stats' /></div>
            <div class='drop-area drop-area-mobile' id='drop_4_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><task-completion v-if='isTaskCompletionOn' id='task-completion'/></div>
            <div class='drop-area drop-area-mobile' id='drop_5_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><indicators v-if='isIndicatorsOn' id='indicators' /></div>

        </div>
     
   
  </div>
</template>

<script>

import NavigationBar from "./components/NavigationBar.vue";
import GraphDisplay from "./components/GraphDisplay.vue";
import AffectiveFeedback from "./components/AffectiveFeedback.vue";
import UsageStats from './components/UsageStats.vue'
import TaskCompletion from "./components/TaskCompletion.vue";
import Indicators from "./components/Indicators.vue";

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavigationBar,
    GraphDisplay,
    AffectiveFeedback,
    UsageStats,
    TaskCompletion,
    Indicators
  },
  mounted(){
    
  },
  data() {
    return {
      isTaskCompletionOn: true,
      isIndicatorsOn: true,
      isAffectiveReflectionOn: false,
      isUsageStatsOn: false
    }
  },
  created(){
    this.$store.dispatch('setUsesLocalStorage', this.hasStorage());
  },
  mounted(){
    this.updateUUID();
    

    try {
      let query = new URLSearchParams(window.location.search);

      //let decodedStreams = JSON.parse(decodeURIComponent(String(streams)));

      let la = query.get('la')
      let lh = decodeURIComponent(query.get('lh'));
      let th = decodeURIComponent(query.get('th'));
      let ch = decodeURIComponent(query.get('ch'));
      if(lh != null){
        this.$store.dispatch('setLoggingHost', lh);
      }
      if(th != null){
        this.$store.dispatch('setTaskCompareHost', th);
      }
      if(ch != null){
        this.$store.dispatch('setChatHost', ch);
      }
      if(la != null){
        this.$store.dispatch('setLoggingAuth', la);
      }
      
      let course = query.get('course');
      if(course != null){
        this.$store.dispatch('setCourse', course);
      } else{
        this.$store.dispatch('setCourse', 'none');
      }

      let hardware = query.getAll('hardware');    //gets all recurrences of the hardware param in the URL as an array
      if(hardware != null){
        this.$store.dispatch('setHardwareOptions', hardware);
        this.$store.dispatch('setSelectedHardware', hardware[0])
      } else{
        this.$store.dispatch('setHardwareOptions', []);
      }

      //get configuration parameters
      let conf_url = query.get('config');
      if(conf_url != null){
        try{
          fetch(conf_url)
            .then(response => response.json())
            .then(data => this.$store.dispatch('setConfigJSON', data));
        } 
        catch(e){
          console.log(e);
        }
      } else{
        console.log('no configuration file available');
      }
      
    } catch (e) {
      console.log("error decoding streams");
    }
  },
  computed:{
    ...mapGetters([
      'getDraggable',
      'getUsesLocalStorage',
    ]),
    isMobile(){
      if(window.screen.width < 992){
        return true;
      } else{
        return false;
      }
    }
  },
  methods:{
    toggleAffectiveReflection(){
      this.isAffectiveReflectionOn = !this.isAffectiveReflectionOn;
    },
    toggleUsageStats(){
      this.isUsageStatsOn = !this.isUsageStatsOn;
    },
    toggleIndicators(){
      this.isIndicatorsOn = !this.isIndicatorsOn;
    },
    toggleTaskCompletion(){
      this.isTaskCompletionOn = !this.isTaskCompletionOn;
    },
    dragComponent(event){
        event.dataTransfer.effectAllowed = 'move';
         let element = event.target;
         if(element.classList.contains('drop-area')){
           if(element.childNodes[0] != null){
              event.dataTransfer.setData("text/html", element.id + "|" + element.childNodes[0].id);
           } else{
              event.dataTransfer.setData("text/html", element.id + "|" + 'empty');
           }
            
         } else{
           while(element.parentNode){
              element = element.parentNode;
              if(element.classList.contains('drop-area')){
                if(element.childNodes[0] != null){
                  event.dataTransfer.setData("text/html", element.id + "|" + element.childNodes[0].id);
              } else{
                  event.dataTransfer.setData("text/html", element.id + "|" + 'empty');
              }
                break;
              }
            }
         }
    },
    dropComponent(event){
      event.preventDefault();
      event.stopPropagation();
      let dropData = event.dataTransfer.getData('text/html');
      let dropItems = dropData.split("|");
      let draggedZone = document.getElementById(dropItems[0]);
      let droppedElement = document.getElementById(event.target.id);
      let draggedID = dropItems[1];
      
      // only try if the dragged element is not empty
      if(draggedID != 'empty' && document.getElementById(draggedID) != null){
          if(droppedElement != null && droppedElement.classList.contains('drop-area')){
            if(event.target.childNodes.length > 0){
              draggedZone.appendChild(event.target.childNodes[0]);
            }
            droppedElement.appendChild(document.getElementById(draggedID));
            droppedElement.classList.remove('drop-area-highlighted');
        } 
        else if(droppedElement){
          let element = droppedElement;
          while(element.parentNode){
            element = element.parentNode;
            if(element.classList.contains('drop-area')){
              draggedZone.appendChild(element.childNodes[0]);
              element.appendChild(document.getElementById(draggedID));
              element.classList.remove('drop-area-highlighted');
              break;
            }
          }
        }
      }
      
      return false;
    },
    dragEnter(event){
      let dropData = event.dataTransfer.getData('text/html');
      let dropItems = dropData.split("|");
      let draggedID = dropItems[1];
      if(draggedID != 'empty' && document.getElementById(draggedID) != null){
        let element = document.getElementById(event.target.id);
        if(element != null && element.classList.contains('drop-area')){
          element.classList.add('drop-area-highlighted');
        }
        
      }
      
    },
    dragLeave(event){
      let element = document.getElementById(event.target.id);
      if(element != null){
        element.classList.remove('drop-area-highlighted');
      }
      
    },
  
    // loading and saving data for logging consent and uuid etc.
    hasStorage(){
        try {
            window.localStorage.setItem('test', 'storage');
            window.localStorage.removeItem('test');
            return true;
        } catch (exception) {
            return false;
          }
      },
      // UUID is generated by the practable booking system and stored in localStorage (as userName)
      // This function should just find that userName and set it in vuex, else set uuid to null
    updateUUID(){
        let stored_uuid;

        if(this.getUsesLocalStorage){
          stored_uuid = window.localStorage.getItem('userName');
        } else {
          stored_uuid = null;
        }
        
        if(stored_uuid){
            this.$store.dispatch('setUUID', stored_uuid);
        } else{
          this.$store.dispatch('setUUID', 'null');
        }
      },
  },
}
</script>

<style>

</style>
