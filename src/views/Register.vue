<template>
<body>
<div class="wrapper login">
    <section>
    <form class="container container--small" @submit.prevent="submitReg">
      <div class="ui-card" >
        <p class="ui-title-3 center">Регистрация</p>
         <p class="ui-title-5 title">Логин</p>
         <input type="text" placeholder="Login" width="48"
          v-model.trim="login"
         :class="{invalid: ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.minLength)}"
        >
         <div class="ui-text-smaller error" v-if="!$v.login.required && redmsg == true">Поле Логин пустое</div>
         <div class="ui-text-smaller error" v-if="!$v.login.minLength && redmsg == true">Минимальная длина логина {{$v.login.$params.minLength.min}} символов. Сейчас он {{login.length}}</div>
         <p class="ui-title-5 title">Пароль</p>
         <input type="text" placeholder="Password"
          v-model.trim="password"
         :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
         >
         <div class="ui-text-smaller error" v-if="!$v.password.required && redmsg == true">Поле Пароль пустое</div>
         <div class="ui-text-smaller error" v-if="!$v.password.minLength && redmsg == true">Минимальная длина пароля {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</div>
         <p class="ui-title-5 title">ФИО</p>
         <input type="text" placeholder="Петров Емельян Эльдарович"
          v-model.trim="fname"
         :class="{invalid: ($v.fname.$dirty && !$v.fname.required) || ($v.fname.$dirty && !$v.fname.minLength)}"
        >
         <div class="ui-text-smaller error" v-if="!$v.fname.required && redmsg == true">Поле ФИО пустое</div>
         <div class="ui-text-smaller error" v-if="!$v.fname.minLength && redmsg == true">Минимальная длина ФИО {{$v.fname.$params.minLength.min}} символов. Сейчас он {{fname.length}}</div>
         <p class="ui-title-5 title">Кафедра</p>
         <input type="text" placeholder="Вычислительная техника и инженерная кибернетика"
         v-model.trim="depart"
         :class="{invalid: ($v.depart.$dirty && !$v.depart.required)}"
         >
         <div class="ui-text-smaller error" v-if="!$v.depart.required && redmsg == true">Поле Кафедра пустое</div>
         <p class="ui-title-5 title">Аббревиатура кафедры</p>
         <input type="text" placeholder="ВТИК"
         v-model.trim="abbr"
         :class="{invalid: ($v.abbr.$dirty && !$v.abbr.required)}"
         >
         <div class="ui-text-smaller error" v-if="!$v.abbr.required && redmsg == true">Поле Аббревиатура пустое</div>
         <button class="button button--round button-primary" type="submit">Зарегистрироваться</button>
    </div>
    </form>
    </section>
</div>
</body>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  data: () => ({
      redmsg: false,
      login: '',
      password: '',
      fname: '',
      depart: '',
      abbr: '',
      ds: ''
    }),

    validations: {
      login: {required, minLength: minLength(5)},
      password: {required, minLength: minLength(6)},
      fname: {required, minLength: minLength(20)},
      depart: {required},
      abbr: {required}
    },

    methods: {
    async submitReg() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.redmsg = true
        console.log('error')
        return
      }
      this.redmsg = false
      const formData = {
        login: this.login,
        password: this.password,
        fname: this.fname,
        depart: this.depart,
        abbr: this.abbr
      }

      try{
        await this.$store.dispatch('registerHead', formData)
        this.$router.push('/head')
      } catch (e) {

      }
     // console.log(formData)
      
     //this.$router.push('/head')
    }
  }
    }
</script>

<style lang="scss">
.ui-title-5.title{
  margin-bottom: 2%;
}
.ui-text-smaller.error{
  color: red;
  margin-bottom: 5%;
}

.wrapper.login{
  background-color: #DCDFE6;
}
.ui-card{
  width: 60% !important;
  align-content: center;
  margin: 0 auto;
}
</style>