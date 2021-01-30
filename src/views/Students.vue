<template>
    <body>
      <div clanpm installs="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center"> Студенты </p>
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
          <button class="button button--round button-primary" v-on:click="addFile">Загрузить из файла</button>
          <button class="button button--round button-success" v-on:click="insertFb" v-if="loadPreview">Сохранить</button>
          </div>
           <input type="file" @change="LoadFile" v-if="fileAdd"/>

<!--StudTable-->
    
    <div v-if="loadTable">
    <div id="pdf1">
    <table class="ui-table ui-table--hover preview">
    <thead>
      <tr>
        <th><span>ФИО</span></th>
        <th><span>Группа</span></th>
        <th><span>Статус</span></th>
        <th></th>
        <th><span>Действия</span></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in students"
      v-bind:data="student"
      v-bind:key= student.fname
      >
        <td><span class="ui-text-smaller table">{{student.fname}}</span></td>
        <td><span class="ui-text-smaller table">{{(groups.find(group => group.id == student.grid)).title}}</span></td>
        <td><span class="ui-text-smaller table" v-if="student.state">Обучается</span>
        <span class="ui-text-smaller table" v-else>Не обучается</span></td>
        <td><button class="button button-light prac" v-on:click="practice(student)">Практика</button></td>
        <td><button class="button button-warning edit" v-on:click="editStud(student)">Редактировать</button></td>
        <td><button class="button button-warning delete" v-on:click="deleteStud(student)">Удалить</button></td>
        
      </tr>
    </tbody>
  </table></div>
  <button class="button button-default authd" v-on:click="authGr()">Аутентификационные данные</button>
  </div>
  
  <p class="ui-title-5" v-else>{{textinfo}}</p>
  

<!--StudTable-->

  <!--StudTablePreview-->
    <table class="ui-table ui-table--hover preview" v-if="loadPreview">
    <thead>
      <tr>
        <th><span>ФИО</span></th>
        <th><span>Группа</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="fstudent in studfromfile"
      v-bind:data="fstudent"
      v-bind:key= fstudent.__EMPTY_1
      >
        <td><span class="ui-text-smaller table">{{fstudent.__EMPTY_1}}</span></td>
        <td><span class="ui-text-smaller table">{{grTitle}}</span></td>
      </tr>
    </tbody>
  </table>
<!--StudTablePreview-->


  <!--Student Card->
            <div class="row">
            <div class="ui-card ui-card--shadow-always student"
            v-for="(student) in filterStudents"
            v-bind:data="student"
            v-bind:key= student.uid
            >
              <div class="student__info">
              <p class="ui-title-4 center">{{student.name}}</p>
              <p class="ui-text-regular" v-if="student.status==true">Обучается</p>
              <p class="ui-text-regular" v-else>Не обучается</p>
              <br>
              <div class="row">
                <button class="button button-light" v-on:click="practice(student)">Практика</button>
                <button class="button-close" v-on:click="remove(student)"></button>
              </div>
            </div>
            </div>       
         </div>
    --Student Card-->
        </div>

        <!--Message Box Add-->
        <div class="ui-messageBox__wrapper" v-if="addButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Введите данные</span>
             <span class="button-close ui-messageBox-close" @click="cancelAdd"></span></div>
             <div class="ui-messageBox__content"><span>ФИО</span>
             <input type="text" v-model="tmps.fname" @keyup.esc="cancelAdd" placeholder="Медников Ефимий Ильич"/>
             <div class="ui-messageBox__content"><span>Группа</span>
             <input type="text" v-bind:value="grTitle" @keyup.esc="cancelAdd" readonly/>
             </div></div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelAdd">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishAdd">Добавить</div>
              </div>
              </div>
              </div>
        <!--Message Box Add-->

        <!--Message Box Edit-->
        <div class="ui-messageBox__wrapper" v-if="EditButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Редактирование студента</span>
             <span class="button-close ui-messageBox-close" @click="cancelEdit"></span></div>
             <div class="ui-messageBox__content"><span>ФИО</span>
             <input type="text" v-model="tmps.fname" @keyup.esc="cancelEdit"/>
             <span>Статус</span>
             <!--Selector-->
              <select v-model="tmps.state">
              <option v-bind:value="true">Обучается</option>
              <option v-bind:value="false">Не обучается</option>
              </select>
              <!--Selector-->
             <span>Группа</span>
             <!--Selector-->
              <select v-model="tmps.grid">
              <option 
               v-for="group in groups"
              v-bind:key= group.id
              v-bind:value="group.id"
               > {{group.title}}</option>
              </select>
              <!--Selector-->
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelEdit">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishEdit">Сохранить</div>
              </div>
              </div>
              </div>
          <!--Message Box Edit-->
      </div>
    </body>
</template>

<script>
import xlsx from "xlsx";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

import html2canvas from "html2canvas"


export default {

  
  methods:{
    async insertFb(){
      this.studfromfile.forEach(student => {
        var login = CyrillicToTranslit().transform(student.__EMPTY_1)
        login = login.slice(0, login.indexOf(' '))
        login += Math.floor(Math.random() * 10000);
        var password = "psswrd" + Math.floor(Math.random() * 10000);
        const insstud = {
          login: login,
          password: password,
          fname: student.__EMPTY_1,
          grid: this.currentGr,
          state: true,
        }

        
        this.insertArray.push(insstud)
      });
      try{
      await this.insertArray.forEach(async student => {
        await this.$store.dispatch('registerStud', student)
      })
      this.insertArray = []
      this.loadPreview = false
      }
      catch(e){ this.$error('Что-то пошло не так')}
     // this.students = await this.$store.dispatch('getStudGr', this.currentGr)
      //while (Object.keys(this.students).length != 0) { this.students = await this.$store.dispatch('getStudGr', this.currentGr)}
     // this.loadTable = true
      //await this.selGr()
    },

    async selGr() {
      this.students = await this.$store.dispatch('getStudGr', this.currentGr)
      //console.log(this.students)
      if (this.students.length != 0){
      this.loadTable = true
      this.loadPreview = false
      } else {
        this.loadTable = false
        this.loadPreview = false
        this.textinfo = 'В данной группе нет студентов'
      }
    },

    add() {
      if (this.currentGr != ''){
      this.grTitle = (this.groups.find(group => group.id == this.currentGr)).title
      this.addButton = true
      this.tmps.grid = this.currentGr
      } else { this.$error('Сначала выберите группу')}
      
    
    },

    addFile(){
      if (this.currentGr != ''){
      this.fileAdd = true;
      this.grTitle = (this.groups.find(group => group.id == this.currentGr)).title
      } else { this.$error('Сначала выберите группу')}

    },
    
    LoadFile(e) {

      const files = e.target.files;
      //console.log(files);
      if (!files.length) {
        return ;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return this.$error("Формат загружаемого файла неверный. Загрузите формат xls или xlsx");
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0]; 
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
          const excellist = [];
 
          for (var i = 0; i < ws.length; i++) {
            excellist.push(ws[i]);
          }
          console.log('read completed');
          this.studfromfile = excellist;

          this.loadPreview = true
          this.fileAdd = false
        } catch (e) {
          return this.$error("Ошибка считывания!");;
        }
      };
      fileReader.readAsBinaryString(files[0]);
      var input = document.getElementById("upload");
      this.loadTable = false
      this.textinfo = 'Предпросмотр'
    },


    async deleteStud(student){
      await this.$store.dispatch('deleteStudent', student)
      this.students = await this.$store.dispatch('getStudGr', this.currentGr)
    },

    editStud(student){
      this.tmps.id = student.id
      this.tmps.fname = student.fname
      this.tmps.grid = student.grid
      this.tmps.state = student.state
      this.tmps.login = student.login
      this.tmps.password = student.password
      this.EditButton = true
      this.studT = student
    },

    cancelEdit(){
      this.EditButton = false
      this.studT = ''
      this.tmps = {
        ds: '',
        fname: '',
        grid: '',
        login: '',
        password: '',
        state: true,
        id: '',
      }
    },

     async finishEdit(){
       try{
        await this.$store.dispatch('UpdateStud', this.tmps)
        this.students = await this.$store.dispatch('getStudGr', this.currentGr)
        this.$success('Данные успешно обновлены')
        this.cancelEdit()
        
        
      }catch (e){
        this.$error('Ошибка при обновлении данных')
      }

    },

    practice(student){
      this.$router.push('/pstud?student=' + student.login)
     // alert(student.fname + ' практика')
    },
    grSelect(event){
      this.grID = event.target.value

    },

    cancelAdd(){
    this.addButton = false
    this.tmps = {
        ds: '',
        fname: '',
        grid: '',
        login: '',
        password: '',
        state: true,
        id: '',
      }
  },
  
    async finishAdd(){
    var login = CyrillicToTranslit().transform(this.tmps.fname)
        login = login.slice(0, login.indexOf(' '))
        login += Math.floor(Math.random() * 10000);
    var password = "psswrd" + Math.floor(Math.random() * 10000);
    this.tmps.login = login
    this.tmps.password = password
    console.log(this.tmps)
    await this.$store.dispatch('registerStud', this.tmps)
    this.students = await this.$store.dispatch('getStudGr', this.currentGr)
    this.loadTable = true
    this.cancelAdd()
  },

    async authGr(){

      this.grTitle = (this.groups.find(group => group.id == this.currentGr)).title

      var pdfMake = require('pdfmake/build/pdfmake.js')
      if (pdfMake.vfs == undefined){
        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var dd = {
        content: [],
        styles: {
            f18: {
                margin: [ 0, 10, 0, 0 ],
            } 
        }
      }
      dd.content.push({text: this.grTitle, alignment: 'center', margin: [ 0, 0, 0, 10 ]})
      dd.content.push({ columns: [{text: 'ФИО', bold:true}, {text: 'Login', bold:true}, {text: 'Password', bold:true},]});
      this.students.forEach(student => {
        dd.content.push({ columns:[ {text: student.fname, style: ['f18']}, {text: student.login, style: ['f18']}, {text: student.password, style: ['f18']} ]})
      })
       pdfMake.createPdf(dd).download(this.grTitle + '.pdf')

    },
  },

  async mounted(){
    this.groups = await this.$store.dispatch('getGroups')
  },

  computed:{
  },

  components: {
  },

  created() {
  },

  data () {   
    return {
      tmps: {
        ds: '',
        fname: '',
        grid: '',
        login: '',
        password: '',
        state: true,
        id: '',
      },
      studT: '',
      EditButton: false,
      inputS: '',
      grID: -1,
      addButton: false,
      currentGr: '',
      grTitle: '',
      studfromfile: [],
      insertArray: [],
      fileAdd: false,
      loadPreview: false,
      loadTable: false,
      students: [],
      groups: [],
      textinfo: ''
    }
  },

  }
</script>

<style lang="scss">
.button.button-light{
  margin-right: 5%;
}
.ui-title-4{
  margin-top: 1%;
}
.ui-card.student{
  width: 24%;
  margin-bottom: 2%;
  margin-left: 1%;
}
.ui-text-smaller.table{
  color: #000;
}
.ui-table--hover.preview{
  width: max-content;
}
.button.prac{
  font-size: 85%;
  width: max-content;
  margin-top: 2%;
  margin: 2%;
}
.button.authd{
  font-size: 85%;
  width: max-content;
  margin-top: 2%;
}
</style>
