<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
        <p class="ui-title-4 center">Дневник практики: {{prac.type}} </p>
        <p class="ui-title-4 center">{{stud[0].fname}}</p>
        
        <table class="ui-table ui-table--hover preview">
        <thead>
        <tr>
        <th width="130px"><span>Дата</span></th>
        <th><span>Описание работ</span></th>
        <th width="140px"><span></span></th>
         </tr>
        </thead>
        <tbody>
        <tr v-for="day in pd"
         v-bind:data="day"
        v-bind:key= day.date
         >
        <td><span class="ui-text-smaller table">{{day.date}}</span></td>
        <td><span class="ui-text-smaller table">{{day.text}}</span></td>
        <td><button class="button button-warning edit" v-on:click="edit(day)">Изменить</button></td>
      </tr>
    </tbody>
    </table>
      <br>
      <div class="button button-light doc" @click="createDoc">Создать документ</div>
      </div>
      </div>    
    </body>

    <!--Message Box Edit-->
        <div class="ui-messageBox__wrapper" v-if="EditButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">{{day.date}}</span>
             <span class="button-close ui-messageBox-close" @click="cancelEdit"></span></div>
             <div class="ui-messageBox__content"><span>Описание работ</span>
             <textarea v-model="day.text" class="dparea"  @keyup.esc="cancelEdit"></textarea>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelEdit">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishEdit">Сохранить</div>
              </div>
              </div>
              </div>
        <!--Message Box Edit-->
  </html>
</template>

<script>
import { format, parse } from "date-fns";

export default {
    data: () => ({
        pid: '',
        sid: '',
        pd: [],
        prac: '',
        day: '',
        EditButton: false,
        stud: [{fname: ''}],
        format: 'dd.MM.yyyy',
        format1: 'dd_MM_yyyy',
    }),

    async mounted() {
        this.pid = this.$route.query.prac
        this.sid = this.$route.query.stud

        this.prac = await this.$store.dispatch('getPracById', this.pid)
        this.stud = await this.$store.dispatch('getStudByLogin', this.sid)

        var pid = this.pid
        var sid = this.sid
        this.pd = await this.$store.dispatch('getPd', {pid, sid})

        this.pd.forEach(day => {
            day.date = day.date.replace(/_/g,".")
            day.date = this.toDate(day.date)
        });
        this.pd = this.pd.slice().sort((a, b) => a.date - b.date)
        this.pd.forEach(day => {
            day.date = this.customFormatter(day.date, 0)
            //console.log(day)
        });

        //this.report = await this.$store.dispatch('getAniByID', this.idRep)
        //this.student = await this.$store.dispatch('getStudById', this.report.sid)
        //console.log(this.report)
        //console.log(this.student)
    },

    methods: {
    toDate (dateStr) {
    const [day, month, year] = dateStr.split(".")
    return new Date(year, month - 1, day)
    },

    customFormatter(date, task) {
      if (task == 0)
      return format(date, this.format)
      else return format(date, this.format1)
    },
    

    edit(day){
        this.day = day
        this.EditButton = true
    },

    cancelEdit(){
      this.EditButton = false
      this.day = ''
    },

    async finishEdit(){
      //console.log(this.day)
      var pid = this.pid
      var sid = this.sid
      var date = this.toDate(this.day.date)
      date = this.customFormatter(date, 1)
      var text = this.day.text
      try{
      await this.$store.dispatch('UpdatePDay', {pid, sid, date, text})
      this.$success("Успешно обновлено")
      }catch (e) {
          this.$error("Ошибка при обновлении!")
        }
      this.cancelEdit()
    },

    createDoc(){
      console.log('createDOc')
    }
    }

    
}
</script>

<style lang="scss">
.ui-text-smaller.table{
  color: #000;
}
.ui-table{
    width: 80%;
}
</style>
