import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import QuestionsPage from './components/Questions.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/questions', component: QuestionsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
