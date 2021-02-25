<template>
  <html>
    <head>
      <meta charset="utf-8" />
    </head>
    <body>
      <div class="wrapper">
        <header>
        <Navbar/>
        </header>
        <div class="content-wrapper">
          <router-view/>
        </div>
      </div>
    </body>
  </html>    
</template>

<script>

import Navbar from '@/components/app/Navbar'

export default {
  name: 'navbar',
  components: {
    Navbar
  },

  data: () => ({
        links: [ 
             {title: 'Группы', url: '/group' },
             {title: 'Студенты', url: '/students' },
             {title: 'Практика', url: '/practice' }
    ]
    }),
  
}
</script>

<style lang="scss">
.button.button-light{
  margin-right: 5%;
}
.button{
  width: max-content;
  margin-left: 1%;
  margin-bottom: 1%;
}
.GroupField{
  width: max-content;
}
.content-wrapper{
  margin-left: 1%;
}
.ui-title-4{
  margin-top: 1%
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
.textarea{
  width: 80%;
  height: 10rem;
  font-size: 105%;
}
.dparea{
  width: 100%;
  height: 10rem;
  font-size: 115%;
}
.doc{
  margin-left: 2%;
}
.arep{
  width: 80% !important;
}
td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
table {
   table-layout:fixed;
}
</style>