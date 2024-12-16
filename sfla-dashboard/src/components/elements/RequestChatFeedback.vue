//Vue3 update

<template>
<div :id='id'>
    <button type='button' class='button-toolbar button-secondary' :id='id + "-button"' @blur="closeFeedback" @click='openFeedback(); requestFeedback()' aria-label="request feedback" data-bs-toggle="tooltip" title="Feedback" :disabled="disabled">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
        </svg>
    </button>


    <!-- <transition name='fade'> -->
        <div v-if='popup_showing' class="modal" id='modal-chat-feedback' tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header"></slot>
                    <button type='button' :class="getDarkTheme ? 'btn-close btn-close-white' : 'btn-close'" id='close-button' aria-label="Close" @click='closeHelp'></button>
                </div>
                <div v-if='awaiting' class="modal-body">
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
                <div v-else class="modal-body">
                    <slot name="body"></slot>

                </div>

                <div class="modal-footer">
                    <slot name="footer"></slot>
                    <button type="button" class="button-sm button-danger" id="close-modal" @click="closeFeedback">Close</button>
                </div>
            </div>
            </div>
        </div>
    <!-- </transition> -->

    
    
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  name: 'RequestChatFeedback',
  emits: ['request-feedback'],
  props:{
      'id': String,
      'awaiting': Boolean,
      'disabled': Boolean
  },
  data () {
    return {
        popup_showing: false,
    }
  },
  components: {
    
  },
  created(){
      
  },
  mounted(){
    

  },
  computed:{
    ...mapGetters([
        'getDarkTheme'
      ])
  },
  watch:{
      
  },
  
  methods: {
    requestFeedback(){
        this.$emit('request-feedback');
    },
    openFeedback(){
    this.popup_showing = true;

    this.$nextTick(() => {
        let modal = document.getElementById('modal-chat-feedback');
        document.body.appendChild(modal);
    });
    
    },
    closeFeedback(){
    let modal = document.getElementById('modal-chat-feedback');
    //document.body.removeChild(modal);
    let here = document.getElementById(this.id);
    here.appendChild(modal);

    this.$nextTick(() => {
        this.popup_showing = false;
    });
    }
  }
}
</script>

<style scoped>
button:disabled,
button[disabled]{
  color: #66666670;
}

#modal-chat-feedback{
  display: block;
}

#close-button{
    position:absolute;
    right:10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.lds-ellipsis,
.lds-ellipsis div {
  box-sizing: border-box;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33.33333px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-color-inverted);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 16px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 28px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(12px, 0);
  }
}

</style>