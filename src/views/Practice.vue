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
          <p class="ui-title-4 center">Практика</p>
          <label for="GroupField">Группа</label>
          <!--Selector-->

          <select class="GroupField" v-model="currentGr" @change="selGr()">
            <option 
            v-for="group in groups"
            v-bind:key= group.id
            v-bind:value="group.id"> {{group.title}}</option>
          </select>
            <!--Selector-->
          <div class="row">
          <button class="button button--round button-primary" v-on:click="add">Добавить</button>
          <button class="button button-default" v-on:click="pracList()">Наименования практик</button>
          </div>
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
                        <button class="button button-warning edit" v-on:click="editPrac(prac)">Редактировать</button>
                        <button class="button button-warning delete" v-on:click="areUSurePrDel(prac)">Удалить</button>
                      </div>
                    </div>
                    </div> 
        </div>
        <p class="ui-title-5" v-else>{{textinfo}}</p>
        <!--Prac Card-->
            <!--Message Box Add-->
            <div class="ui-messageBox__wrapper" v-if="addButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown prac" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Введите данные практики</span>
             <span class="button-close ui-messageBox-close" @click="cancelAdd"></span></div>
             <div class="ui-messageBox__content"><span>Название</span>
             <input type="text" v-model="tmpp.title" @keyup.esc="cancelAdd"/>
             <span>Руководитель</span>
             <!--Selector-->
              <select v-model="tmpp.pid">
              <option 
               v-for="(head) in heads"
               v-bind:value="head.id"
               v-bind:key= head.id
               > {{head.fname}}</option>
              </select>
              <!--Selector-->
             <span>Тип практики</span>
             <!--Selector-->
              <select v-model="tmpp.type">
              <option 
               v-for="(type) in filterEd"
               v-bind:value="type.title"
               v-bind:key= type.title
               > {{type.title}}</option>
              </select>
              <!--Selector-->
              <span>Дата начала</span>
              <DatePicker v-model="tmpp.datestart" :format="customFormatter" :parser="customParser" placeholder="Дата начала" :fixed-position="'top-right'" :language="ru"></DatePicker>
              <span>Дата окончания</span>
              <DatePicker v-model="tmpp.dateend" :format="customFormatter" :parser="customParser" placeholder="Дата окончания" :fixed-position="'top-right'" :language="ru"></DatePicker>
              </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelAdd">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishAdd">Добавить</div>
              </div>
              </div>
              </div>
        <!--Message Box Add-->

        <!--Message Box Edit-->
        <div class="ui-messageBox__wrapper" v-if="EditButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown edit" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Редактирование практики</span>
             <span class="button-close ui-messageBox-close" @click="cancelEdit"></span></div>
             <div class="ui-messageBox__content"><span>Название</span>
             <input type="text" v-model="tmpp.title" @keyup.esc="cancelEdit"/>
             <span>Руководитель</span>
             <!--Selector-->
              <select v-model="tmpp.pid">
              <option 
               v-for="phead in heads"
              v-bind:key= phead.id
              v-bind:value="phead.id"
               > {{phead.fname}}</option>
              </select>
              <!--Selector-->
              <span>Тип практики</span>
              <!--Selector-->
              <select v-model="tmpp.type">
              <option 
               v-for="edlvl in filterEd"
              v-bind:key= edlvl.title
              v-bind:value="edlvl.title"
               > {{edlvl.title}}</option>
              </select>
              <!--Selector-->
              <span>Дата начала</span>
              <DatePicker v-model="tmpp.datestart" :format="customFormatter" :parser="customParser" placeholder="Дата начала" :fixed-position="'top-right'" :language="ru"></DatePicker>
              <span>Дата окончания</span>
              <DatePicker v-model="tmpp.dateend" :format="customFormatter" :parser="customParser" placeholder="Дата окончания" :fixed-position="'top-right'" :language="ru"></DatePicker>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelEdit">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishEdit">Сохранить</div>
              </div>
              </div>
              </div>
          <!--Message Box Edit-->

           <!--Message Box PracList-->
            <div class="ui-messageBox__wrapper" v-if="showList"  style="display: flex;">
            <div class="ui-messageBox fadeInDown prac" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">
               Практика
               </span>
             <span class="button-close ui-messageBox-close" @click="cancelList"></span></div>
               <!--Selector-->
              <select v-model="currentEdlvl">
              <option 
               v-for="(edlvl) in edlvls"
               v-bind:value="edlvl"
               v-bind:key= edlvl.id
               > {{edlvl.title}} ({{edlvl.edlvl}})</option>
              </select>
              <!--Selector-->
             <div class="ui-messageBox__content"><span>Название</span>
             <input type="text" v-model="currentEdlvl.title" @keyup.esc="cancelList"/>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelList">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishList">Сохранить</div>
              </div>
              
              </div></div>
        <!--Message Box PracList-->

          <!--Message Box-->
        <div class="ui-messageBox__wrapper" v-if="delBox"  style="display: flex;">
            <div class="ui-messageBox fadeInDown prac" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Внимание!</span>
             <span class="button-close ui-messageBox-close" @click="CancelPrDel"></span></div>
             <div class="ui-messageBox__content"><span>Вы желаете удалить {{pracD.title}} из системы?</span>
             <!--Selector-->
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="CancelPrDel">Нет</div>
              <div class="button button-primary ui-messageBox-ok" @click="FinishPrDel">Да</div>
              </div>
              </div>
              </div>
          <!--Message Box-->


        
        </div>
      </div>
    </body>
  </html>
</template>

<script>
import DatePicker from '@sum.cumo/vue-datepicker'
import { format, parse } from "date-fns";
import '@sum.cumo/vue-datepicker/dist/vuejs-datepicker.css'
import loader from '@/utils/loader'

import {ru} from 'vuejs-datepicker/dist/locale'

export default {

  components: {
    DatePicker
  },

  data () {
    return {
      ru: ru,
      testvar: 'Практис-вар',
      groups: [],
      students: [],
      heads: [],
      prac: [],
      currentGr: '',
      textinfo: '',
      loadPrac: false,
      addButton: false,
      EditButton: false,
      showList: false,
      delBox: false,
      format: 'dd.MM.yyyy',
      pracD: '',
      grTitle: '',
      textinfo: '',
      practable: '',
      currentEdlvl: '',
      edprac: '',
      tmpp: {
        pid: '',
        grid: '',
        type: '',
        title: '',
        datestart: '',
        dateend: '',
        id: '',
      },
      /*edlvls: [
        {title: 'Учебная ознакомительная практика', edlvl: 'Бакалавриат', tablename: 'pracByop', type: 'учебная', id: 'b1',},
        {title: 'Учебная НИР', edlvl: 'Бакалавриат', tablename: 'pracByNIR', type: 'учебная', id: 'b2'},
        {title: 'Производственно-технологическая практика', edlvl: 'Бакалавриат', tablename: 'pracBptp', type: 'производственная', id: 'b3'},
        {title: 'Преддипломная практика', edlvl: 'Бакалавриат', tablename: 'pracBpdp', type: 'преддипломная', id: 'b4'},
        {title: 'Учебная ознакомительная практика', edlvl: 'Магистратура', tablename: 'pracMyop', type: 'учебная', id: 'm1'},
        {title: 'Производственная НИР', edlvl: 'Магистратура', tablename: 'pracMpNIR', type: 'производственная', id: 'm2'},
        {title: 'Производственно-технологическая практика', edlvl: 'Магистратура', tablename: 'pracMptp', type: 'производственная', id: 'm3'},
        {title: 'НИП', edlvl: 'Аспирантура', tablename: 'pracAnip', type: '', id: 'a1'},
        {title: 'Научное исследование', edlvl: 'Аспирантура', tablename: 'pracAni', type: '', id: 'a2'},
        {title: 'Педагогическая практика', edlvl: 'Аспирантура', tablename: 'pracApp', type: '', id: 'a3'},
      ],*/
       edlvls: []
    }
  },

  async mounted(){
    this.groups = await this.$store.dispatch('getGroups')
    this.heads = await this.$store.dispatch('getHeads')
    //console.log(this.heads)
    //console.log(this.edlvls)
   /* this.edlvls.forEach(async edlvl => {
      //console.log(edlvl)
      //console.log(i)
      await this.$store.dispatch('addPracList', edlvl)
    })*/
    this.edlvls = await this.$store.dispatch('getPracList')
    //console.log(this.edlvls)
  },

  computed:{
    filterEd(){
      return this.edlvls.filter( edlvl => {
        return edlvl.edlvl == this.currentEdlvl
      })
    },
    
  
  },

  methods: {
    async selGr() {
      loader.loaderStart()
      this.loadPrac = false
      this.currentEdlvl = (this.groups.find(group => group.id == this.currentGr)).edlvl
      this.students = await this.$store.dispatch('getStudGr', this.currentGr)
      this.prac = await this.$store.dispatch('getPracGr', this.currentGr)
     // console.log(this.prac)


      if (this.prac.length != 0){
      this.loadPrac = true
      } else {
        this.textinfo = 'У данной группы нет практик'
      }
      setTimeout(function() {
        loader.loaderEnd();
      }, 300);
      //console.log(this.students)
      //console.log(this.currentEdlvl)
    },

    areUSurePrDel(prac){
      this.delBox = true
      this.pracD = prac
    },

    CancelPrDel(){
      this.delBox = false
      this.pracD = ''
    },

    async FinishPrDel(){
      await this.removePrac(this.pracD)
      this.CancelPrDel()
    },

    pracList(){
      this.showList = true
      //console.log(this.currentEdlvl)
      this.currentEdlvl = ''
    },

    cancelList(){
      this.showList = false
      if(this.currentGr != '') this.currentEdlvl = (this.groups.find(group => group.id == this.currentGr)).edlvl
    },

    async finishList(){
      try{
        
        //var oldpracname = this.currentEdlvl.title
        //console.log(oldpracname)
        await this.$store.dispatch('UpdatePracList', this.currentEdlvl)
        this.edlvls = await this.$store.dispatch('getPracList')
        if(this.currentGr != ''){
        this.prac = await this.$store.dispatch('getPracGr', this.currentGr)
        }
        this.$success('Данные успешно обновлены')
        this.cancelList()
                
      }catch (e){
        this.$error('Ошибка при обновлении данных')
      }
      
    },

    editPrac(prac){
      this.tmpp.id = prac.id
      this.tmpp.title = prac.title
      this.tmpp.pid = prac.pid
      this.tmpp.grid = prac.grid
      this.tmpp.type = prac.type
      this.tmpp.datestart = this.toDate(prac.datestart)
      this.tmpp.dateend = this.toDate(prac.dateend)
      this.EditButton = true
      this.edprac = prac

      //this.studT = student
    },

    cancelEdit(){
      this.EditButton = false
      //this.studT = ''
      this.tmpp = {
        pid: '',
        grid: '',
        type: '',
        title: '',
        datestart: '',
        dateend: '',
        id: '',
      }
      this.edprac = ''
    },
    
    async finishEdit(){
       try{
        
        this.tmpp.datestart = this.customFormatter(this.tmpp.datestart)
        this.tmpp.dateend = this.customFormatter(this.tmpp.dateend)
        if(this.tmpp.datestart != this.edprac.datestart || this.tmpp.dateend != this.edprac.dateend){
          //console.log('date changed')
          await this.$store.dispatch('deletePd', this.edprac.id)
        }
        await this.$store.dispatch('UpdatePrac', this.tmpp)
        this.prac = await this.$store.dispatch('getPracGr', this.currentGr),
        this.$success('Данные успешно обновлены')
        this.cancelEdit()  
      }catch (e){
        this.$error('Ошибка при обновлении данных')
      }

    },

    add(){
       if (this.currentGr != ''){
      this.grTitle = (this.groups.find(group => group.id == this.currentGr)).title
      this.addButton = true
      this.tmpp.grid = this.currentGr
      this.tmpp.id = 'prac_' + this.makeid(8);
      //alert(this.grTitle)
      } else { this.$error('Сначала выберите группу')}
    },
  
    cancelAdd(){
      this.addButton = false
      this.tmpp = {
          pid: '',
          grid: '',
          type: '',
          title: '',
          datestart: '',
          dateend: '',
          id: '',
        }
    },

    async finishAdd(){
      this.addButton = false
     // this.tmpp.datestart = this.customFormatter(this.tmpp.datestart)
      //this.tmpp.dateend = this.customFormatter(this.tmpp.dateend)
      //console.log(this.tmpp.datestart.getUTCMonth())
      try {
      this.tmpp.datestart = this.customFormatter(this.tmpp.datestart)
      this.tmpp.dateend = this.customFormatter(this.tmpp.dateend)
      await this.$store.dispatch('addPrac', this.tmpp)
      this.prac = await this.$store.dispatch('getPracGr', this.currentGr),
      this.loadPrac = false
      this.loadPrac = true
      this.$success('Практика добавлена')
      } catch(e) { this.$error('Произошла ошибка')}
      //console.log(this.tmpp)
      this.cancelAdd()
    },

    async removePrac(prac){
        try{
        await this.$store.dispatch('deletePrac', prac.id)
        this.prac = await this.$store.dispatch('getPracGr', this.currentGr)
        //this.groups.splice(this.groups.indexOf(group), 1)
        this.$success('Практика удалена')
        } catch(e){ this.$error = "Произошла ошибка" }
    },

    filterHead(pHead){
      return this.heads.filter( head => {
        return head.id == pHead
      })
    },

    customFormatter(date) {
      //const moment = require('moment')
      return format(date, this.format)
      //return moment(date).format('DD-MM-yyyy');
    },

    customParser(date) {
        return parse(date, this.format, new Date())
    },

    toDate (dateStr) {
    const [day, month, year] = dateStr.split(".")
    return new Date(year, month - 1, day)
    },

    makeid(length){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
   }
  
  
  },
}
</script>

<style lang="scss">

.vdp-datepicker__calendar{
  margin: 2%;
  width: 90%;
}
.ui-messageBox.prac{
  width: 30%;
}
.vdp-datepicker{
  position: inherit;
}
.ui-card.prac{
  width: 30%;
}
</style>
