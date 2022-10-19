<template>

<div id='logging'>

</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    name: 'Logging',
    props: {
        url: String,   
    },
    data () {
        return {
            logSocket: null,
        }
    },
    mounted(){
        
        
    },
    watch:{
        url(){
			try{
				if(this.url != '' && this.getLogURLObtained){
					this.connect();								
				} else{
					console.log('disconnecting: ' + this.url);
				}
			} catch(e){
				console.log(e);
			}
		},
        
    },
    computed:{
        ...mapGetters([
            'getLogURLObtained',
            'getLogConsent',
            'getSessionExpired',
            
        ]),

    },
    methods:{
        ...mapActions([
            
        ]),
        
        connect(){
            let _store = this.$store;

			this.logSocket = new WebSocket(this.url);
			_store.dispatch('setLogSocket', this.logSocket);
            
            this.logSocket.onopen = () => {
				console.log('log connection opened at ', this.url);
                
			};
        }
    }
}
</script>

<style>

</style>