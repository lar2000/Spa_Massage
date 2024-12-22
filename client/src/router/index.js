// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/Home/HomePage.vue'; // Adjust the path as needed
import Login from '../components/Login.vue';
import Customer from '../Pages/Customer.vue'
import Staff from '../Pages/Staff/Staff.vue'
//import Modal from '../Pages/Staff/Modal.vue'
import Set_product from '../Pages/Set_product.vue'
import Product from '../Pages/Product.vue'
import Service from '../Pages/Service.vue'
import Service_type from '../Pages/Service_type.vue'
import Booking from '../booking/booking.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/customer',
        name: 'Customer',
        component: Customer
    },
    {
        path: '/set_product',
        name: 'Set_product',
        component: Set_product
    },
    {
        path: '/service',
        name: 'Service',
        component: Service
    },
    {
        path: '/service_type',
        name: 'service_type',
        component: Service_type
    },
    {
        path: '/staff',
        name: 'Staff',
        component: Staff
    },
    // {
    //     path: '/Modal',
    //     name: 'Modal',
    //     component: Modal
    // },
    {
        path: '/product',
        name: 'Product',
        component: Product
    },
    {
        path: '/booking',
        name: 'Booking',
        component: Booking
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    
});

export default router;
