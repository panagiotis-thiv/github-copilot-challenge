import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';
import Questions from './components/Questions.vue';

const routes = [
  { path: '/', component: App },
  { path: '/questions', component: Questions },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;