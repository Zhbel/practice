<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Вы вошли как Руководитель</p>
        <div class="ui-card ui-card--shadow-always head"
        @updated=;>
          
          <p class="ui-title-5"><b>ФИО:</b> {{user.fname}}</p>
          <p class="ui-title-5"><b>Кафедра:</b> {{user.depart}}</p>
          <p class="ui-title-5">({{user.abbr}})</p>
          <button class="button button-warning edit" v-on:click="editHead(user)">Редактировать информацию</button>
          <button class="button button-light edit" v-on:click="changePass()">Изменить пароль</button>
        </div>
        </div>
      </div>

      <!--Message Box-->
        <div class="ui-messageBox__wrapper" v-if="EditButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown edit" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Редактировать данные</span>
             <span class="button-close ui-messageBox-close" @click="cancelEdit"></span></div>
             <div class="ui-messageBox__content"><span>ФИО</span>
             <input type="text" v-model="fname" @keyup.esc="cancelEdit"/>
             <span>Кафедра</span>
             <input type="text" v-model="depart" @keyup.esc="cancelEdit"/>
             <span>Аббревиатура</span>
             <input type="text" v-model="abbr" @keyup.esc="cancelEdit"/>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelEdit">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishEdit">Сохранить</div>
              </div>
              </div>
              </div>
        <!--Message Box-->


        <!--Password Change-->
        <div class="ui-messageBox__wrapper" v-if="PasswordChange"  style="display: flex;">
            <div class="ui-messageBox fadeInDown edit" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Смена пароля для учетной записи {{user.login}}</span>
             <span class="button-close ui-messageBox-close" @click="cancelPassChange"></span></div>
             <div class="ui-messageBox__content"><span>Введите старый пароль</span>
             <input type="password"  v-model="oldpass" @keyup.esc="cancelPassChange"/>
             <span>Новый пароль</span>
             <input type="password" v-model="newpass" @keyup.esc="cancelPassChange"/>
             <span>Новый пароль (повторно)</span>
             <input type="password" v-model="newpassRepeat" @keyup.esc="cancelPassChange"/>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelPassChange">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishPassChange">Сменить пароль</div>
              </div>
              </div>
              </div>
        <!--Password Change-->
    </body>
  </html>
</template>



<script>

export default {
  data: () => ({
        user: '',
        EditButton: false,
        fname: '',
        depart: '',
        abbr: '',
        newid: '',
        oldpass: '',
        newpass: '',
        newpassRepeat: '',
        incorrectCounter: 0,
        PasswordChange: false,
    }),
  async mounted(){
       this.user = await this.$store.dispatch('getHeadInfo')
       //console.log(this.user)
       //this.newid = "group_" + Math.round((new Date().getTime() / 1000));
       //console.log(this.newid)
     },
  methods:{
    changePass(){
      this.PasswordChange = true
    },

    async finishPassChange(){
      if(this.oldpass == "" || this.newpass == "" || this.newpassRepeat == ""){
        this.$message("Поля не должны быть пустыми")
        return
      }

      if(this.oldpass.length < 6 || this.newpass.length < 6 || this.newpassRepeat.length < 6){
        this.$message("Минимальная длина пароля 6 символов")
        return
      }

      if(this.oldpass == this.newpassRepeat){
        this.$message("Новый и старый пароли не должны совпадать")
        return
      }
      
      if(this.oldpass != this.user.password){
        this.incorrectCounter ++
        this.$error("Неправильно введен старый пароль")
        //console.log(this.incorrectCounter)
        if (this.incorrectCounter == 3){
          await this.$store.dispatch('logout')
          this.$router.push('/login?error=hacker')
        }
      } else {
        if(this.newpass != this.newpassRepeat)
        {
          this.$message("Введеные пароли не совпадают")
        } else{
        let newpass = {
        login: this.user.login,
        oldpassword: this.oldpass,
        newpassword: this.newpassRepeat
        }
        await this.$store.dispatch('changePass', newpass)
        this.user.password = this.newpass
        await this.$store.dispatch('updateHeadPass', this.user)
        this.$success('Пароль успешно обновлен')
        this.cancelPassChange()
        }
      }
    },

    cancelPassChange(){
      this.oldpass = ''
      this.newpass = ''
      this.newpassRepeat = ''
      this.PasswordChange = false
      this.incorrectCounter = 0

    },

    editHead(user){
      this.EditButton = true
      this.fname = user.fname
      this.depart = user.depart
      this.abbr = user.abbr
      //console.log(user)
    },
    cancelEdit(){
      this.EditButton = false
      this.fname = ''
      this.depart = ''
      this.abbr = ''
    },
    async finishEdit(){
      const us_t = {
        fname: this.fname,
        depart: this.depart,
        abbr: this.abbr
      }
      //console.log(us_t)
      await this.$store.dispatch('updateHead', us_t)
      this.$success('Данные успешно обновлены')
      this.EditButton = false
      this.user = await this.$store.dispatch('getHeadInfo')
    }
  }

}

</script>

<style lang="scss">
.button.button-light{
  margin-right: 5%;
}
.ui-card.head{
  width: max-content;
}
.button.edit{
  font-size: 85%;
  width: max-content;
  color:black;
}


</style>
