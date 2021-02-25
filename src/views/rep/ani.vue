<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Научное исследование: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Полугодие:</p>
          <input class="arep" type="text" v-model="report.halfyear">
          <p>Работы до диссертации:</p>
          <textarea v-model="report.workbefore" class="textarea"></textarea>
          <p>Опубликованные работы:</p>
          <textarea v-model="report.publicW" class="textarea"></textarea>
          <p>Участие в конференциях:</p>
          <textarea v-model="report.conf" class="textarea"></textarea>
          <p>Другие виды работ:</p>
          <textarea v-model="report.other" class="textarea"></textarea>
          <p>Отзыв руководителя:</p>
          <textarea v-model="report.review" class="textarea"></textarea>
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
        this.report = await this.$store.dispatch('getAniByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        Object.assign(this.report, {log: this.sid});
        //console.log(this.report)
        //console.log(this.student)
    },

    methods: {

        async saveRep(){
        //console.log('saveRep')
        //console.log(this.report)
        try{
        await this.$store.dispatch('UpdateAni', this.report)
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
