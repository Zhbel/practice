<template>
 <html>
    <head>
      <meta charset="utf-8" />
      <!-- ... -->
    </head>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
            <p class="ui-title-4 center">Студент {{stud[0].fname}}</p>
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
 </html>
</template>

<script>
export default {
    data: () => ({
        login: '',
        stud: [{fname: ''}],
        prac: [],
        heads: [],
        edlvls: [],
        selprac: [],
        tmpdir: {
                  id: '',
                  practype: '',
                  pid: '',
                  sid: '',
                },
        loadPrac: false,
        openPracBox: false,
        practable: '',
        currentPrac: '',
        textinfo: '',
        grtitle: '',
    }),

    async mounted() {
        this.login = this.$route.query.student
        this.stud = await this.$store.dispatch('getStudByLogin', this.login)
        this.grtitle = (await this.$store.dispatch('getGroupById', this.stud[0].grid)).title
        this.prac = await this.$store.dispatch('getPracGr', this.stud[0].grid)
        this.heads = await this.$store.dispatch('getHeads')
        this.edlvls = await this.$store.dispatch('getPracList')
        //console.log(this.stud)
        if (this.prac.length != 0){
            this.loadPrac = true
        } else {
           this.textinfo = 'У группы ' + this.grtitle + ' нет практик'
        }
        //console.log(this.stud)
    },
    
    methods: {
      async openPrac(prac){
          try{
          this.currentPrac = this.prac.find(pract => pract.id == prac.id)

          var id = prac.id + '_' + this.stud[0].login
          //console.log(id)
          this.selprac = await this.$store.dispatch('checkDir', id)
         // console.log(this.selprac)

         // console.log(Object.keys(this.selprac))

          if(Object.keys(this.selprac) != 0){
           // console.log('joined if')
            this.openPracBox = true
          } else{
           // console.log('joined else')
            this.tmpdir.id = prac.id + '_' + this.stud[0].login
            this.tmpdir.practype = prac.type
            this.tmpdir.pid = prac.id
            this.tmpdir.sid = this.stud[0].id
            await this.$store.dispatch('addDir', this.tmpdir)
            var edlevel = (await this.$store.dispatch('getGroupById', this.stud[0].grid)).edlvl
            this.practable = this.edlvls.find(edlvl => edlvl.title == prac.type && edlvl.edlvl == edlevel).tablename

             switch (this.practable) {
              case 'pracAnip':
               // console.log('switch pracAnip')
                var tmpAnip = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addAnip', tmpAnip)
                break;
              case 'pracAni':
               // console.log('switch pracAni')
                var tmpAni = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addAni', tmpAni)
                break;
              case 'pracApp':
               // console.log('switch pracApp')
                var tmpApp = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addApp', tmpApp)
                break;
              case 'pracByop':
               // console.log('switch pracByop')
                var tmpByop = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addByop', tmpByop)
                break;
              case 'pracByNIR':
               // console.log('switch pracByNIR')
                var tmpByNIR = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addByNIR', tmpByNIR)
                break;
              case 'pracBptp':
               // console.log('switch pracBptp')
                var tmpBptp = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addBptp', tmpBptp)
                break;
              case 'pracBpdp':
               // console.log('switch pracBpdp')
                var tmpBpdp = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addBpdp', tmpBpdp)
                break;
              case 'pracMyop':
               // console.log('switch pracMyop')
                var tmpMyop = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addMyop', tmpMyop)
                break;
              case 'pracMpNIR':
               // console.log('switch pracMpNIR')
                var tmpMpNIR = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
                }
                await this.$store.dispatch('addMpNIR', tmpMpNIR)
                break;
              case 'pracMptp':
               // console.log('switch pracMptp')
                var tmpMptp = {
                  id: prac.id + '_' + this.stud[0].login,
                  pid: prac.id,
                  sid: this.stud[0].id,
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
        

        filterHead(pHead){
      return this.heads.filter( head => {
        return head.id == pHead
      })
    },

        openDirect(prac){

        },

       async openRep(prac){
        var id = prac.id + '_' + this.stud[0].login
        var edlevel = (await this.$store.dispatch('getGroupById', this.stud[0].grid)).edlvl
        var tablename = (this.edlvls.find(edlvl => edlvl.title == prac.type && edlvl.edlvl == edlevel)).tablename
        console.log(tablename)


        switch (tablename) {
              case 'pracAnip':
                this.$router.push('/rep/anip?report=' + id)
                break;
              case 'pracAni':
                this.$router.push('/rep/ani?report=' + id)
                break;
              case 'pracApp':
                this.$router.push('/rep/app?report=' + id)
               // console.log('switch pracApp')

                break;
              case 'pracByop':
                this.$router.push('/rep/byop?report=' + id)
               // console.log('switch pracByop')

                break;
              case 'pracByNIR':
                this.$router.push('/rep/byNIR?report=' + id)
               // console.log('switch pracByNIR')

                break;
              case 'pracBptp':
                this.$router.push('/rep/bptp?report=' + id)
               // console.log('switch pracBptp')

                break;
              case 'pracBpdp':
               // console.log('switch pracBpdp')
                this.$router.push('/rep/bpdp?report=' + id)
                break;
              case 'pracMyop':
               // console.log('switch pracMyop')
               this.$router.push('/rep/myop?report=' + id)

                break;
              case 'pracMpNIR':
               // console.log('switch pracMpNIR')
               this.$router.push('/rep/mpNIR?report=' + id)

                break;
              case 'pracMptp':
               // console.log('switch pracMptp')
               this.$router.push('/rep/mptp?report=' + id)

                break;
              default:
                console.log('switch default')
                break;
            }

        //alert('load from ' +
          //(this.edlvls.find(edlvl => edlvl.title == prac.type && edlvl.edlvl == edlevel)).tablename + ' query ' + id)
        
        
        
        },

        openDiary(prac){

        },

        
        closePrac(){
          this.currentPrac = '',
          this.openPracBox = false
        }
    }
}
</script>

<style lang="scss">
.openPrac{
  width: 80%;
}
.ui-card.prac{
  width: 30%;
  margin-bottom: 2%;
  margin-left: 1%;
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