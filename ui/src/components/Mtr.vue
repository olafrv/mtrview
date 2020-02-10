<template>
  <v-container fluid>
    <Graph/>
    <Routes/>
  </v-container>
</template>

<script>
import Graph from '@/components/Graph.vue';
import Routes from '@/components/Routes.vue';
export default {
  components : {
    Graph,
    Routes
  },
  mounted : () => {
    
  }
}
</script>