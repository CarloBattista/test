import { createRouter, createWebHistory } from 'vue-router';

// onBoard
import Register from '../views/onBoard/Register.vue';
import Login from '../views/onBoard/Login.vue';

// General
import Home from '../views/Home.vue';
import Account from '../views/Account.vue';

const routes = [
    // onBoard
    {
        path: '/register',
        name: 'register',
        component: Register,
        props: true,
        meta: { title: "MyAccounts" },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
        meta: { title: "MyAccounts" },
    },

    // General
    {
        path: '/',
        name: 'home',
        component: Home,
        props: true,
        meta: { title: "MyAccounts • Home" },
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        props: true,
        meta: { title: "MyAccounts" },
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
    } next();
});

export default router;