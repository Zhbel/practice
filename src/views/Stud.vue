<template>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
        
        <div class="ui-card ui-card--shadow-always head">
          <p class="ui-title-5"><b>ФИО:</b> {{user.fname}}</p>
          <p class="ui-title-5"><b>Группа:</b> {{group.title}}</p>
        </div>
        <label class="ui-title-4 center">Мои работы</label>
        <!--Prac Card-->
          <div class="row" v-if="loadPrac">
            <div class="ui-card ui-card--shadow-always prac"
                    v-for="(prac) in prac"
                    v-bind:data="prac"
                    v-bind:key= prac.id
                    >
                      <div class="group__info">
                      <p class="ui-title-4 center">{{prac.title}}</p>
                      <p class="ui-text-regular"><b>Тип: </b>{{prac.type}}</p>
                      <p class="ui-text-regular"><b>Руководитель: </b>{{filterHead(prac.pid)[0].fname}}</p>
                      <p class="ui-text-regular"><b>Дата начала: </b> {{prac.datestart}}</p>
                      <p class="ui-text-regular"><b>Дата окончания: </b> {{prac.dateend}}</p>
                        <div class="row">
                        <button class="button button-light prac" v-on:click="openPrac(prac)">Открыть</button>
                      </div>
                    </div>
                    </div> 
        </div>
        <p class="ui-title-5" v-else>{{textinfo}}</p>
        <!--Prac Card-->
        </div>

         <!--Message Box OpenPrac-->
            <div class="ui-messageBox__wrapper" v-if="openPracBox"  style="display: flex;">
            <div class="ui-messageBox fadeInDown prac" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">
               {{currentPrac.title}}</span>
             <span class="button-close ui-messageBox-close" @click="closePrac"></span></div>
             <div class="ui-messageBox__content">
            <div class="openPrac">
            <button class="button button--round button-light openprc" v-on:click="openDirect(currentPrac)">Направление</button>
            <button class="button button--round button-light openprc" v-on:click="openRep(currentPrac)">Отчет</button>
            <button class="button button--round button-light openprc" v-on:click="openDiary(currentPrac)">Дневник практики</button>
             </div>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-primary ui-messageBox-ok" @click="closePrac">Закрыть</div>
              </div>
              </div></div>
        <!--Message Box OpenPrac-->
      </div>
    </body>
</template>

<script>
export default {
    data: () => ({
        user: '',
        group: '',
        prac: [],
        heads: [],
        edlvls: [],
        tmpdir: {
        practype: '',
        pid: '',
        sid: '',
        pracbase: '',
        city: '',
        order: '',
        orderdate: '',
        contractNum: '',
        contractDate: '',
        refNum: '',
        univYear: '',
        pracHead: '',
        dean: '',
        prodObj: '',
        theme: '',
        listMat: '',
        listGraph: '',
        pracResult: '',
        pracTaskRes: '',
        studChar: '',
        comment: '',
        recomend: ''
        },
        loadPrac: false,
        openPracBox: false,
        currentPrac: '',
        textinfo: '',
        loadPrac: false
    }),
    
    async mounted(){
       this.user = await this.$store.dispatch('getStudId'),
       //console.log(this.user)
       this.group = await this.$store.dispatch('getGroupById', this.user.grid)
       this.prac = await this.$store.dispatch('getPracGr', this.user.grid)
       this.heads = await this.$store.dispatch('getHeads')
       this.edlvls = await this.$store.dispatch('getPracList')
        //console.log(this.stud)
        if (this.prac.length != 0){
            this.loadPrac = true
        } else {
           this.textinfo = 'У вашей группы ' + this.group.title + ' нет практик'
        }
     },

     methods:{
        filterHead(pHead){
        return this.heads.filter( head => {
          return head.id == pHead
        })
       },

         openDirect(prac){

        },

       async openRep(prac){
        var edlevel = this.group.edlvl
        var uid = await this.$store.dispatch('getUid')
        alert('load from ' +
          (this.edlvls.find(edlvl => edlvl.title == prac.type && edlvl.edlvl == edlevel)).tablename + ' query ' + prac.id + ' stud ' + uid)
        },

        openDiary(prac){

        },

        openPrac(prac){
          this.currentPrac = this.prac.find(pract => pract.id == prac.id)
          //console.log(this.currentPrac)
          //  alert(prac.id)
          this.openPracBox = true
        },
        
        closePrac(){
          this.currentPrac = '',
          this.openPracBox = false
        }
         
     }
}
</script>

<style lang="scss">
.ui-card.prac{
  width: 30%;
  margin-bottom: 2%;
  margin-left: 1%;
}
.ui-card.head{
  margin-top: 2%;
  margin-bottom: 2%;
  max-width: max-content;
}
.openPrac{
  width: 80%;
}
.button.openprc{
  display: block;
  width: inherit;
  margin: 2%;
}
.button.prac{
  width: max-content;
  font-size: 90%;
  margin-left: 1%;
  margin-bottom: 1%;
}
</style>