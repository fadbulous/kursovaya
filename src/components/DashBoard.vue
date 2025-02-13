<template>
  <div class="osnovnoe">
    <div class="top-menu">
      <div class="name" align="left">
        <img src="@/assets/Group.png" align="center">
        QwiqPay
      </div>
      <nav class="menu">
        <button class="btn2" @click="DashBoard">Главная</button>
        <button class="btn1" @click="transferFromTo">Операции</button>
        <button class="btn1" @click="navigateToTransfer">Перевести</button>
      </nav>
    </div>
    <div style="padding-top: 110px;"></div>

    <div>
      <button @click="logout" class="logout-button">✖</button>
    </div>
    <div class="container_3">
      <div class="currency-rates">
        <ul class="currency-list">
          <li v-for="(rate, currency) in filteredExchangeRates" :key="currency" class="currency-item">
            {{ currency }}: {{ rate }}
          </li>
        </ul>
      </div>
   </div>
   <div class="container">
      <div class="card-form" v-if="user">
        <img src="@/assets/Group 8.png">
        <p style="padding-left: 80%;">{{ user.Balance }} ₽</p>
      </div>

      <div class="conteiner1">
        <button class="btn3" @click="navigateToTransfer">
          Перевести по номеру телефона
        </button>
        <button class="btn5" @click="navigateToKarta">
          Перевести по номеру карты
        </button>
        <button class="btn6" @click="transferFromTo">
          История переводов
        </button>
      </div>

      <div class="reclama">
        <div>
          <img src="@/assets/recl.jpg">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import router from '@/router';

export default {
  data() {
    return {
      exchangeRates: {},
    };
  },
  computed: {
    ...mapGetters(['user']),
    greeting() {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return 'Доброе утро,';
      } else if (currentHour < 18) {
        return 'Добрый день,';
      } else {
        return 'Добрый вечер,';
      }
    },
    filteredExchangeRates() {
      const relevantCurrencies = ['USD', 'EUR', 'RUB'];
      let filteredRates = {};
      for (let currency of relevantCurrencies) {
        if (this.exchangeRates[currency]) {
          filteredRates[currency] = this.exchangeRates[currency];
        }
      }
      return filteredRates;
    }
  },
  created() {
    this.$store.dispatch('fetchUser');
    this.fetchExchangeRates();
  },
  methods: {
    logout() {
      this.$axios.post('/logout')
        .then(response => {
          console.log(response.data.message);
          this.$store.dispatch('logout');
          localStorage.removeItem('token');
          router.push('/login');
        })
        .catch(error => {
          console.error('Ошибка при выходе из аккаунта', error);
        });
    },
    fetchExchangeRates() {
      const apiKey = '963e1939cabb02f351541ab7'; // Замените на ваш ключ API
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

      axios.get(apiUrl)
        .then(response => {
          this.exchangeRates = response.data.conversion_rates;
        })
        .catch(error => {
          console.error('Ошибка при получении курсов валют', error);
        });
    },
    navigateToTransfer() {
      router.push('/transferFromTo');
    },
    navigateToKarta() {
      router.push('/transferPoKarte');
    },
    DashBoard() {
      router.push('/dashboard');
    },
    transferFromTo() {
      router.push('/historyPerevodov');
    }
  }
};
</script>


<style src="@/styles/global.css" scoped></style>
