<template>
<div class="fon" style="background-color: #ffffff;" >
  <div class="name_1" align="left">
      <img src="@/assets/Group.png" align="center">
      QwiqPay
   </div>
   <div class="container_for_regAndLog">
    <div class="registration-form">
    <h1>SingUp to QwiqPay</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="surname">Фамилия:</label>
        <input type="text" id="surname" v-model="surname" @input="validateSurname" required>
        <span v-if="surnameError" class="error">{{ surnameError }}</span>
      </div>
      <div class="form-group">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="name" @input="validateName" required>
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>
      <div class="form-group">
        <label for="patronymic">Отчество:</label>
        <input type="text" id="patronymic" v-model="patronymic" @input="validatePatronymic" required>
        <span v-if="patronymicError" class="error">{{ patronymicError }}</span>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Номер телефона:</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" @input="validatePhoneNumber" required>
        <span v-if="phoneNumberError" class="error">{{ phoneNumberError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" @input="validatePassword" required>
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
      <div class="form-group">
        <label for="birthday">Дата рождения:</label>
        <input type="date" id="birthday" v-model="birthday" required>
      </div>
      <div class="form-group">
        <label>Пол:</label>
        <div>
          <label>
            <input type="radio" v-model="genderId" :value="1">
            Мужской
          </label>
        </div>
        <div>
          <label>
            <input type="radio" v-model="genderId" :value="2">
            Женский
          </label>
        </div>
      </div>
      <button class="button" type="submit">SingIn</button>
      <button class="button" type="button" @click="navigateToLogin">SingUp</button>
    </form>
  </div>
   </div> 
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegistration',
  data() {
    return {
      surname: '',
      name: '',
      patronymic: '',
      phoneNumber: '',
      password: '',
      birthday: '',
      genderId: null,
      surnameError: '',
      nameError: '',
      patronymicError: '',
      phoneNumberError: '',
      passwordError: '',
    };
  },
  methods: {
    validateSurname() {
      const regex = /^[A-Za-zА-Яа-яЁё]+$/;
      this.surnameError = regex.test(this.surname) ? '' : 'Фамилия должна содержать только буквы';
    },
    validateName() {
      const regex = /^[A-Za-zА-Яа-яЁё]+$/;
      this.nameError = regex.test(this.name) ? '' : 'Имя должно содержать только буквы';
    },
    validatePatronymic() {
      const regex = /^[A-Za-zА-Яа-яЁё]+$/;
      this.patronymicError = regex.test(this.patronymic) ? '' : 'Отчество должно содержать только буквы';
    },
    validatePhoneNumber() {
      const regex = /^[0-9]+$/;
      this.phoneNumberError = regex.test(this.phoneNumber) ? '' : 'Номер телефона должен содержать только цифры';
    },
    validatePassword() {
      const regex = /^[0-9]+$/;
      this.passwordError = regex.test(this.password) ? '' : 'Пароль должен содержать только цифры';
    },
    async register() {
      this.validateSurname();
      this.validateName();
      this.validatePatronymic();
      this.validatePhoneNumber();
      this.validatePassword();

      if (this.surnameError || this.nameError || this.patronymicError || this.phoneNumberError || this.passwordError) {
        console.error('Пожалуйста, исправьте ошибки в форме.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/register', {
          surname: this.surname,
          name: this.name,
          patronymic: this.patronymic,
          phoneNumber: this.phoneNumber,
          password: this.password,
          birthday: this.birthday,
          genderId: this.genderId,
        });
        console.log('Регистрация успешна:', response.data);
        this.resetForm();
        this.$router.push('/login');
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
    },
    resetForm() {
      this.surname = '';
      this.name = '';
      this.patronymic = '';
      this.phoneNumber = '';
      this.password = '';
      this.birthday = '';
      this.genderId = null;
      this.surnameError = '';
      this.nameError = '';
      this.patronymicError = '';
      this.phoneNumberError = '';
      this.passwordError = '';
    },
    navigateToLogin() {
      this.$router.push('/login'); // Перенаправление на страницу входа
    },
  },
};

</script>

<style src="@/styles/global.css" scoped>
</style>
