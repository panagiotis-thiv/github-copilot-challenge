import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import QuestionsPage from './components/Questions.vue';
import SummaryPage from './components/SummaryPage.vue';
import MainPage from './components/MainPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/questions', component: QuestionsPage, name: "QuestionsPage" },
  { path: '/summary', component: SummaryPage, name: 'SummaryPage' },
  { path: '/main', component: MainPage, name: 'MainPage' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
