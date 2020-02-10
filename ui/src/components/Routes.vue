<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
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
  const axios = require('axios');
  const dateFormat = require('dateformat');
  export default {
    methods : {
      fetchData(){
        var self = this;
        axios.get(
            'http://192.168.2.225:8081?hostname=www.google.com',
            { crossDomain: true }
          ).then(function (response) {
            let routes = [];
            let data = response.data.routes;
            for(let hash in data){
                let route = {};
                route.hash = data[hash].hash.substring(data[hash].hash.length - 6) ;
                route.created = dateFormat(data[hash].created, "isoDateTime");
                route.updated = dateFormat(data[hash].updated, "isoDateTime");
                route.packets = data[hash].packets;
                route.hops = data[hash].hopsUniq.join(' - ');
                routes.push(route);
            }
            self.routes = routes;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created () {
      this.fetchData();
      this.timer = setInterval(this.fetchData, 1000);
    },
    data () {
      return {
        singleSelect: true,
        selected: [],
        headers: [
          {
            text: 'Hash',
            align: 'left',
            sortable: false,
            value: 'hash',
          },
          { text: 'Created', value: 'created' },
          { text: 'Updated', value: 'updated' },
          { text: 'Packets', value: 'packets' },
          { text: 'Hops', value: 'hops' },
        ],
        routes: [],
      }
    },
  }
</script>
