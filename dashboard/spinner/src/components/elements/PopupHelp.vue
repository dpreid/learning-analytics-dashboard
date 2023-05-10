
<template>
<div id='popup-help' @focusout="toggleHelp">
    <button type='button' class='btn btn-success' id='help-button' @click='toggleHelp'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
        </svg>
    </button>


    <transition name='fade'>
    <div v-if='popup_showing' class="modal" id='popup-help-modal' tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content text-start">
            
            <div class="modal-header">
                <h5><slot name='popup-help-header'></slot></h5>
                
                <button type="button" class="btn btn-close" aria-label="Close" @click="toggleHelp"></button>

            </div>

            <div class="modal-body" id='scroll-body'>
              
                <slot name='popup-help-body'></slot>

            </div>

            <div class="modal-footer">
             
                <slot name='popup-help-footer'></slot>

            </div>

          </div>
        </div>
      </div>
</transition>
    
</div>





</template>

<script>
import { mapGetters } from 'vuex';

export default {

  name: 'PopupHelp',
  props:[],
  emits:[],
  data () {
    return {
        popup_showing: false
    }
  },
  components: {
    
  },
  computed:{
     ...mapGetters([
         
     ])
  },
  watch:{
      
  },
  created(){
      
  },
  mounted(){
      

  },
  methods: {
    toggleHelp(){
          this.popup_showing = !this.popup_showing;
      },
      
  }
}
</script>

<style scoped>
#popup-help{
    position:relative;
    max-height:40px;
    max-width:40px;
}

#popup-help-modal{
  display: block;
  
}

#scroll-body{
  max-height: 50vh;
}

/* Important part */
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    height: 80vh;
    overflow-y: auto;
}

.modal-header{
    color: black;
}

</style>