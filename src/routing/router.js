import { createRouter, createWebHistory } from 'vue-router';

// General
import Home from '../views/Home.vue';

const routes = [
    // General
    {
        path: '/',
        name: 'home',
        component: Home,
        props: true,
        meta: { title: "MyAccounts • Home" }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const pageTitle = to.meta.title;
    if (pageTitle) {
        document.title = pageTitle;
    } else {
        document.title = "MyAccounts";
    }
    next();
});

export default router;