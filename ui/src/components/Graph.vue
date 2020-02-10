<template>
  <div ref="mynetwork" id="mynetwork"></div>
</template>

<script>
import Vis from 'vis-network'
const axios = require('axios');
export default {
  methods : {
    fetchData() {
      let self = this;
      let hostname = this.$route.params.hostname;
      axios.get(
          'http://192.168.2.225:8081?hostname=' + hostname
        ).then((response) => {
          let nodes = [];
          let edges = [];
          for(let hash in response.data.routes){
              let nodeCount = Object.keys(response.data.routes[hash].hops).length;
              for(let i=0; i < nodeCount-1; i++ ){
                let nodeA = response.data.routes[hash].hops[i].ip;
                let nodeAASN = response.data.routes[hash].hops[i].asn;
                let nodeB = response.data.routes[hash].hops[i+1].ip;
                let nodeBASN = response.data.routes[hash].hops[i+1].asn;
                nodes.push({ id : nodeA , label : nodeA  + "\n" +  nodeAASN});
                nodes.push({ id : nodeB , label : nodeB + "\n" +  nodeBASN});
                edges.push({from: nodeA, to: nodeB});
            }
          }
          self.nodes.update(nodes);
          self.edges.update(edges);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created: function () {
    this.fetchData();
    this.$store.dispatch("updateRoutes");
  },
  data: function (){
    return {
      nodes : new Vis.DataSet([]),
      edges : new Vis.DataSet([]),
      options : {}
    }
  },
  mounted: function (){
    new Vis.Network(this.$refs.mynetwork, {nodes:this.nodes, edges:this.edges}, this.options);
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