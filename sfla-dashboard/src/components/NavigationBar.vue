
<template>

    <nav :class="getDarkTheme ? 'navbar navbar-dark fixed-top navbar-expand-lg navbar-background' : 'navbar navbar-light fixed-top navbar-expand-lg  navbar-background'" id='navbar'>
    <div class="container-fluid">
      <div class="navbar-brand">
          <img src="/images/practable-icon.png" width="30" height="30" alt="practable.io logo">
          Student Dashboard: {{ getCourse }} {{ getSelectedHardware }}
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="menu dropdown">
                   Add Component
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a :class="isTaskCompletionOn ? 'dropdown-item dropdown-checked' : 'dropdown-item'" id='taskcompletionmenu' href="#" @click='toggleComponent("taskcompletion")'>Task Completion</a></li>
                    <li><a :class="isIndicatorsOn ? 'dropdown-item dropdown-checked' : 'dropdown-item'" id='indicatorsmenu' href="#" @click='toggleComponent("indicators")'>Indicators</a></li>
                    <li><a :class="isAffectiveReflectionOn ? 'dropdown-item dropdown-checked' : 'dropdown-item'" id='affectivereflectionmenu' href="#" @click='toggleComponent("affectivereflection")'>Affective feedback</a></li>
                    <li><a :class="isUsageStatsOn ? 'dropdown-item dropdown-checked' : 'dropdown-item'" id='usagestatsmenu' href="#" @click='toggleComponent("usagestats")'>Usage Statistics</a></li>
                  </ul>
              </li>

              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="lab-select" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="select lab dropdown">
                   Change Hardware
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li v-for="hardware in getHardwareOptions"><a class="dropdown-item" href="#" :id="`hardware-select-${hardware}`" @click='setSelectedHardware(hardware)'>{{ hardware }}</a></li>
                  </ul>
              </li>

              <li class="nav-item">
                  <a class="nav-link" >
                    UUID: {{ getLogUUID }}
                  </a>
                </li>


          </ul>

            <ul class="navbar-nav dropstart">

                <li v-if="getIsChatOn" class="nav-item me-1" id="chat">
                  <chat />
                </li>

                <li class="nav-item me-1">
                  <popup-help class="me-2" id="popup-help-navigation-bar">
                    <template v-slot:header>
                        <h5> Help </h5>
                    </template>
                    <template v-slot:body>
                        <div class='row'>
                          <div class='col-lg-6'>
                              <h2>Example Popup</h2>
                              
                          </div>
                          <div class='col-lg-6'>
                              <h2>Example Popup</h2>
                              
                          </div>
                        </div>
                    </template>
                </popup-help>
                </li>
              
                <li class="nav-item me-1">
                  <button type='button' class='button-toolbar button-secondary' id='toggle-theme-button' aria-label='toggle dark theme' @click='toggleTheme' :disabled="disableThemeButton">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>
                    </svg>
                  </button>
              </li>

            </ul>

      </div>
    </div>
  </nav>

</template>

<script>

import PopupHelp from './elements/PopupHelp.vue';
import Chat from "./Chat.vue";
import { mapGetters, mapActions } from 'vuex';

export default {

  name: 'NavigationBar',
  props:['isAffectiveReflectionOn', 'isIndicatorsOn', 'isTaskCompletionOn', 'isUsageStatsOn'],
  emits:['toggleaffectivereflection', 'toggleindicators', 'toggletaskcompletion', 'toggleusagestats'],
  data () {
    return {
      disableThemeButton: false,
    }
  },
  components: {
    PopupHelp,
    Chat
  },
  computed:{
      ...mapGetters([
        'getDarkTheme',
        'getIsChatOn',
        'getLogUUID',
        'getHardwareOptions',
        'getSelectedHardware',
        'getCourse'
      ])
  },
  methods: {
    ...mapActions([
      'setSelectedHardware'
    ]),
      addTool(tool){
          this.toggleComponent('workspace');
          setTimeout(() => {this.$emit('add' + tool)}, 100);  //give the workspace time to initialise and then send tool event
          
      },
      toggleComponent(component){
          this.$emit('toggle' + component);
      },
      clearWorkspace(){
          this.$emit('clearworkspace');
      },
      // needs a short delay before can be rerun so as to enable the chart to recolour everything
      toggleTheme(){
          this.disableThemeButton = true;
          setTimeout(() => {
            this.disableThemeButton = false
          }, 1000);
          document.body.classList.toggle("dark-theme");
          this.$store.dispatch('setDarkTheme', document.body.classList.contains("dark-theme"));
      },
      
  }
}
</script>

<style scoped>
.dropdown-checked::before{
  position: absolute;
  left: .2rem;
  content: '✓';
  font-weight: 600;
}

</style>