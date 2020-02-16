import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    hosts: {},
    routes: {},
  },
  mutations: {
    setHosts (state, hosts) {
      state.hosts = hosts;
    },
    setRoutes (state, routes) {
      state.routes = routes;
    }
  },
  actions: {
    updateHosts : (context) => {
      //setInterval(()=>{
        Axios.get('http://olafrv.ddns.net:8081?config=hosts&time='+Date.now())
        .then((response) => {  
          context.commit('setHosts', response.data.hosts);
        }).catch((error) => {
          console.log(error);
        });
      //}, 1000);  
    },
    updateRoutes : (context) => {
      setInterval(()=>{
        let p = [];
        for(let host in context.getters.hosts){
          p.push(new Promise((resolve,reject) => {
            Axios.get('http://olafrv.ddns.net:8081?hostname=' + host+"&time="+Date.now())
              .then((response) => {    
                resolve(response.data);
              })
              .catch((error) => {
                reject(error);              
              });
          }));
        }
        Promise.all(p).then((routes) =>{
          context.commit('setRoutes', routes);
        }).catch((error) => {
          console.log(error);
        });
      }, 1000);
    }
  },
  getters: {
    hosts: state => state.hosts,
    routes: state => state.routes,
  }
})
