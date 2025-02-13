import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router'; // Убедитесь, что путь к router корректен

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    async fetchUser({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/me', {
          headers: {
            'Authorization': `Bearer ${token}` // Исправленный заголовок
          }
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          commit('logout');
          router.push('/login');
        }
      }
    }
  },
  getters: {
    user: state => state.user
  }
});