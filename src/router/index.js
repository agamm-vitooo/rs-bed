import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeViews.vue';
import ListRS from '../views/ListRS.vue';

const routes = [{
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/listRS',
        name: 'ListRS',
        component: ListRS
    }
];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.VITE_BASE_URL),
    routes
});

export default router;