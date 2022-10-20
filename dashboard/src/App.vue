<template>
<div>

    <streams />

    <analytics-dashboard :url="getLogURL"/>


</div>
</template>

<script>
import Streams from "./components/Streams.vue";
import AnalyticsDashboard from "./components/AnalyticsDashboard.vue"

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Streams,
    AnalyticsDashboard
  },
  computed:{
        ...mapGetters([
            'getLogURL'
        ])
  },
  methods:{
        ...mapActions([

        ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
