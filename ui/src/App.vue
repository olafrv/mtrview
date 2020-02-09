<template>
<v-app>
  <v-content>
    <router-link to="/graph">Graph</router-link>
    <router-view></router-view>
  </v-content>
  <v-footer app>
    1111
  </v-footer>
</v-app>
</template>

<script>
export default {
  name: 'App'
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
