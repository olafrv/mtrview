<template>
  <div>
    Endpoint: {{ this.$route.params.hostname }}
    <br>
    <div ref="mynetwork" id="mynetwork"></div>
    <br>
    Updated: {{ updated }}, Routes: {{ routeCount }}
  </div>
</template>

<script>
import Vis from 'vis-network'
const dateFormat = require('dateformat');

export default {
  data: function (){
    return {
      network : null,
      nodes : new Vis.DataSet([]),
      edges : new Vis.DataSet([]),
      updated: "",
      options : {}
    }
  },
  computed: {
    routeCount () {
      let h = this.$route.params.hostname;
      let r = this.$store.getters.routes;
      for(let i in r){
        let data = r[i];
        if (data["hostname"]==h){
          return Object.keys(data["routes"]).length;
        }
      }
      return 0;
    }
  },
  watch: {
    routeCount () {
      this.fetchData();
    },
    $route(){
      this.nodes = new Vis.DataSet([]),
      this.edges = new Vis.DataSet([]),
      window.VIS_NETWORK.setData({nodes:this.nodes, edges:this.edges}); 
      this.fetchData();
    }
  },
  created: function () {
    this.$store.dispatch("updateHosts");
    this.$store.dispatch("updateRoutes");
  },
  mounted: function (){
    window.VIS_NETWORK = new Vis.Network(this.$refs.mynetwork, {nodes:this.nodes, edges:this.edges}, this.options);
  },
  methods : {
    fetchData() {
      this.$data.updated = dateFormat(Date.now(), "isoDateTime");
      let hostname = this.$route.params.hostname;
      let nodes = [];
      let edges = [];
      for(let i in this.$store.getters.routes){
        let data = this.$store.getters.routes[i];
        if (data["hostname"]==hostname){
          for(let hash in data["routes"]){
            let route = data["routes"][hash];
            for(let i=0; i < Object.keys(route.hops).length-1; i++ ){
              let nodeA = route.hops[i].ip;
              let nodeAASN = route.hops[i].asn;
              let nodeB = route.hops[i+1].ip;
              let nodeBASN = route.hops[i+1].asn;
              nodes.push({ id : nodeA , label : nodeA  + "\n" +  nodeAASN});
              nodes.push({ id : nodeB , label : nodeB + "\n" +  nodeBASN});
              edges.push({from: nodeA, to: nodeB, arrows: 'to'});
            }
          }
          this.nodes.update(nodes);
          this.edges.update(edges);
        }
      }
    }
  },
}
</script>
<style scoped>
   #mynetwork {
      width: 500px;
      height: 300px;
      border: 1px solid lightgray;
    }
</style>