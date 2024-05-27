import { createRouter, createWebHistory } from 'vue-router'

import AuthorizationPage from './pages/AuthorizationPage.vue'
import ProductPage from './pages/ProductPage.vue'
import CartPage from './pages/CartPage.vue'
import AuthorizationForm from './widgets/authorization/AuthorizationForm.vue'
import RegistrationForm from './widgets/authorization/RegistrationForm.vue'
import WelcomePage from './pages/WelcomePage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ProductListPage from './pages/ProductListPage.vue'
import TheMain from './widgets/TheMain.vue'

const routes = [
    {
        name: 'AuthOutlet',
        path: '/authorization',
        component: AuthorizationPage,
        children: [
            {
                name: 'Auth',
                path: 'auth',
                component: AuthorizationForm
            },
            {
                name: 'Reg',
                path: 'reg',
                component: RegistrationForm
            }
        ]
    },
    {
        name: 'MainOutlet',
        path: '/',
        component: TheMain,
        children: [
            {
                name: 'WelcomePage',
                path: '/welcome/:id',
                component: WelcomePage
            },
            {
                name: 'ProfilePage',
                path: '/profile',
                component: ProfilePage
            },
            {
                name: 'CartPage',
                path: '/',
                redirect: '/all/products'
            },
            {
                name: 'ProductListPage',
                path: '/:category+/products',
                component: ProductListPage
            },
            {
                name: 'ProductPage',
                path: '/:category/product/:id',
                component: ProductPage
            },
            {
                name: 'CartPage',
                path: '/cart/:id',
                component: CartPage
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
