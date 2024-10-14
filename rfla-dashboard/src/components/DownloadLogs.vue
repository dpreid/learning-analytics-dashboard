<template>
    <button type='button' class="button-lg button-primary" id="download-logs-button" @click="requestDownloadAllLogs" aria-label="download logs button">
        Download All Logs    
    </button>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios';

export default {

  name: 'DownloadLogs',
  data () {
    return {
        
    }
  },
  components: {
    
  },
  computed:{
    ...mapGetters([
        'getLAHost'
    ])
  },
  watch:{
      
  },
  created(){
      
  },
  mounted(){
      

  },
  methods: {
    requestDownloadAllLogs(){
        let accessURL = `${this.getLAHost}/download-logs`
        axios
            .get(accessURL, { 
                responseType: 'blob',
                headers: 
                { 
                  'Content-Type': 'application/json',
                //   'Authorization': 'Basic ' + this.la_auth   //will be asked for password on request
                }  
            })
            .then(response => {
                console.log(response)
                //var blob = new Blob([response.data], { type: 'application/zip' });
                const url = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'logs.zip');
                link.click();
                URL.revokeObjectURL(url);
            })
            .catch((err) => console.log(err));
    },
      
     
      
      
  }
}
</script>

<style scoped>


</style>