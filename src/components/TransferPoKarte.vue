<template>
  <div class="osnovnoe">
    <div class="top-menu">
      <div class="name" align="left">
        <img src="@/assets/Group.png" align="center">
        QwiqPay
      </div>
      <nav class="menu">
        <button class="btn1" @click="navigateToDashBoard">Главная</button>
        <button class="btn1" @click="transferFromTo">Операции</button>
        <button class="btn2" @click="payments">Перевести</button>
      </nav>
    </div>
    <div style="padding-top: 150px;"></div>

    <div class="nazvanie">Перевод по номеру карты</div>

    <div class="container_3">
      <div class="currency-rates">
        <ul class="currency-list">
          <li v-for="(rate, currency) in filteredExchangeRates" :key="currency" class="currency-item">
            {{ currency }}: {{ rate }}
          </li>
        </ul>
      </div>
    </div>
    <div>
    <div class="container">
      <div class="card-form" v-if="user">
        <img src="@/assets/Group 8.png">
        <p style="padding-left: 80%;">{{ user.Balance }} ₽</p>
      </div>
      <div class="container_4">
        <form @submit.prevent="transferMoney">
          <div class="perevod">
            <label style="color: darkslateblue">Номер карты получателя</label><br>
            <input class="vvod" type="text" v-model="cardNumber" @input="fetchRecipientName" required><br>
            <p v-if="recipientName" style="color: darkslateblue">Получатель: {{ recipientName }}</p>
          </div>
          <div class="sum">
            <input placeholder="От 1 ₽ до 200 000 000 ₽" style="color: white" class="vvod_1" type="text" v-model="amount" required><br>
          </div>
          <button class="btn7" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import router from '@/router';

export default {
  data() {
    return {
      cardNumber: '',
      amount: null,
      exchangeRates: {},
      recipientName: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
    filteredExchangeRates() {
      const relevantCurrencies = ['USD', 'EUR', 'RUB']; // Replace with your desired currencies
      let filteredRates = {};
      for (let currency of relevantCurrencies) {
        if (this.exchangeRates[currency]) {
          filteredRates[currency] = this.exchangeRates[currency];
        }
      }
      return filteredRates;
    },
  },
  methods: {
    transferMoney() {
      const token = localStorage.getItem('token');
      axios.post('http://localhost:3000/TransferPoKarte', {
        cardNumber: this.cardNumber,
        amount: this.amount
      }, {
        headers: {
          'Authorization': token
        }
      })
        .then(response => {
          alert(response.data.message); // Показать сообщение об успешном переводе
          this.$router.push('/DashBoard'); // Переход на главную страницу после успешного перевода
        })
        .catch(error => {
          console.error('Transfer error:', error);
          if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error);
          }
        });
    },
    fetchRecipientName() {
      if (this.cardNumber.length >= 16) {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3000/getRecipientName/${this.cardNumber}`, {
          headers: {
            'Authorization': token
          }
        })
          .then(response => {
            this.recipientName = response.data.name + ' ' + response.data.surname;
          })
          .catch(error => {
            console.error('Ошибка при получении имени получателя:', error);
            this.recipientName = '';
          });
      } else {
        this.recipientName = '';
      }
    },
    navigateToDashBoard() {
      this.$router.push('/dashboard');
    },
    transferFromTo() {
      router.push('/historyPerevodov');
    },
    fetchExchangeRates() {
      const apiKey = '963e1939cabb02f351541ab7'; // Replace with your actual API key
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

      axios.get(apiUrl)
        .then(response => {
          this.exchangeRates = response.data.conversion_rates;
        })
        .catch(error => {
          console.error('Ошибка при получении курсов валют', error);
        });
    }
  },
  created() {
    if (!this.user) {
      this.$store.dispatch('fetchUser');
    }
    this.fetchExchangeRates();
  }
};
</script>

<style src="@/styles/global.css" scoped>
</style>
