<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Производственно-технологическая практика: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Введение:</p>
          <textarea v-model="report.intro" class="textarea"></textarea>
          <p>Характеристика предприятия:</p>
          <textarea v-model="report.baseChar" class="textarea"></textarea>
          <p>Характеристика оборудования:</p>
          <textarea v-model="report.equipChar" class="textarea"></textarea>
          <p>Используемые программные продукты:</p>
          <textarea v-model="report.progChar" class="textarea"></textarea>
          <p>Результат выполнения индивидуальных заданий:</p>
          <textarea v-model="report.result" class="textarea"></textarea>
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
        this.report = await this.$store.dispatch('getBptpByID', this.idRep)
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
            await this.$store.dispatch('UpdateBptp', this.report)
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