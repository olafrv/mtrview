<template>
  <v-menu>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            color="primary"
            dark
            v-on="{ ...tooltip, ...menu }"
          >EndPoints</v-btn>
        </template>
        <span>Select an endpoint</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in endpoints"
        :key="index"
        @click="goto(item.title)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    endpoints: [],
  }),
  computed: {
    items (){
      let hosts = this.$store.getters.hosts;
      let items = [];
      for(let host in hosts){
        if (host != this.$route.params.hostname) items.push({'title':host});
      }
      return items;
    }
  },
  watch : {
    items (){
      this.endpoints = this.items;
    }
  },
  methods : {
    goto (url) {
      this.$router.push(url);
    }
  }
}
</script>
