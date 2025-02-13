<template>
  <div class="osnovnoe">
      <div class="top-menu">
        <div class="name" align="left">
          <img src="@/assets/Group.png" align="center">
          QwiqPay
        </div>
        <nav class="menu">
          <button class="btn1" @click="DashBoard">Главная</button>
          <button class="btn2" @click="transferFromTo">Операции</button>
          <button class="btn1" @click="navigateToTransfer">Перевести</button>
        </nav>
      </div>
          <div style="padding-top: 150px;"></div>
      <div class="text" style="padding-left: 5%" v-if="user">
        {{ greeting }} 
      </div>
  <div class="nazvanie">История переводов</div>
      </div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th style="color:black">Дата</th>
            <th style="color:black">Сумма</th>
            <th style="color:black">Отправитель</th>
            <th style="color:black">Получатель</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ formatDate(transaction.dateSanding) }}</td>
            <td>{{ transaction.transferAmount }}</td>
            <td>{{ transaction.senderName }}</td>
            <td>{{ transaction.recipientName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import moment from 'moment';
  import router from '@/router';
  
  export default {
    data() {
      return {
        transactions: []
      };
    },
    computed: {
      ...mapGetters(['user'])
    },
    created() {
      this.fetchTransactions();
    },
    methods: {
      async fetchTransactions() {
        try {
          const token = localStorage.getItem('token'); // Предполагается, что токен хранится в localStorage
          const response = await axios.get('http://localhost:3000/transactionHistory', {
            headers: {
              'Authorization': token
            }
          });
          this.transactions = response.data;
        } catch (error) {
          console.error('Ошибка при получении истории транзакций:', error);
        }
      },
      formatDate(date) {
        return moment(date).format('HH:mm DD.MM.YYYY');
      },
      DashBoard() {
        router.push('/dashboard');
      },
          navigateToTransfer() {
        router.push('/transferFromTo');
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px 12px;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  </style>
  <style src="@/styles/global.css" scoped>
  </style>