<template>
  <div id="app" class='container-fluid-sm m-0'>
       <navigation-bar />

        <div v-if='!isMobile' class='row' id='component-grid'>
          <!-- Have a layout for desktop -->
            <div class='d-flex' id='first-row'>
              <div class='drop-area drop-area-half' id='drop_0_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><download-logs id='download-logs' /></div>
              <div class='drop-area drop-area-half' id='drop_0_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
            </div>

            <div class='d-flex' id='second-row'>
              <div class='drop-area drop-area-half' id='drop_1_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
              <div class='drop-area drop-area-half' id='drop_1_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
            </div>

            <div class='d-flex' id='third-row'>
                <div class='drop-area drop-area-half' id='drop_2_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
                <div class='drop-area drop-area-half' id='drop_2_1' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
                
            </div>

        </div>

        <div v-else class='d-flex flex-column' id='component-grid'>
          <!-- and a layout for mobile -->
            
            <div class='drop-area drop-area-mobile' id='drop_0_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"><download-logs id='download-logs' /></div>
            <div class='drop-area drop-area-mobile' id='drop_1_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
            <div class='drop-area drop-area-mobile' id='drop_2_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
            <div class='drop-area drop-area-mobile' id='drop_3_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
            <div class='drop-area drop-area-mobile' id='drop_4_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>
            <div class='drop-area drop-area-mobile' id='drop_5_0' :draggable='getDraggable' @dragstart="dragComponent" @drop='dropComponent' @dragover.prevent @dragenter='dragEnter' @dragleave="dragLeave"></div>

        </div>
     
   
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import NavigationBar from "./components/NavigationBar.vue";
import DownloadLogs from './components/DownloadLogs.vue';



export default {
  name: 'App',
  components: {
    NavigationBar,
    DownloadLogs
  },
  mounted(){
    
  },
  data() {
    return {
      
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
      let la_host = query.get('lh');
      if(la_host != null){
        this.setLAHost(decodeURIComponent(la_host));
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
    ...mapActions([
        'setLAHost'
    ]),
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
