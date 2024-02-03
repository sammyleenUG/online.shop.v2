// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import Home from "@/pages/home/HomeComponent.vue";
import Login from "@/pages/auth/LoginComponent.vue";
import Register from "@/pages/auth/RegisterComponent.vue";
import Shop from "@/pages/explore/ShopComponent.vue";
import Search from "@/pages/explore/SearchComponent.vue";
import HowTo from "@/pages/help/HowTo.vue";
import ShoppingCart from "@/pages/products/ShoppingCartComponent.vue";
import ProductDetails from "@/pages/products/ProductDetailsComponent";

const isAuthenticated = localStorage.getItem('auth')? true:false;

const requireAuth = (to, from, next) => {
    if (isAuthenticated) {
        next();
    } else {
        next('/auth/login');
    }
};

const routes = [
    {
        path: '/',
        component: Home,
    },

    {
        path: '/auth/login',
        component: Login,
    },

    {
        path: '/auth/register',
        component: Register,
    },

    {
        path: '/products/search/q/:search',
        component: Search,
        props:true,
    },

    {
        path: '/products/explore/:category?',
        component: Shop,
        props:true,
    },

    {
        path: '/products/:product_id/:name',
        component: ProductDetails,
        props: true,
    },

    {
        path: '/help/:how-to',
        component: HowTo,
    },

    {
        path: '/shopping-cart',
        component: ShoppingCart,
        beforeEnter: requireAuth,
    
    },

    {
        path: '/:catchAll(.*)', // Catch-all route for 404 errors
        redirect: '/',
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
