import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/styles/tailwind.css'  


import Login from './components/Login.vue';
import Reserve from './components/Reserve.vue';


const routes = [
  { path: '/', component: Login },
  { path: '/reserve', component: Reserve }
];


const router = createRouter({
  history: createWebHistory(), 
  routes
});

createApp(App).use(router).mount('#app');
