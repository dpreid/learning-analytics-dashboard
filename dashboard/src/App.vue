<template>
<div id="app" class='container-fluid-sm m-0 background-white'>
    <navigation-bar />
    <streams />

    <analytics-dashboard :url="getLogURL"/>


</div>
</template>

<script>
import Streams from "./components/Streams.vue";
import AnalyticsDashboard from "./components/AnalyticsDashboard.vue"
import NavigationBar from "./components/NavigationBar.vue"
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    NavigationBar,
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
