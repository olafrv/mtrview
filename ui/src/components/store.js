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
    updateRoutes : ({ commit }) => {
      setInterval(() => {
        Axios.get('http://192.168.2.225:8081?config=hosts')
        .then((response) => {  
          commit('setHosts', response.data.hosts);
          let p = [];
          for(let host in response.data.hosts){
            p.push(new Promise((resolve,reject) => {
              Axios.get('http://192.168.2.225:8081?hostname=' + host)
                .then((response) => {    
                  resolve(response.data);
                })
                .catch((error) => {
                  reject(error);              
                });
            }));
          }
          Promise.all(p).then((routes) =>{
            commit('setRoutes', routes);
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      }, 1000)
    }
  },
  getters: {
    hosts: state => state.hosts,
    routes: state => state.routes,
  }
})
