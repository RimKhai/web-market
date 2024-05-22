import { createRouter, createWebHistory } from 'vue-router'

import AuthorizationPage from './pages/AuthorizationPage.vue'
import ProductPage from './pages/ProductPage.vue'
import CartPage from './pages/CartPage.vue'
import AuthorizationForm from './widgets/authorization/AuthorizationForm.vue'
import RegistrationForm from './widgets/authorization/RegistrationForm.vue'
import WelcomePage from './pages/WelcomePage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ProductListPage from './pages/ProductListPage.vue'
import Main from './widgets/Main.vue'

const routes = [
    {
        path: '/authorization',
        component: AuthorizationPage,
        children: [
            {
                path: 'auth',
                component: AuthorizationForm,
            },
            {
                path: 'reg',
                component: RegistrationForm,
            },
        ],
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/welcome/:id',
                component: WelcomePage,
            },
            {
                path: '/profile',
                component: ProfilePage,
            },
            {
                path: '/',
                redirect: '/all/products',
            },
            {
                path: '/:category+/products',
                component: ProductListPage,
            },
            {
                path: '/:category/product/:id',
                component: ProductPage,
            },
            {
                path: '/cart/:id',
                component: CartPage,
            },
        ],
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
