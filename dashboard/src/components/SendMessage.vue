<template>
  <div>

    <h1>Send</h1>
    <input type="text" class="form-control" id="send_message" v-model="message">
    <button id="send_button" @click="send">Submit</button>
    <button id="clear_button" @click="clear">Clear</button>

  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: "SendMessage",
	components:{
        
	},
    data(){
        return{
			message: ''
        }
    },
	mounted(){
		
	},
    computed:{

    },
    methods:{
        ...mapActions([
            'request'
        ]),
        send(){
            this.request(this.message);
        },
        clear(){
            this.message = ''
        }
    }
}
</script>

<style>

</style>