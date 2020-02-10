<template>
  <div ref="mynetwork" id="mynetwork"></div>
</template>

<script>
import Vis from 'vis-network'
const axios = require('axios');
export default {
  methods : {
    fetchData() {
      var self = this;
      axios.get(
          'http://192.168.2.225:8081?hostname=www.google.com',
          { crossDomain: true }
        ).then((response) => {
          let nodes = [];
          let edges = [];
          let n = 1;
          for(let hash in response.data.routes){
              for(let i in response.data.routes[hash].hops){
              nodes.push(
                { id : n , label : response.data.routes[hash].hops[i].ip }
              );
              edges.push({from: n, to: (n+1)});
              n++;
            }
            n++;
          }
          self.nodes.update(
            //[{id: 1, label: 'Node 1'}, {id: 2, label: 'Node 2'}, {id: 3, label: 'Node 3'}, {id: 4, label: 'Node 4'}, {id: 5, label: 'Node 5'}]
            nodes
          );
          self.edges.update(
            //[{from: 1, to: 3}, {from: 1, to: 2}, {from: 2, to: 4}, {from: 2, to: 5}, {from: 3, to: 3}]
            edges
          );
          console.log(response.data.hostname);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  created: function () {
    this.fetchData();
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
    //this.timer = setInterval(this.fetchData, 1000, this);
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