<template>
  <div>
    
    <button class='button-lg button-primary' id="send_button" @click="send">Request Analytics</button>

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
            this.request();
        },
        
    }
}
</script>

<style>

</style>