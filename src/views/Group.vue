<template>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center"> Группы </p>
          <div class="row">
          <button class="button button--round button-primary" v-on:click="addGr">Добавить</button>
          <button class="button button-default prof" v-on:click="profList()">Направления (специальности)</button>
          </div>
          <!--Selector-->
          <div class="row">
          <select class="GroupField" v-model="currentLvl">
           <!-- <option value = -1 >Выберите уровень</option> -->
            <option 
            v-for="edlvl in edlvls"
            v-bind:key= edlvl.title
          v-bind:value="edlvl.title"> {{edlvl.title}}</option>
          </select>
          
          </div>
         <!--Selector-->
        <!--Group Card-->
          <div class="row">
            <div class="ui-card ui-card--shadow-always group"
                    v-for="(group) in filterGroups"
                    v-bind:data="group"
                    v-bind:key= group.id
                    >
                      <div class="group__info">
                      <p class="ui-title-4 center">{{group.title}}</p>
                      <p class="ui-text-regular"><b>Направление: </b>{{group.spec}}</p>
                      <p class="ui-text-regular"><b>Профиль: </b>{{group.profile}}</p>
                      <p class="ui-text-regular"><b>Уровень образования: </b> {{group.edlvl}}</p>
                        <div class="row">
                        <button class="button button-warning edit" v-on:click="editGroup(group)">Редактировать</button>
                        <button class="button button-light truncate" v-on:click="truncGroup(group)">Очистить</button>
                        <button class="button button-warning delete" v-on:click="areUSureGrDel(group)">Удалить</button>
                      </div>
                    </div>
                    </div> 
        </div>
        <!--Group Card-->
      </div>
        <!--Message Box-->
        <div class="ui-messageBox__wrapper" v-if="AddButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">{{mboxTitle}}</span>
             <span class="button-close ui-messageBox-close" @click="cancelAdd"></span></div>
             <div class="ui-messageBox__content"><span>Название</span>
             <input type="text" v-model="title" @keyup.esc="cancelAdd"/>
             <span>Направление/Специальность</span>
              <!--Selector-->
              <select v-model="spec">
              <option 
               v-for="spec in specArr"
              v-bind:key= spec.id
              v-bind:value="spec"
               > {{spec.spec}}</option>
              </select>
             <span>Профиль</span>
             <br>
             <textarea readonly type="text" v-model="spec.profile" @keyup.esc="cancelEdit" class="textarea"/>
             <br>
             <span>Уровень образования</span>
             <!--Selector-->
              <select @change="lvlSelect($event)">
              <option value = -1 >Выберите уровень</option>
              <option 
               v-for="lvl in edlvls"
               v-bind:key= lvl.title
               > {{lvl.title}}</option>
              </select>
              <!--Selector-->
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelAdd">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishAdd">Сохранить</div>
              </div>
              </div>
              </div>
          <!--Message Box-->

          <!--Message Box-->
        <div class="ui-messageBox__wrapper" v-if="EditButton"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">{{mboxTitle}}</span>
             <span class="button-close ui-messageBox-close" @click="cancelEdit"></span></div>
             <div class="ui-messageBox__content"><span>Название</span>
             <input type="text" v-model="title" @keyup.esc="cancelEdit"/>
             <!--<span>Направление/Специальность</span>
             <input type="text" v-model="spec" @keyup.esc="cancelEdit"/> -->
             <span>Направление/Специальность</span>
              <!--Selector-->
              <select v-model="spec">
              <option 
               v-for="spec in specArr"
              v-bind:key= spec.id
              v-bind:value="spec"
               > {{spec.spec}}</option>
              </select>
             <span>Профиль</span>
             <br>
             <textarea readonly type="text" v-model="spec.profile" @keyup.esc="cancelEdit" class="textarea"/>
             <br>
             <span>Уровень образования</span>
             <!--Selector-->
              <select v-model="edlevel">
              <option 
               v-for="lvl in edlvls"
               v-bind:key= lvl.title
               > {{lvl.title}}</option>
              </select>
              <!--Selector-->
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelEdit">Отмена</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishEdit">Сохранить</div>
              </div>
              </div>
              </div>
          <!--Message Box-->

          <!--Message Box-->
        <div class="ui-messageBox__wrapper" v-if="truncBox"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Внимание!</span>
             <span class="button-close ui-messageBox-close" @click="cancelTrunc"></span></div>
             <div class="ui-messageBox__content"><span>Вы желаете удалить из системы данные всех студентов группы?</span>
             <!--Selector-->
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="cancelTrunc">Нет</div>
              <div class="button button-primary ui-messageBox-ok" @click="finishTrunc">Да</div>
              </div>
              </div>
              </div>
          <!--Message Box-->


          <!--Message Box-->
        <div class="ui-messageBox__wrapper" v-if="delBox"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header"><span class="messageBox-title">Внимание!</span>
             <span class="button-close ui-messageBox-close" @click="CancelGrDel"></span></div>
             <div class="ui-messageBox__content"><span>Вы желаете удалить группу {{groupD.title}} из системы?</span>
             <!--Selector-->
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light ui-messageBox-cancel" @click="CancelGrDel">Нет</div>
              <div class="button button-primary ui-messageBox-ok" @click="FinishGrDel">Да</div>
              </div>
              </div>
              </div>
          <!--Message Box-->


          <!--Message Box PracList-->
            <div class="ui-messageBox__wrapper" v-if="showList"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header">
               <span class="messageBox-title">Список направлений
               </span>         
             <span class="button-close ui-messageBox-close" @click="cancelList"></span></div>
               <!--Selector-->

              <select v-model="currentSpec">
              <option 
               v-for="(spec) in specArr"
               v-bind:value="spec"
               v-bind:key= spec.id
               > {{spec.spec}}</option>
              </select>
              <!--Selector-->
             <div class="ui-messageBox__content">
              <span>Направление (Специальность)</span>
             <input type="text" v-model="currentSpec.spec" @keyup.esc="cancelList"/>
             <span>Профиль</span>
             <br>
             <textarea v-model="currentSpec.profile" @keyup.esc="cancelList" class="textarea"></textarea>
             </div>
             <div align="right">
             <div class="button button-default addS" @click="addList">Добавить новое направление</div>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-warning delete" @click="deleteList">Удалить</div>
              <div class="button button-light saveL" @click="finishEditList">Сохранить изменения</div>
              <div class="button button-light truncate" @click="finishList">Закрыть</div>
              </div>
              
              </div></div>
              <!--Message Box PracList-->



              <!--Message Box PracListAd-->
            <div class="ui-messageBox__wrapper" v-if="showAL"  style="display: flex;">
            <div class="ui-messageBox fadeInDown group" @click.stop="">
             <div class="ui-messageBox__header">
               <span class="messageBox-title">Добавить новое направление
               </span>         
             <span class="button-close ui-messageBox-close" @click="cancelLAD"></span></div>
             <div class="ui-messageBox__content">
              <span>Направление (Специальность)</span>
             <input type="text" v-model="specA" @keyup.esc="cancelLAD"/>
             <span>Профиль</span>
             <br>
             <textarea v-model="profA" @keyup.esc="cancelLAD" class="textarea"></textarea>
             </div>
              <div class="ui-messageBox__footer">
              <div class="button button-light truncate" @click="cancelLAD">Отмена</div>
              <div class="button button-light saveL" @click="finishLAD">Добавить</div>
              </div>
              
              </div></div>
              <!--Message Box PracListAd-->

          </div>
    </body>
</template>

<script>
import firebase from 'firebase/app'

export default {

  data: () => ({
        groups: [],
        students: [],
        AddButton: false,
        EditButton: false,
        truncBox: false,
        delBox: false,
        showList: false,
        showAL: false,
        currentSpec: '',
        specA: '',
        profA: '',
        groupD: '',
        groupT: '',
        title: '',
        spec: '',
        profile: '',
        edlevel: '',
        currentLvl: '',
        mboxTitle: '',
        edID: '',
        edlvls: [ {title: 'Бакалавриат'},
             {title: 'Магистратура'},
             {title: 'Аспирантура'},
            ],

        // specArr: [ {spec: '09.03.01 Информатика и вычислительная техника', profile: 'Программное обеспечение средств вычислительной техники и автоматизированнных систем'},
        //      {spec: '09.04.01 Информатика и вычислительная техника', profile: 'Информационное и программное обеспечение автоматизированных систем'},
        //      {spec: '09.04.01 Информатика и вычислительная техника', profile: 'Коммуникационные средства и технологии'},
        //      {spec: '09.06.01 Информатика и вычислительная техника', profile: 'Математическое моделирование, численные методы и комплексы программ'},
        //     ]
        specArr: []
    }),


  async created() {
    const title = this.edlvls[0].title
    this.currentLvl = title
  },

  computed:{
    filterGroups(){
      return this.groups.filter( group => {
        return group.edlvl == this.currentLvl
      })
    }
  },

  async mounted(){
    this.groups = await this.$store.dispatch('getGroups')
    // this.specArr.forEach(async spec => {
    //   //console.log(edlvl)
    //   //console.log(i)
    //   let id = "spec_" + this.makeid(8)
    //   Object.assign(spec, {id: id});
    //   //console.log(spec)
    //   await this.$store.dispatch('addSpecList', spec)
    // })
    
    this.specArr = await this.$store.dispatch('getSpecList')

    this.specArr.sort((function(a, b){
      if(a.spec < b.spec) { return -1; }
      if(a.spec > b.spec) { return 1; }
      return 0;
      }))
    // //console.log(this.groups)
    // console.log(this.specArr)
    //console.log(this.gr)
  },

  

  methods:{

    areUSureGrDel(group){
      this.delBox = true
      this.groupD = group
    },

    CancelGrDel(){
      this.delBox = false
      this.groupD = ''
    },

    async FinishGrDel(){
      await this.removeGroup(this.groupD)
      this.CancelGrDel()
    },

    async truncGroup(group){
      this.students = await this.$store.dispatch('getStudGr', group.id)
      if( this.students.length == 0){
        this.$message('В группе нет студентов')
      } else{
        this.truncBox = true 
      }

    },

    cancelTrunc(){
      this.truncBox = false
      this.students = []
    },

    finishTrunc(){
      try{
        this.students.forEach(async student => {
         await this.$store.dispatch('deleteStudent', student)
        })
        this.cancelTrunc()
        this.$success('Студенты удалены')
        }
        catch (e) {
          this.cancelTrunc()
          this.$error("Ошибка при удалении!")
        }

    },

    profList(){
      this.showList = true
    },

    cancelList(){
      //console.log(this.currentSpec)
      this.showList = false
      this.currentSpec = ''
    },


    async finishEditList(){
      try{
        
        //var oldpracname = this.currentEdlvl.title
        //console.log(oldpracname)
        await this.$store.dispatch('editSpecList', this.currentSpec)
        this.specArr = await this.$store.dispatch('getSpecList')
        this.specArr.sort((function(a, b){
        if(a.spec < b.spec) { return -1; }
        if(a.spec > b.spec) { return 1; }
        return 0;
        }))
        this.$success('Данные успешно обновлены')
                
      }catch (e){
        this.$error('Ошибка при обновлении данных')
      }
      
    },

    finishList(){
      this.cancelList()
    },

    async deleteList(){
      try{
       await this.$store.dispatch('deleteSpecList', this.currentSpec.id)
       this.specArr = await this.$store.dispatch('getSpecList')
       this.specArr.sort((function(a, b){
      if(a.spec < b.spec) { return -1; }
      if(a.spec > b.spec) { return 1; }
      return 0;
      }))
       this.$success('Успешно удалено')
       this.currentSpec = ''
     }catch(e){
       this.$error("Ошибка при удалении!")
     }
    },

    addList(){
     this.showAL = true
    },

    cancelLAD(){
     this.showAL = false
     this.profA = ''
     this.specA = ''
    },

    async finishLAD(){
     try{
       let addSpec = {
         id:"spec_" + this.makeid(8),
         spec: this.specA,
         profile: this.profA
       }
       await this.$store.dispatch('addSpecList', addSpec)
       this.specArr = await this.$store.dispatch('getSpecList')
       this.specArr.sort((function(a, b){
        if(a.spec < b.spec) { return -1; }
        if(a.spec > b.spec) { return 1; }
        return 0;
        }))
       this.$success('Успешно добавлено')
       this.cancelLAD()
     }catch(e){
       this.cancelLAD()
       this.$error("Ошибка при добавлении!")
     }

    },

    addGr(){
      this.AddButton = true
      this.mboxTitle = 'Добавить группу'
    },
    lvlSelect(event){
      this.edlevel = event.target.value
    },
    cancelAdd(){
      this.AddButton = false
      this.title = ''
      this.spec = ''
      this.profile = ''
      this.edlevel = ''
      this.mboxTitle = ''
    },

    async removeGroup(group){
      this.students = await this.$store.dispatch('getStudGr', group.id)
      //console.log(group.id)
       if( this.students.length == 0){
        await this.$store.dispatch('deleteGroup', group.id)
        await this.$store.dispatch('deletePracGr', group.id)
        this.groups = await this.$store.dispatch('getGroups')
        //this.groups.splice(this.groups.indexOf(group), 1)
        this.$success('Группа удалена')
      } else this.$error('Сначала очистите группу')
      
      //console.log('remove')
      //  this.forceRerender()
    },
    

    editGroup(group){
      this.title = group.title
      console.log(group)
      this.specArr.forEach(item => {
        //console.log(item)
        if(item.spec == group.spec && item.profile == group.profile)
        {
        this.spec = item
        //console.log(this.spec)
        }
      });
      //this.spec = group.spec
      //this.profile = group.profile
      this.edlevel = group.edlvl
      this.edID = group.id
      this.mboxTitle = 'Редактировать информацию'
      this.groupT = group


      this.EditButton = true
      //console.log(user)
    },

    cancelEdit(){
      this.EditButton = false
      this.title = ''
      this.spec = ''
      this.profile = ''
      this.edlevel = ''
      this.mboxTitle = ''

    },

    async finishEdit(){
      const gr_t = {
        id: this.edID,
        title: this.title,
        spec: this.spec.spec,
        profile: this.spec.profile,
        edlvl: this.edlevel
      }
      try{
        await this.$store.dispatch('editGroup', gr_t)
        this.groups = await this.$store.dispatch('getGroups')
        this.$success('Данные успешно обновлены')
        
      }catch (e){
        this.$error('Ошибка при обновлении данных')
      }
      this.EditButton = false
      this.cancelEdit()
    },

    async finishAdd(){
      const gr = {
        id: "group_" + this.makeid(8),
        title: this.title,
        spec: this.spec.spec,
        profile: this.spec.profile,
        edlvl: this.edlevel
      }
      //console.log(gr)
      await this.$store.dispatch('addGroup', gr)
      this.groups = await this.$store.dispatch('getGroups')
      //console.log(gr)
     // this.$success('Данные успешно обновлены')
       this.$success('Группа добавлена')
      this.cancelAdd()
    },

    makeid(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
   }
  }
  }

</script>

<style lang="scss">
.ui-messageBox.group{
  width: 30%;
}
.ui-card.group{
  width: 30%;
}
.button.edit{
  font-size: 85%;
  width: max-content;
  margin-top: 2%;
  margin: 2%;
  color: black;
}
.button.delete{
  font-size: 85%;
  width: max-content;
  margin-top: 2%;
  background-color: red;
  margin: 2%;
}
.button.truncate{
  font-size: 85%;
  width: max-content;
  margin-top: 2%;
  margin: 2%;
}
.button.saveL{
  font-size: 85%;
  width: max-content;
  margin-top: 2%;
  margin: 2%;
  background-color: blue;
} 
.button.prof{
  font-size: 90%;
  width: max-content;
  height: max-content;
}

.button.addS{
  font-size: 80%;
  width: max-content;
  height: max-content;
  margin-right: 5%;
  background-color: #C0C4CC;
}
</style>
