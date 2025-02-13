import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import UserLogin from '../components/UserLogin.vue';
import DashBoard from '../components/DashBoard.vue';
import TransferFromTo from '../components/TransferFromTo.vue';
import TransferPoKarte from '@/components/TransferPoKarte.vue';
import HistoryPerevodov from '@/components/HistoryPerevodov.vue';

const routes = [
  {
    path: '/', //окно регистрации
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login', //окно логина
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/dashboard', //главное окно
    name: 'DashBoard',
    component: DashBoard,
    meta: { requiresAuth: true }
  },
  {
    path: '/transferFromTo',
    name: 'TransferFromTo',
    component: TransferFromTo
  },
  {
    path: '/transferPoKarte',
    name: 'TransferPoKarte',
    component: TransferPoKarte
  },
  {
    path: '/historyPerevodov',
    name: 'HistoryPerevodov',
    component: HistoryPerevodov
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Проверка перед каждым переходом на маршрут
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    next('/login'); // Перенаправление на страницу входа, если пользователь не авторизован
  } else {
    next(); // Разрешение перехода
  }
});

export default router;