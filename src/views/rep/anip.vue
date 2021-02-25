<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Научно-исследовательская практика: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Место прохождения практики:</p>
          <input class="arep" type="text" v-model="report.pracBase">
          <p>Руководитель практики:</p>
          <input class="arep" type="text" v-model="report.pracHead" >
          <p>Описание места прохождения практики:</p>
          <textarea v-model="report.placeDesc" class="textarea"></textarea>
          <p>Описание исследуемой области:</p>
          <textarea v-model="report.researchArea" class="textarea"></textarea>
          <p>Постановка индивидуального задания:</p>
          <textarea v-model="report.personalTask" class="textarea"></textarea>
          <p>Используемые исследовательские технологии:</p>
          <textarea v-model="report.usedRes" class="textarea"></textarea>
          <p>Выводы по практике:</p>
          <textarea v-model="report.conclusion" class="textarea"></textarea>
          <p>Используемая литература:</p>
          <textarea v-model="report.usedLit" class="textarea"></textarea>
          <p>Подготовленные публикации:</p>
          <textarea v-model="report.usedPubl" class="textarea"></textarea>
          <div class="row">
          <div class="button button-primary" @click="saveRep">Сохранить</div>
          <div class="button button-light doc" @click="createDoc">Создать документ</div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<script>
export default {
    data: () => ({
        pid: '',
        sid: '',
        report: '',
        student: '',
    }),

    async mounted() {
     
        this.pid = this.$route.query.prac
        this.sid = this.$route.query.stud
        //console.log(this.idRep)
        var pid = this.pid
        var sid = this.sid
        this.report = await this.$store.dispatch('getAnipByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
       // console.log(this.student)
        Object.assign(this.report, {log: this.sid});
       
        //console.log(this.idRep)
        //console.log(this.report)
        //console.log(this.student)
    },

    methods: {

        async saveRep(){
        //console.log('saveRep')
        //console.log(this.report)
        try{
        await this.$store.dispatch('UpdateAnip', this.report)
        this.$success("Успешно обновлено")
        }
        catch (e) {
          this.$error("Ошибка при обновлении!")
        }
      },

      createDoc(){
            console.log('create doc')
      }


    }

    
}
</script>

<style lang="scss">

</style>
