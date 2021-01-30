<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Учебно-ознакомительная практика: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Программирование:</p>
          <textarea v-model="report.programmingTask" class="textarea"></textarea>
          <p>Кодирование данных:</p>
          <textarea v-model="report.dataCodeTask" class="textarea"></textarea>
          <p>Результаты выполнения тестовых заданий:</p>
          <textarea v-model="report.taskResults" class="textarea"></textarea>
          <p>Выводы по практике:</p>
          <textarea v-model="report.conclusion" class="textarea"></textarea>
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
        idRep: '',
        report: '',
        student: '',
    }),

    async mounted() {
        this.idRep = this.$route.query.report
        //console.log(this.idRep)
        this.report = await this.$store.dispatch('getByopByID', this.idRep)
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        Object.assign(this.report, {id: this.idRep});
        //console.log(this.report)
        //console.log(this.student)
    },

    methods: {

        async saveRep(){
        //console.log('saveRep')
        //console.log(this.report)
        try{
        await this.$store.dispatch('UpdateByop', this.report)
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
