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
        //console.log(this.pid)
        this.report = await this.$store.dispatch('getMptpByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        Object.assign(this.report, {log: this.sid});

       // console.log(this.report)
       // console.log(this.student)
    },

    methods: {

        async saveRep(){
       // console.log('saveRep')
       // console.log(this.report)
        try{
            await this.$store.dispatch('UpdateMptp', this.report)
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