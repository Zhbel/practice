<template>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
        
        <div class="ui-card ui-card--shadow-always head">
          <p class="ui-title-5"><b>ФИО:</b> {{stud.fname}}</p>
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
import { format, parse } from "date-fns";

export default {
    data: () => ({
        stud: '',
        group: '',
        prac: [],
        heads: [],
        edlvls: [],
        selprac: [],
        tmpdir: {
                  login: '',
                  practype: '',
                  pid: '',
                  sid: '',
                },
        
        loadPrac: false,
        openPracBox: false,
        format: 'dd_MM_yyyy',
        practable: '',
        currentPrac: '',
        textinfo: '',
        loadPrac: false
    }),
    
    async mounted(){
       var sid = await this.$store.dispatch('getUid')
       this.stud = await this.$store.dispatch('getStudId'),
       Object.assign(this.stud, {id: sid});
       //console.log(this.user)
       this.group = await this.$store.dispatch('getGroupById', this.stud.grid)
       this.prac = await this.$store.dispatch('getPracGr', this.stud.grid)
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

        toDate (dateStr) {
        const [day, month, year] = dateStr.split(".")
        return new Date(year, month - 1, day)
        },

        customFormatter(date) {
        //const moment = require('moment')
        return format(date, this.format)
        //return moment(date).format('DD-MM-yyyy');
        },

        customParser(date) {
          return parse(date, this.format, new Date())
        },

        filterHead(pHead){
        return this.heads.filter( head => {
          return head.id == pHead
        })
       },

         openDirect(prac){
           this.$router.push('/Ref?prac=' + prac.id + '&stud=' + this.stud.login)
        },

        async openRep(prac){
        //var id = prac.id + '_' + this.stud.login
        var edlevel = (await this.$store.dispatch('getGroupById', this.stud.grid)).edlvl
        var tablename = (this.edlvls.find(edlvl => edlvl.title == prac.type && edlvl.edlvl == edlevel)).tablename
        //console.log(tablename)


        switch (tablename) {
              case 'pracAnip':
                this.$router.push('/rep/anip?prac=' + prac.id + '&stud=' + this.stud.login)
                break;
              case 'pracAni':
                this.$router.push('/rep/ani?prac=' + prac.id + '&stud=' + this.stud.login)
                break;
              case 'pracApp':
                this.$router.push('/rep/app?prac=' + prac.id + '&stud=' + this.stud.login)
               // console.log('switch pracApp')

                break;
              case 'pracByop':
                this.$router.push('/rep/byop?prac=' + prac.id + '&stud=' + this.stud.login)
               // console.log('switch pracByop')

                break;
              case 'pracByNIR':
                this.$router.push('/rep/byNIR?prac=' + prac.id + '&stud=' + this.stud.login)
               // console.log('switch pracByNIR')

                break;
              case 'pracBptp':
                this.$router.push('/rep/bptp?prac=' + prac.id + '&stud=' + this.stud.login)
               // console.log('switch pracBptp')

                break;
              case 'pracBpdp':
                this.$router.push('/rep/bpdp?prac=' + prac.id + '&stud=' + this.stud.login)
               // console.log('switch pracBpdp')
                break;
              case 'pracMyop':
               // console.log('switch pracMyop')
               this.$router.push('/rep/myop?prac=' + prac.id + '&stud=' + this.stud.login)

                break;
              case 'pracMpNIR':
               // console.log('switch pracMpNIR')
               this.$router.push('/rep/mpNIR?prac=' + prac.id + '&stud=' + this.stud.login)

                break;
              case 'pracMptp':
               // console.log('switch pracMptp')
               this.$router.push('/rep/mptp?prac=' + prac.id + '&stud=' + this.stud.login)

                break;
              default:
                console.log('switch default')
                break;
            }

        //alert('load from ' +
          //(this.edlvls.find(edlvl => edlvl.title == prac.type && edlvl.edlvl == edlevel)).tablename + ' query ' + id)
        
        
        
        },

        async openDiary(prac){
            var pid = prac.id
            var sid = this.stud.login
            var getPd = await this.$store.dispatch('getPd', {pid, sid})

            if(Object.keys(getPd) != 0){
              this.$router.push('/pd?prac=' + prac.id + '&stud=' + this.stud.login)
            }
            else{
           var datetest = [];
            var tmp = this.toDate(this.currentPrac.datestart)

            while(tmp <= this.toDate(this.currentPrac.dateend)){
              //console.log(tmp)
              datetest.push(this.customFormatter(tmp))
              tmp.setDate(tmp.getDate() + 1)
            }

            datetest.forEach(async date => {
            
            await this.$store.dispatch('addPd', {pid, sid, date})
          });
          this.$router.push('/pd?prac=' + prac.id + '&stud=' + this.stud.login)
        }
        },

        async openPrac(prac){
          try{
          this.currentPrac = this.prac.find(pract => pract.id == prac.id)

          
          var pid = prac.id
          var sid = this.stud.login
          this.selprac = await this.$store.dispatch('getRefById', { pid, sid})

         

           //console.log(prac.id)
           //console.log(sid)


         //console.log(this.selprac)

        // console.log(Object.keys(this.selprac))

          if(Object.keys(this.selprac) != 0){
           // console.log('joined if')
            this.openPracBox = true
          } else{
           //console.log('joined else')
            this.tmpdir.login = this.stud.login
            this.tmpdir.practype = prac.type
            this.tmpdir.pid = prac.id
            this.tmpdir.sid = this.stud.id
           
            //console.log(this.tmpdir)
            await this.$store.dispatch('addRef', this.tmpdir)
            var edlevel = (await this.$store.dispatch('getGroupById', this.stud.grid)).edlvl
            this.practable = this.edlvls.find(edlvl => edlvl.title == prac.type && edlvl.edlvl == edlevel).tablename

             switch (this.practable) {
              case 'pracAnip':
               // console.log('switch pracAnip')
                var tmpAnip = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addAnip', tmpAnip)
                break;
              case 'pracAni':
               // console.log('switch pracAni')
                var tmpAni = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addAni', tmpAni)
                break;
              case 'pracApp':
               // console.log('switch pracApp')
                var tmpApp = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addApp', tmpApp)
                break;
              case 'pracByop':
               // console.log('switch pracByop')
                var tmpByop = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addByop', tmpByop)
                break;
              case 'pracByNIR':
               // console.log('switch pracByNIR')
                var tmpByNIR = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addByNIR', tmpByNIR)
                break;
              case 'pracBptp':
               // console.log('switch pracBptp')
                var tmpBptp = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addBptp', tmpBptp)
                break;
              case 'pracBpdp':
               // console.log('switch pracBpdp')
                var tmpBpdp = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addBpdp', tmpBpdp)
                break;
              case 'pracMyop':
               // console.log('switch pracMyop')
                var tmpMyop = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addMyop', tmpMyop)
                break;
              case 'pracMpNIR':
               // console.log('switch pracMpNIR')
                var tmpMpNIR = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addMpNIR', tmpMpNIR)
                break;
              case 'pracMptp':
               // console.log('switch pracMptp')
                var tmpMptp = {
                  log: this.stud.login,
                  pid: prac.id,
                  sid: this.stud.id,
                }
                await this.$store.dispatch('addMptp', tmpMptp)
                break;
              default:
                console.log('switch default')
                break;
            }

            
            this.tmpdir = {
                  id: '',
                  practype: '',
                  pid: '',
                  sid: '',
                },
            this.openPracBox = true
          }

          
          
          //console.log(this.practable)

         


          //console.log(this.practable)
          //console.log(this.currentPrac)
          //  alert(prac.id)
          
          }
          catch (e){

          }
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