<template>
<div>

    <streams />

    <div class='row'>
        <div class="col-sm-6">
            <send-message />
        </div>
        <div class="col-sm-6">
            <receive-message />
        </div>
    </div>


</div>
</template>

<script>
import Streams from "./components/Streams.vue";
import SendMessage from "./components/SendMessage.vue";
import ReceiveMessage from "./components/ReceiveMessage.vue";

export default {
  name: 'App',
  components: {
    Streams,
    SendMessage,
    ReceiveMessage,
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
