<template>
<v-app>
  <v-content>
    <HeadToolbar/>
     <v-container fluid>
      <router-view></router-view>
     </v-container>
  </v-content>
</v-app>
</template>

<script>
import HeadToolbar from '@/components/HeadToolbar.vue';
export default {
  name: 'App',
  components : {
    HeadToolbar
  }
}
</script>