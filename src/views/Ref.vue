<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Направление</p>
          <p class="ui-title-4 center">{{prac.type}}</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>База практики:</p>
          <input class="arep" type="text" v-model="referral.pracbase">
          <p>Город:</p>
          <input class="arep" type="text" v-model="referral.city">
          <p>Приказ:</p>
          <input class="arep" type="text" v-model="referral.order">
          <p>Дата приказа:</p>
          <input class="arep" type="text" v-model="referral.orderdate">
          <p>Договор (№):</p>
          <input class="arep" type="text" v-model="referral.contractNum">
          <p>Договор (дата):</p>
          <input class="arep" type="text" v-model="referral.contractDate">
          <p>Номер направления:</p>
          <input class="arep" type="text" v-model="referral.refNum">
          <p>Курс:</p>
          <input class="arep" type="text" v-model="referral.univYear">
          <p>Руководитель практики (от предприятия):</p>
          <input class="arep" type="text" v-model="referral.pracHead" placeholder="Фамилия И. О.">
          <p>Декан</p>
          <input class="arep" type="text" v-model="referral.dean" placeholder="Фамилия И. О.">
          <p>Производственный объект:</p>
          <textarea v-model="referral.prodObj" class="textarea"></textarea>
          <p>Примерная тема:</p>
          <textarea v-model="referral.theme" class="textarea"></textarea>
          <p>Перечень материалов:</p>
          <textarea v-model="referral.listMat" class="textarea"></textarea>
          <p>Перечень графических материалов:</p>
          <textarea v-model="referral.listGraph" class="textarea"></textarea>
          <p>Выполнение программы практики:</p>
          <input class="arep" type="text" v-model="referral.pracResult">
          <p>Выполнение индивидуального задания:</p>
          <textarea v-model="referral.pracTaskRes" class="textarea"></textarea>
          <p>Характеристика студента:</p>
          <textarea v-model="referral.studChar" class="textarea"></textarea>
          <p>Замечания:</p>
          <input class="arep" type="text" v-model="referral.comment">
          <p>Рекомендации:</p>
          <input class="arep" type="text" v-model="referral.recomend">

          <div class="row">
          <div class="button button-primary" @click="saveRef">Сохранить</div>
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
        referral: '',
        student: '',
        prac: ''
    }),

    async mounted() {
        this.pid = this.$route.query.prac
        this.sid = this.$route.query.stud
        // console.log(this.pid)
        // console.log(this.sid)
        var pid = this.pid
        var sid = this.sid
        this.referral = await this.$store.dispatch('getRefById', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.referral.sid)
        this.prac = await this.$store.dispatch('getPracById', this.pid)
        Object.assign(this.referral, {log: this.sid});

        //console.log(this.student)
        //console.log(this.referral)
        //console.log(this.student)
        //console.log(this.prac)
    },

    methods: {

        async saveRef(){
        //console.log('saveRep')
        //console.log(this.report)
        try{
        await this.$store.dispatch('UpdateRef', this.referral)
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