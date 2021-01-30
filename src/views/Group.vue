<template>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center"> Группы </p>
          <div class="row">
          <button class="button button--round button-primary" v-on:click="addGr">Добавить</button>
          </div>
          <!--Selector-->

          <select class="GroupField" v-model="currentLvl">
           <!-- <option value = -1 >Выберите уровень</option> -->
            <option 
            v-for="edlvl in edlvls"
            v-bind:key= edlvl.title
          v-bind:value="edlvl.title"> {{edlvl.title}}</option>
          </select>
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
                        <button class="button button-warning delete" v-on:click="removeGroup(group)">Удалить</button>
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
             <input type="text" v-model="spec" @keyup.esc="cancelAdd"/>
             <span>Профиль</span>
             <input type="text" v-model="profile" @keyup.esc="cancelAdd"/>
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
             <span>Направление/Специальность</span>
             <input type="text" v-model="spec" @keyup.esc="cancelEdit"/>
             <span>Профиль</span>
             <input type="text" v-model="profile" @keyup.esc="cancelEdit"/>
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
            ]
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
    //console.log(this.groups)
    //console.log(this.gr)
  },

  

  methods:{
    async truncGroup(group){
      this.students = await this.$store.dispatch('getStudGr', group.id)
      if( this.students.length == 0){
        this.$message('В группе нет студентов')
      }
      this.students.forEach(async student => {
         await this.$store.dispatch('deleteStudent', student)
      })

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
      this.spec = group.spec
      this.profile = group.profile
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
        spec: this.spec,
        profile: this.profile,
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
        spec: this.spec,
        profile: this.profile,
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
  margin-bottom: 2%;
  margin-left: 1%;
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
</style>
