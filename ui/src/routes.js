// routes.js

import Graph from './components/Graph.vue';
import About from './components/About.vue';

const routes = [
    { path: '/', component: Graph },
    { path: '/graph', component: Graph },
    { path: '/about', component: About },
];

export default routes;