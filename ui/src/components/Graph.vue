<template>
  <div ref="mynetwork" id="mynetwork"></div>
</template>

<script>
import Vis from 'vis-network'
export default {
  name: "Graph",
  data: function (){
    return {
      nodes : new Vis.DataSet([
        {id: 1, label: 'Node 1'}, {id: 2, label: 'Node 2'}, {id: 3, label: 'Node 3'}, {id: 4, label: 'Node 4'}, {id: 5, label: 'Node 5'}
      ]),
      edges : new Vis.DataSet([
        {from: 1, to: 3}, {from: 1, to: 2}, {from: 2, to: 4}, {from: 2, to: 5}, {from: 3, to: 3}
      ]),
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