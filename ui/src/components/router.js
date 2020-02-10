import Vue from 'vue';
import VueRouter from 'vue-router'
import Mtr from '@/components/Mtr.vue';
import About from '@/components/About.vue';

Vue.use(VueRouter);

const router = new VueRouter(
    { routes: [
        { path: '/', component: Mtr },
        { path: '/mtr/:hostname', component: Mtr },
        { path: '/about', component: About },
    ]}
);

export default router;