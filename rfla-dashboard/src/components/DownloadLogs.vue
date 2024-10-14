<template>
    <div class="row">
        <div class="col-6">
            <div class="d-flex flex-column align-items-start">
                <label id="user-label" for="user-input">Username: </label>
                <input type="text" id='user-input' v-model="username" />

                <label id="password-label" for="password-input">Password: </label>
                <input type="password" id='password-input' v-model="password" />

                <button type='button' class="button-lg button-primary" id="download-logs-button" @click="requestDownloadAllLogs" aria-label="download logs button">
                        Download All Logs    
                </button>
            </div>
        </div>
    </div>
    

    
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios';

export default {

  name: 'DownloadLogs',
  data () {
    return {
        username: '',
        password: ''
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
        var credentials = btoa(this.username + ':' + this.password);
        var basicAuth = 'Basic ' + credentials;
        let accessURL = `${this.getLAHost}/download-logs`
        axios
            .get(accessURL, { 
                responseType: 'blob',
                headers: 
                { 
                   'Content-Type': 'application/zip',
                   'Authorization': basicAuth
                }  
            })
            .then(response => {
                //console.log(response)
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