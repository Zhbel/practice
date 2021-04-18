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
          <div class="ui-card ui-card--shadow-always ref">
          <div align="center"><p>Общая информация</p></div>
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
          <p>Курс обучающегося:</p>
          <input class="arep" type="text" v-model="referral.univYear"  placeholder="1/2/3/4">
          <p>Декан</p>
          <input class="arep" type="text" v-model="referral.dean" placeholder="Фамилия Имя Отчество">
          <p>Факультет</p>
          <input class="arep" type="text" v-model="referral.faculty" placeholder="ФАПП">
          <p>Руководитель практики от университета</p>
          <input class="arep" type="text" v-model="referral.Uhead" placeholder="Фамилия Имя Отчество">
          </div>
          
          <div class="ui-card ui-card--shadow-always ref">
            <div align="center"><p>Отзыв руководителя практики от профильной организации</p></div>
            <br>
            <p>Руководитель практики (от предприятия):</p>
            <input class="arep" type="text" v-model="referral.pracHead" placeholder="Фамилия Имя Отчество">
            <p>Должность руководителя:</p>
            <input class="arep" type="text" v-model="referral.headPosition">
            <p>Выполнение программы практики:</p>
            <input class="arep" type="text" v-model="referral.pracResult" placeholder="(выполнена, выполнена не в полном объеме, не выполнена)">
            <p>Выполнение индивидуального задания:</p>
            <input class="arep" type="text" v-model="referral.pracTaskRes" placeholder="(выполнено, выполнено не в полном объеме, не выполнено)">
            <p>Характеристика студента:</p>
            <textarea v-model="referral.studChar" class="textarea"></textarea>
            <p>Замечания:</p>
            <input class="arep" type="text" v-model="referral.comment">
            <p>Рекомендации:</p>
            <input class="arep" type="text" v-model="referral.recomend">
          </div>
          
          <div class="ui-card ui-card--shadow-always ref">
          <div align="center"><p>Индивидуальное задание</p></div>
          <p>Производственный объект:</p>
          <textarea v-model="referral.prodObj" class="textarea"></textarea>
          <p>Примерная тема:</p>
          <textarea v-model="referral.theme" class="textarea"></textarea>
          <p>Перечень материалов:</p>
          <textarea v-model="referral.listMat" class="textarea"></textarea>
          <p>Перечень графических материалов:</p>
          <textarea v-model="referral.listGraph" class="textarea"></textarea>
          </div>

          <div class="ui-card ui-card--shadow-always ref">
            <div align="center"><p>Отзыв руководителя практики от кафедры</p></div>
            <p>Должность руководителя:</p>
            <input class="arep" type="text" v-model="referral.headPositionD">
            <p>Выполнение программы практики:</p>
            <input class="arep" type="text" v-model="referral.pracResultD" placeholder="(выполнена, выполнена не в полном объеме, не выполнена)">
            <p>Выполнение индивидуального задания:</p>
            <input class="arep" type="text" v-model="referral.pracTaskResD" placeholder="(выполнено, выполнено не в полном объеме, не выполнено)">
            <p>Характеристика студента:</p>
            <textarea v-model="referral.studCharD" class="textarea"></textarea>
            <p>Замечания:</p>
            <input class="arep" type="text" v-model="referral.commentD">
            <p>Рекомендации:</p>
            <input class="arep" type="text" v-model="referral.recomendD">
          </div>
          

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
import { saveAs } from 'file-saver';
import { WidthType, BorderStyle, Document, Paragraph, Table, TableCell, TableRow, Packer, TextRun, Header, Footer, AlignmentType, HeadingLevel, TableOfContents, StyleLevel, PageOrientation, SectionType } from "docx";

export default {
    data: () => ({
        pid: '',
        sid: '',
        referral: '',
        student: '',
        edlvls: [],
        prac: '',
        group: '',
        head: '',
        jobname: '',
    }),

    components: {
      Document, Paragraph, Table, TableCell, TableRow, Packer, TextRun, saveAs, BorderStyle, WidthType, Header, Footer, AlignmentType, HeadingLevel, TableOfContents, StyleLevel, PageOrientation, Table 
    },

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
        this.group = await this.$store.dispatch('getGroupById', this.student.grid)
        this.head = await this.$store.dispatch('getHeadById', this.prac.pid)
        this.edlvls = await this.$store.dispatch('getPracList')
        Object.assign(this.referral, {log: this.sid});

        //let practable = this.edlvls.find(edlvl => edlvl.title == this.prac.type && edlvl.edlvl == this.group.edlvl).tablename
        this.jobname = await this.$store.dispatch('getPracListByType', this.prac.type)
        //console.log(practable)
        //console.log(this.student)
        // console.log(this.referral)
        // console.log(this.student)
        // console.log(this.prac)
        // console.log(this.group)
        // console.log(this.head)
    },

    methods: {

        async saveRef(){
        //console.log('saveRep')
       // console.log(this.report)
        try{
        await this.$store.dispatch('UpdateRef', this.referral)
        this.$success("Успешно обновлено")
        }
        catch (e) {
          this.$error("Ошибка при обновлении!")
        }
      },

      createDoc(){
            const doc = new Document({
              styles: {

              paragraphStyles: [
                {
                 // Only `name` prop required, `id` not necessary
                  name: 'Normal',
                  run: {
                    color: '#000000',
                    font: "Times New Roman",
                    size: 24,
                    italics: false,
                    bold: false,
                },}

                ],
                },
            });


          const table = new Table({
            columnWidths: [],
            alignment: AlignmentType.CENTER,
            rows: [],
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                        }
                    });

          let row = new TableRow({
               children: [
                 
              
              ]})

          let left = new TableCell({
                  width: {
                    //size: 8085,
                    size: 50,
                    type: WidthType.PERCENTAGE,
                        },
                  //verticalAlign: AlignmentType.CENTER,
                  margins: {
                  right: 200,
                  left: 200,
                  },
                  children: [
                    ],
              });

          let right = new TableCell({
                  //verticalAlign: AlignmentType.CENTER,
                  width: {
                    //size: 7705,
                    size: 50,
                    type: WidthType.PERCENTAGE,
                        },
                  margins: {
                  right: 200,
                  left: 200,
                  },
                  children: [
                    ],
              });
          
          let lefth = new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                    new TextRun( {
                    text: 'ОТЗЫВ',
                    }),
                    new TextRun( {
                    text: 'руководителя практики от профильной организации',
                    break: 1,
                    }),
                    ]

                    })

          let leftm = new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                    new TextRun( {
                    text: '',
                    size: '16',
                    break: 1
                    }),
                    new TextRun( {
                    text: 'Студент ',
                    }),

                    new TextRun( {
                    text: ' ' + this.student.fname + '\t\t\t\t\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t(Фамилия, имя, отчество полностью)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Группа ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.group.title + '\t\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t  (Шифр производственной группы)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Вид практики ',
                    break: 1
                    }),

                    new TextRun( {
                    text: '    ' + this.jobname + '\t\t\t\t\t\t',
                    underline: {}
                    }),

                    
                    new TextRun( {
                    text: 'База практики – профильная организация:',
                    break: 1
                    }),


                    new TextRun( {
                    text: '\t\t' + this.referral.pracbase + '\t\t\t\t\t',
                    underline: {},
                    break: 2
                    }),

                    new TextRun( {
                    text: '\t\t(наименование предприятия, организации, учреждения)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'в г. ',
                    break: 1
                    }),

                    new TextRun( {
                    text: '   ' + this.referral.city + '\t\t\t\t\t\t\t\t\t\t',
                    underline: {}
                    }),


                    new TextRun( {
                    text: 'Сроки: ',
                    break: 2
                    }),

                    new TextRun( {
                    text: 'с ' + this.prac.datestart + 'г. по ' + this.prac.dateend + ' г.',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '1 Выполнение программы практики ',
                    break: 2
                    }),

                    new TextRun( {
                    text: '\t\t' + this.referral.pracResult + '\t\t\t',
                    underline: {}
                    }),
                    new TextRun( {
                    text: '\t\t\t\t   (выполнена, выполнена не в полном объеме, не выполнена)',
                    size: '16',
                    break: 1
                    }),


                    new TextRun( {
                    text: '2 Выполнение индивидуального задания ',
                    break: 2
                    }),

                    new TextRun( {
                    text: '\t\t' + this.referral.pracTaskRes + '\t\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t   (выполнено, выполнено не в полном объеме, не выполнено)',
                    size: '16',
                    break: 1
                    }),

                    // new TextRun( {
                    // text: 'руководителя практики от профильной организации',
                    // break: 1,
                    // }),
                    ]

                    })

          let leftj = new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
                    children: [
                    new TextRun( {
                    text: '3 Общая характеристика студента ',
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.studChar,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '4 Замечания ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.comment + '\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '5 Рекомендации ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.recomend+ '\t',
                    underline: {}
                    }),

                    ]
            
          })

          let leftf = new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun( {
                    text: 'Руководитель практики от профильной организации',
                    break: 1
                    }),
                    
                    new TextRun( {
                    text: this.referral.headPosition,
                    break: 2,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t',
                    }),

                    new TextRun( {
                    text: this.referral.pracHead ,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '(должность) \t\t\t\t\t\t (имя отчество фамилия)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t\t\t\t\t\t',
                    break: 1
                    }),

                    new TextRun({
                      text: '\t' + this.prac.dateend + '\t\t',
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t\t\t\t(Дата)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    break: 1
                    }),
            ]
          })

          let righthr = new Paragraph({
                    
                    alignment: AlignmentType.RIGHT,
                    children: [
                    new TextRun( {
                    text: 'Форма № 1-ПР ',
                    size: '20'
                    }),
                    ]
                    })

          let righthc = new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [

                    new TextRun( {
                    text: 'Министерство науки и высшего образования Российской Федерации',
                    size: '18',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Федеральное государственное бюджетное образовательное учреждение',
                    size: '18',
                    break: 1,
                    }),

                    new TextRun( {
                    text: 'высшего образования',
                    size: '18',
                    break: 1,
                    }),

                    new TextRun( {
                    text: '«УФИМСКИЙ ГОСУДАРСТВЕННЫЙ НЕФТЯНОЙ ТЕХНИЧЕСКИЙ',
                    size: '22',
                    break: 1,
                    }),

                    new TextRun( {
                    text: 'УНИВЕРСИТЕТ» (УГНТУ)',
                    size: '22',
                    break: 1,
                    }),
                    ]
                    })
          
            let righthl = new Paragraph({
                    
                    alignment: AlignmentType.LEFT,
                    thematicBreak: true,
                    children: [
                    new TextRun( {
                    text: 'ул. Космонавтов, 1, г. Уфа, Башкортостан, 450062	',
                    size: '16'
                    }),

                    new TextRun( {
                    text: 'тел. (347) 242-03-70	',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Приказ № ',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '  ' + this.referral.order + '  ',
                    size: '16',
                    underline: {}
                    }),

                    new TextRun( {
                    text: ' от ',
                    size: '16',
                    }),

                    new TextRun( {
                    text: '  ' + this.referral.orderdate + '  ',
                    size: '16',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '(Договор (соглашение) от ',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '  ' + this.referral.contractDate + '  ',
                    size: '16',
                    underline: {}
                    }),

                    new TextRun( {
                    text: ' № ',
                    size: '16',
                    }),

                    new TextRun( {
                    text: '  ' + this.referral.contractNum + '  )',
                    size: '16',
                    underline: {}
                    }),
                    
                    ]
                    })
          

          let rightmc = new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun( {
                    text: '\t',
                    size: '16',
                   // break: 1
                    }),

              new TextRun( {
                    text: 'НАПРАВЛЕНИЕ № ',
                    break: 1
                    }),
              
              new TextRun( {
                    text: ' ' + this.referral.refNum,
                    underline: {}
                    }),

              new TextRun( {
                    text: '(прилагается к отчету о практике)',
                    size: '16',
                    break: 1
                    }),
            ]
          })

          let rightml = new Paragraph({
            alignment: AlignmentType.LEFT,
            thematicBreak: true,
            children: [
              new TextRun( {
                    text: 'Студент ',
                    }),

              new TextRun( {
                    text: this.referral.univYear,
                    underline: {}
                    }),

              new TextRun( {
                    text: ' курса',
                    }),
              
              new TextRun( {
                    text: '\t' + this.student.fname + '\t\t\t,',
                    underline: {}
                    }),
                    
              new TextRun( {
                    text: '\t\t\t\t(фамилия, имя, отчество)',
                    size: '16',
                    break: 1
                    }),
              
              new TextRun( {
                    text: 'обучающийся в группе ',
                    break: 1
                    }),

              new TextRun( {
                    text: this.group.title,
                    underline: {}
                    }),

              new TextRun( {
                    text: ' по направлению (специальности)',
                    }),

              new TextRun( {
                    text: this.group.spec + '\t\t\t\t',
                    underline: {},
                    break: 1
                    }),

              new TextRun( {
                    text: '(код и наименование направления (специальности), наименование направленности образовательной программы)',
                    size: '16',
                    break: 1
                    }),

              new TextRun( {
                    text: '«' + this.group.profile + '»',
                    underline: {},
                    break: 1
                    }),
              
              new TextRun( {
                    text: 'направляется для прохождения ',
                    break: 1
                    }),
                
              new TextRun( {
                    text: this.jobname.substring(0, this.jobname.length - 2) + 'ой',
                    underline: {}
                    }),
              
              new TextRun( {
                    text: ' практики в (на)',
                    }),

              new TextRun( {
                    text: '\t\t\t\t\t(вид (тип) практики)',
                    size: '16',
                    break: 1
                    }),
              
              new TextRun( {
                    text: '\t\t' + this.referral.pracbase + '\t\t\t\t\t',
                    underline: {},
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t\t(наименование предприятия, организации, учреждения)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'в г. ',
                    break: 1
                    }),

                    new TextRun( {
                    text: '   ' + this.referral.city + '\t\t\t\t\t\t\t\t\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t',
                    size: '18',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Срок практики: ',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'с ' + this.prac.datestart + ' г. по ' + this.prac.dateend + ' г.',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t',
                    size: '18',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Руководитель практики \t\t\t',
                    break: 1
                    }),

                    new TextRun( {
                    text: this.referral.Uhead,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t\t\t(имя отчество фамилия)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t',
                    size: '18',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Декан ' + this.referral.faculty + ' \t\t\t\t',
                    break: 1
                    }),

                    new TextRun( {
                    text: this.referral.dean,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t\t\t(имя отчество фамилия)',
                    size: '16',
                    break: 1
                    }),
            ]
          })


          let rightb = new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun( {
                    text: '\t',
                    size: '18',
                    }),

              new TextRun( {
                    text: 'На практику прибыли ',
                    break: 1
                    }),
              
              new TextRun( {
                    text: this.prac.datestart + ' г.',
                    underline: {}
                    }),
              
              new TextRun( {
                    text: '\tС практики убыли ',
                    }),

              new TextRun( {
                    text: this.prac.dateend + ' г.',
                    underline: {}
                    }),
              new TextRun( {
                    text: '\t\t\t        (дата)\t\t\t\t\t (дата)',
                    size: '16',
                    break: 1
                    }),

              new TextRun( {
                    text: 'Начальник ______________\t\tНачальник ______________',
                    break: 1
                    }),

              new TextRun( {
                    text: '\t            (наименование кадровой службы)\t\t\t\t               (наименование кадровой службы)',
                    size: '12',
                    break: 1
                    }),

              new TextRun( {
                    text: '__________  ______________ \t\t\t__________  ______________',
                    size: '22',
                    break: 1
                    }),

              new TextRun( {
                    text: '  (подпись)          (иницициалы, фамилия) \t\t  (подпись)          (иницициалы, фамилия) ',
                    size: '16',
                    break: 1
                    }),

              new TextRun( {
                    text: 'М.П. \t\t\t\t\t\tМ.П.',
                    size: '22',
                    break: 1
                    }),
            ]
          })

          let brow = new TableRow({
               children: [
                 
              
              ]})

          let bleft = new TableCell({
                  width: {
                    //size: 8085,
                    size: 50,
                    type: WidthType.PERCENTAGE,
                        },
                  //verticalAlign: AlignmentType.CENTER,
                  margins: {
                  right: 200,
                  left: 200,
                  },
                  children: [
                    ],
              });

          let bright = new TableCell({
                  width: {
                    //size: 8085,
                    size: 50,
                    type: WidthType.PERCENTAGE,
                        },
                  //verticalAlign: AlignmentType.CENTER,
                  margins: {
                  right: 200,
                  left: 200,
                  },
                  children: [
                    ],
              });

            let blefth = new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun( {
                    text: 'Кафедра ',
                    }),
                new TextRun( {
                    text: this.head.depart,
                    underline: {}
                    }),
                new TextRun( {
                    text: 'ИНДИВИДУАЛЬНОЕ ЗАДАНИЕ',
                    break: 1
                    }),
                new TextRun( {
                    text: 'на ',
                    break: 1
                    }),
                new TextRun( {
                    text: this.jobname.substring(0, this.jobname.length - 2) + 'ую ',
                    underline: {}
                    }),
                new TextRun( {
                    text: 'практику',
                    }),
              ]
            })

             let bleftm = new Paragraph({
               alignment: AlignmentType.LEFT,
               children: [
                    new TextRun( {
                    text: 'Студент ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.student.fname + '\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: ' гр. ',
                    }),

                    new TextRun( {
                    text: ' ' + this.group.title + '\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t(Фамилия, имя, отчество полностью) \t\t\t(шифр)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '1 База(ы) практики  ',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t' + this.referral.pracbase + '\t\t',
                    underline: {}
                    }),

                   

                   
                    

               ]
             })

             
             let bleftmC = new Paragraph({
               alignment: AlignmentType.JUSTIFIED,
               children: [
                  new TextRun( {
                    text: '2 Производственный объект (изделие) ',
                    break: 1
                    }),

                    new TextRun( {
                    text: this.referral.prodObj,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '3 Примерная тема:',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.theme,
                    underline: {}
                    }),

               ]})

              let bleftmP = new Paragraph({
               alignment: AlignmentType.LEFT,
               children: [
                 new TextRun( {
                    text: '\t\t(курсового проекта, выпускной квалификационной работы)',
                    size: '16',
                    }),
               ]})


                let bleftmC2 = new Paragraph({
               alignment: AlignmentType.JUSTIFIED,
               children: [
                    new TextRun( {
                    text: '\t',
                    size: 16
                    }),
                    new TextRun( {
                    text: '4 Перечень материалов, необходимых для отчета о практике (курсового, дипломного проектирования) ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.listMat,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '5 Перечень графического материала ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.listGraph,
                    underline: {}
                    }),
               ]})

               let bleftmL = new Paragraph({
               alignment: AlignmentType.LEFT,
               children: [

                new TextRun( {
                    text: 'Задание выдал:',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Руководитель практики от кафедры',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t   ',
                    break: 2
                    }),

                    new TextRun({
                      text: this.head.fname,
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t Дата выдачи ',
                    }),

                    new TextRun({
                      text: this.prac.datestart + ' г.',
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t(имя отчество фамилия)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Задание получил:',
                    break: 2
                    }),

                    new TextRun( {
                    text: 'Студент ',
                    break: 2
                    }),

                    new TextRun({
                      text: this.student.fname,
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t Дата получения ',
                    }),

                    new TextRun({
                      text: this.prac.datestart + ' г.',
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t(имя отчество фамилия)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t',
                    break: 1
                    }),
               ]})

            let brighth = new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun( {
                    text: 'ОТЗЫВ',
                    }),
                new TextRun( {
                    text: 'руководителя практики от кафедры',
                    break: 1
                    }),
              ]
            })

            let brightm = new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun( {
                    text: '\t',
                    size: '16'
                    }),
                new TextRun( {
                    text: 'Студент ',
                    break: 1
                    }),
                new TextRun( {
                    text: ' ' + this.student.fname + '\t\t\t\t\t\t',
                    underline: {}
                    }),

                new TextRun( {
                    text: '\t\t(Фамилия, имя, отчество полностью)',
                    size: '16',
                    break: 1
                    }),
                
                new TextRun( {
                    text: 'Группа ',
                    break: 1
                    }),

                new TextRun( {
                    text: ' ' + this.group.title + '\t\t\t\t\t',
                    underline: {}
                    }),
                
                new TextRun( {
                    text: '\t(Шифр производственной группы)',
                    size: '16',
                    break: 1
                    }),

                new TextRun( {
                    text: '\t',
                    size: '16',
                    break: 1
                    }),

                new TextRun( {
                    text: 'Вид практики ',
                    break: 1
                    }),

                new TextRun( {
                    text: ' ' + this.jobname + '\t\t\t\t',
                    underline: {}
                    }),

                new TextRun( {
                    text: '\t',
                    size: '16',
                    break: 1
                    }),

                new TextRun( {
                    text: 'База практики',
                    break: 1
                    }),


                new TextRun( {
                    text: '\t\t' + this.referral.pracbase + '\t\t\t\t\t',
                    underline: {},
                    break: 1
                    }),
                

                new TextRun( {
                    text: 'Сроки: ',
                    break: 2
                    }),

                new TextRun( {
                    text: 'с ' + this.prac.datestart + 'г. по ' + this.prac.dateend + ' г.',
                    underline: {}
                    }),

                new TextRun( {
                    text: '1 Выполнение программы практики ',
                    break: 2
                    }),

                    new TextRun( {
                    text: '\t\t' + this.referral.pracResultD + '\t\t\t',
                    underline: {}
                    }),
                    new TextRun( {
                    text: '\t\t\t\t   (выполнена, выполнена не в полном объеме, не выполнена)',
                    size: '16',
                    break: 1
                    }),


                    new TextRun( {
                    text: '2 Выполнение индивидуального задания ',
                    break: 2
                    }),

                    new TextRun( {
                    text: '\t\t' + this.referral.pracTaskResD + '\t\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t   (выполнено, выполнено не в полном объеме, не выполнено)',
                    size: '16',
                    break: 1
                    }),

                    
              ]
            })

            let brightmJ = new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun( {
                    text: '3 Общая характеристика студента ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.studCharD,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '4 Замечания ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.commentD + '\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '5 Рекомендации ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.referral.recomendD + '\t',
                    underline: {}
                    }),
              ]})

              let brightmL = new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun( {
                    text: 'Руководитель практики от кафедры ' + this.head.abbr,
                    break: 1
                    }),

                    new TextRun( {
                    text: this.referral.headPositionD,
                    break: 2,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t',
                    }),

                    new TextRun( {
                    text: ' ' + this.head.fname + '  ',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '(должность) \t\t\t\t\t\t (имя отчество фамилия)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t\t\t\t\t\t',
                    break: 1
                    }),

                    new TextRun({
                      text: '\t' + this.prac.dateend + ' г.\t\t',
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t\t\t\t(Дата)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    break: 1
                    }),
                ]
              })

            left.addChildElement(lefth)
            left.addChildElement(leftm)
            left.addChildElement(leftj)
            left.addChildElement(leftf)
            right.addChildElement(righthr)
            right.addChildElement(righthc)
            right.addChildElement(righthl)
            right.addChildElement(rightmc)
            right.addChildElement(rightml)
            right.addChildElement(rightb)
            bleft.addChildElement(blefth)
            bleft.addChildElement(bleftm)
            bleft.addChildElement(bleftmC)
            bleft.addChildElement(bleftmP)
            bleft.addChildElement(bleftmC2)
            bleft.addChildElement(bleftmL)
            bright.addChildElement(brighth)
            bright.addChildElement(brightm)
            bright.addChildElement(brightmJ)
            bright.addChildElement(brightmL)
            row.addChildElement(left)
            row.addChildElement(right)
            brow.addChildElement(bleft)
            brow.addChildElement(bright)
            table.addChildElement(row)
            table.addChildElement(brow)

          doc.addSection({
            size: {
                 orientation: 'landscape'
                },
            margins: {
            top: 565,
            right: 285,
            bottom: 565,
            left: 565,
            },
            children: [
                table
            ],
          });

          
			
            
            Packer.toBlob(doc).then(blob => {
                //console.log(this.fname)
                saveAs(blob, 'ref' + this.student.login + '.docx' );
            });
        }
      }


    }

    

</script>

<style lang="scss">
.ui-card.ref{
  width: 90%;
}
</style>