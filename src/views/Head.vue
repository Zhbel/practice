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
          <button class="button button-light edit" v-on:click="changePass(user)">Изменить пароль</button>
        </div>
        </div>
      </div>

      <!--Message Box-->
        <div class="ui-messageBox__wrapper" v-if="EditButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown" @click.stop="">
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
        password: '',
        newid: '',
    }),

  async mounted(){
       this.user = await this.$store.dispatch('getHeadInfo')
       //console.log(this.user)
       //console.log(this.user)
       //this.newid = "group_" + Math.round((new Date().getTime() / 1000));
       //console.log(this.newid)
     },
  methods:{
    changePass(user){
      console.log(user)
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
  margin: 2%;
}
.button.edit{
  font-size: 85%;
  width: max-content;
  color:black;
}
</style>
