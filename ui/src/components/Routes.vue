<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :sort-by="['updated', 'created']"
    :sort-desc="[true, true]"
    multi-sort
    :items="routes"
    :single-select="singleSelect"
    item-key="hash"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
    </template>
  </v-data-table>
</template>

<script>
  const dateFormat = require('dateformat');
  export default {
    data () {
      return {
        singleSelect: true,
        selected: [],
        headers: [
          { text: 'Hash', value: 'hash', align: 'left', sortable: false },
          { text: 'Created', value: 'created' },
          { text: 'Updated', value: 'updated' },
          { text: 'Packets', value: 'packets' },
          { text: 'Hops', value: 'hops' },
        ],
        routes: [],
      }
    },
    created () {
      this.timer = setInterval(this.fetchData, 1000);
    },
    methods : {
      fetchData(){
        let hostname = this.$route.params.hostname;
        let rows = [];
        for(let i in this.$store.getters.routes){
          let data = this.$store.getters.routes[i];
          if (data["hostname"]==hostname){
            for(let hash in data["routes"]){
              let row = {};
              let route = data["routes"][hash];
              row.hash = route.hash.substring(route.hash.length - 6) ;
              row.created = dateFormat(route.created, "isoDateTime");
              row.updated = dateFormat(route.updated, "isoDateTime");
              row.packets = route.packets;
              row.hops = route.hopsUniq.join(', ');
              rows.push(row);
            }
          }
        }
        this.routes = rows;
      }
    },
  }
</script>
