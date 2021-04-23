<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #949597;
  margin-top: 100px;
}
.pac-container {
    background-color: #FFF;
    z-index: 100000 !important;
    position: fixed;
    display: inline-block;
}
</style>
