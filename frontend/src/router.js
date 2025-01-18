import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import QuestionsPage from './components/Questions.vue';
import SummaryPage from './components/SummaryPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/questions', component: QuestionsPage },
  { path: '/summary', component: SummaryPage, name: 'SummaryPage' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
