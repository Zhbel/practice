<template>
<body>
<div class="navbar">
  
            <div class="container">
              <div class="navbar-content">
                <a class="header-logo" v-bind:href="mainLink">Practice System</a>
                <div class="button-burger" @click="menuShow = !menuShow" :class="{ active: menuShow }">
                  <span class="line line-1"></span><span class="line line-2"></span><span class="line line-3"></span>
                  </div>
            <div class="navbar-list__wrapper" :class="{ active: menuShow }">
                  <ul class="navbar-list">
                    <router-link
                        v-for="link in links"
                        :key="link.url"
                        tag="li"
                        active-class="active"
                        :to="link.url">
                      <li class="navbar-item" @click="menuShow = false">
                       <a class="navbar-link" href="#">{{ link.title }}</a></li>
                      </router-link>
                      <li class="navbar-item">
                      <a class="navbar-link" @click.prevent="logout">Выйти</a></li>
                </ul>
                </div>
              </div>
            </div>          
          </div>
          </body>
</template>

<script>

export default {

  async mounted(){
    this.user_rights = await this.$store.dispatch('getHeadInfo')
       // console.log(Object.keys(this.user).length)
        //console.log(this.user.length)
    if (Object.keys(this.user_rights).length != 0){
        this.user_rights = true
        this.mainLink = '/head'
        } else{
          this.user_rights = false
          this.mainLink = '/stud'
        }
    //console.log(this.user_rights)
  },

  computed:{
  links () {
      if (this.user_rights) {
        return [
          {title: 'Группы', url: '/group' },
             {title: 'Студенты', url: '/students' },
             {title: 'Практика', url: '/practice' }
        ]
      } else{
      return [
        {title: 'Мои работы', url: '/stud' },
      ]}
    }
    },


  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  data: () => ({
    user_rights: false,
    menuShow: false,
    mainLink: '',
   /* links: [ 
             {title: 'Группы', url: '/group' },
             {title: 'Студенты', url: '/students' },
             {title: 'Практика', url: '/practice' }
    ]*/
  })
}
</script>

<style lang="scss">
.navbar{
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
