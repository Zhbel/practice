<template>
<body>
<div class="wrapper login">
    <section>
    <form class="container container--small" @submit.prevent="submitLog">
      <div class="ui-card" >
        <p class="ui-title-3 center">Авторизация</p>
         <p class="ui-title-5">Логин</p>
         <br>
         <input type="text" placeholder="Login" width="48" 
         v-model.trim="login"
         :class="{invalid: ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.minLength)}"
        
         >
         <div class="ui-text-smaller error" v-if="!$v.login.required && redmsg == true">Поле Логин пустое</div>
         <div class="ui-text-smaller error" v-if="!$v.login.minLength && redmsg == true">Минимальная длина логина {{$v.login.$params.minLength.min}} символов. Сейчас он {{login.length}}</div>
         <p class="ui-title-5">Пароль</p>
         <br>
         <input  id="password" type="password" placeholder="Password" 
         v-model.trim="password"
         :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
         >
         <div class="ui-text-smaller error" v-if="!$v.password.required && redmsg == true">Поле Пароль пустое</div>
         <div class="ui-text-smaller error" v-if="!$v.password.minLength && redmsg == true">Минимальная длина пароля {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</div>
         <button class="button button--round button-primary" type="submit">Войти</button>
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
      user: ''
    }),

    validations: {
      login: {required, minLength: minLength(5)},
      password: {required, minLength: minLength(6)}
    },
  
    mounted(){
      if (messages[this.$route.query.message]){
        this.$message(messages[this.$route.query.message])
      }

      if (messages[this.$route.query.error]){
        this.$error(messages[this.$route.query.error])
      }
    },

    methods: {
    async submitLog() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.redmsg = true
        console.log('error')
        return
      }
      this.redmsg = false
      const formData = {
        login: this.login + '@practice.vtik',
        password: this.password
      }
      try{
        await this.$store.dispatch('login', formData)
        this.user = await this.$store.dispatch('getHeadInfo')
       // console.log(Object.keys(this.user).length)
        //console.log(this.user.length)
        if (Object.keys(this.user).length != 0){
          this.$router.push('/head')
        } else{
          this.$router.push('/stud')
        }
        //
      } catch (e) {}
      
      //console.log(formData)
    }
  }
  }
</script>

<style lang="scss"> 
.ui-text-smaller.error{
  color: red;
  margin-bottom: 5%;
}

.wrapper.login{
  background-color: #DCDFE6;
  align-content: center;
}
.ui-card{
  width: 60% !important;
  align-content: center;
  margin: 0 auto;
}
</style>