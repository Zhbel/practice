<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
         <div class="button button-primary ui-messageBox-ok" @click="click">docx</div>
        
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
        user: '',
        EditButton: false,
        someVariable: '1',
        depart: 'ВТИК',
        fdepart: 'Вычислительной техники и инженерной кибернетики',
        newid: '',
        fname: 'Фамилия',
        jobname: 'производственная',
        pracplace: 'ФГБОУ ВПО УГНТУ каф. ВТИК',
        group: 'БПО-11-11',
        stud: 'Моряков Аввакум Давидович',
        city: 'Уфа',
        datestart: '22.06.2020',
        dateend: '22.07.2020',
        jobdone: 'Выполнена',
        taskdone: 'Выполнено',
        studchar: 'Моряков А.Д. показал себя как ответственный, инициативный сотрудник. Все поставленные перед ним задачи выполнял добросовестно и в срок. Не допускал нарушения трудовой дисциплины. Программу практики выполнил в полном объеме. Оценка прохождения практики определяется как "отлично"',
        comment: 'отсутствуют',
        recomend: 'отсутствуют',
        spec: '09.03.01 «Информатика и вычислительная техника»',
        prof: '«Программное обеспечение средств вычислительной техники и автоматизированных систем»',
        var: '1',
        head: 'К.Л. Петров',
        phead: 'Марина Ахатовна Салихова',
        year: '',
        probject: '',
        theme: 'разработка программного обеспечения в рамках выпускной квалификационной работы',
        pmat: 'Цель практики, постановка задачи,  введение, сбор материала для ВКР, анализ и систематизация собранного материала ВКР, отчёт по результатам выполнения индивидуального задания и выводы по работе. В Приложении А отчета по практике должна быть представлен Дневник по практике в соответствии с указанной формой оформления.',
        pgmat: 'нет графического материала',

    }),
    components: {
      Document, Paragraph, Table, TableCell, TableRow, Packer, TextRun, saveAs, BorderStyle, WidthType, Header, Footer, AlignmentType, HeadingLevel, TableOfContents, StyleLevel, PageOrientation, Table 
    },

  async mounted(){
      this.year = new Date().getFullYear()
     },

  methods:{
    // async test(){
    //   var id = 'prac_oFfgUCjw'
    //   await this.$store.dispatch('deleteRefPr', id)
    // },
    click(){

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
                  right: 100,
                  left: 100,
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
                  right: 100,
                  left: 100,
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
                    text: ' ' + this.stud + '\t\t\t\t\t\t',
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
                    text: ' ' + this.group + '\t\t\t',
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
                    text: '\t\t' + this.pracplace + '\t\t\t\t\t',
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
                    text: '   ' + this.city + '\t\t\t\t\t\t\t\t\t\t',
                    underline: {}
                    }),


                    new TextRun( {
                    text: 'Сроки: ',
                    break: 2
                    }),

                    new TextRun( {
                    text: 'с ' + this.datestart + 'г. по ' + this.dateend + ' г.',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '1 Выполнение программы практики ',
                    break: 2
                    }),

                    new TextRun( {
                    text: '\t\t' + this.jobdone + '\t\t\t',
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
                    text: '\t\t' + this.taskdone + '\t\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t   (выполнена, выполнена не в полном объеме, не выполнена)',
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
                    text: ' ' + this.studchar,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '4 Замечания ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.comment + '\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '5 Рекомендации ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.recomend + '\t',
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
                    text: '\t\t\t',
                    break: 2,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t',
                    }),

                    new TextRun( {
                    text: '\t' + this.head + '\t\t',
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
                      text: '\t' + this.dateend + '\t\t',
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
                    text: '  ' + this.var + '  ',
                    size: '16',
                    underline: {}
                    }),

                    new TextRun( {
                    text: ' от ',
                    size: '16',
                    }),

                    new TextRun( {
                    text: '  ' + this.datestart + '  ',
                    size: '16',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '(Договор (соглашение) от ',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '  ' + this.datestart + '  ',
                    size: '16',
                    underline: {}
                    }),

                    new TextRun( {
                    text: ' № ',
                    size: '16',
                    }),

                    new TextRun( {
                    text: '  ' + this.var + '  )',
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
                    text: ' ' + this.var,
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
                    text: this.var,
                    underline: {}
                    }),

              new TextRun( {
                    text: ' курса',
                    }),
              
              new TextRun( {
                    text: '\t' + this.stud + '\t\t\t,',
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
                    text: this.group,
                    underline: {}
                    }),

              new TextRun( {
                    text: ' по направлению (специальности)',
                    }),

              new TextRun( {
                    text: this.spec + '\t\t\t\t',
                    underline: {},
                    break: 1
                    }),

              new TextRun( {
                    text: '(код и наименование направления (специальности), наименование направленности образовательной программы)',
                    size: '16',
                    break: 1
                    }),

              new TextRun( {
                    text: this.prof,
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
                    text: '\t\t' + this.pracplace + '\t\t\t\t\t',
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
                    text: '   ' + this.city + '\t\t\t\t\t\t\t\t\t\t',
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
                    text: 'с ' + this.datestart + ' г. по ' + this.dateend + ' г.',
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
                    text: 'Эльвира Раисовна Читахян',
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
                    text: 'Декан ФАПП \t\t\t\t',
                    break: 1
                    }),

                    new TextRun( {
                    text: 'Зухра Хасановна Павлова',
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
                    text: this.datestart + ' г.',
                    underline: {}
                    }),
              
              new TextRun( {
                    text: '\tС практики убыли ',
                    }),

              new TextRun( {
                    text: this.dateend + ' г.',
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
                  right: 100,
                  left: 100,
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
                  right: 100,
                  left: 100,
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
                    text: this.fdepart,
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
                    text: ' ' + this.stud + '\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: ' гр. ',
                    }),

                    new TextRun( {
                    text: ' ' + this.group + '\t',
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
                    text: '\t' + this.pracplace + '\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '2 Производственный объект (изделие) ',
                    break: 1
                    }),

                    new TextRun( {
                    text: this.probject,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '3 Примерная тема:',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.theme,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t(курсового проекта, выпускной квалификационной работы)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t',
                    break: 1,
                    size: 16
                    }),
                    new TextRun( {
                    text: '4 Перечень материалов, необходимых для отчета о практике (курсового, дипломного проектирования) ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.pmat,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '5 Перечень графического материала ',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.pgmat,
                    underline: {}
                    }),

                    new TextRun( {
                    text: 'Задание выдал:',
                    break: 2
                    }),

                    new TextRun( {
                    text: 'Руководитель практики от кафедры',
                    break: 1
                    }),

                    new TextRun( {
                    text: '\t',
                    break: 2
                    }),

                    new TextRun({
                      text: this.phead,
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t Дата выдачи ',
                    }),

                    new TextRun({
                      text: this.datestart + ' г.',
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
                    break: 1
                    }),

                    new TextRun({
                      text: this.stud,
                      underline: {}
                    }),

                    new TextRun( {
                    text: '\t Дата получения ',
                    }),

                    new TextRun({
                      text: this.datestart + ' г.',
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
                    

               ]
             })

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
                    text: ' ' + this.stud + '\t\t\t\t\t\t',
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
                    text: ' ' + this.group + '\t\t\t\t\t',
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
                    text: '\t\t' + this.pracplace + '\t\t\t\t\t',
                    underline: {},
                    break: 1
                    }),
                

                new TextRun( {
                    text: 'Сроки: ',
                    break: 2
                    }),

                new TextRun( {
                    text: 'с ' + this.datestart + 'г. по ' + this.dateend + ' г.',
                    underline: {}
                    }),

                new TextRun( {
                    text: '1 Выполнение программы практики ',
                    break: 2
                    }),

                    new TextRun( {
                    text: '\t\t' + this.jobdone + '\t\t\t',
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
                    text: '\t\t' + this.taskdone + '\t\t\t',
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t   (выполнена, выполнена не в полном объеме, не выполнена)',
                    size: '16',
                    break: 1
                    }),

                    new TextRun( {
                    text: '3 Общая характеристика студента ',
                    break: 2
                    }),

                    new TextRun( {
                    text: ' ' + this.studchar,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '4 Замечания',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.comment,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '5 Рекомендации',
                    break: 1
                    }),

                    new TextRun( {
                    text: ' ' + this.recomend,
                    underline: {}
                    }),

                    new TextRun( {
                    text: 'Руководитель практики от кафедры ' + this.depart,
                    break: 2
                    }),

                    new TextRun( {
                    text: '  cт. преподаватель',
                    break: 2,
                    underline: {}
                    }),

                    new TextRun( {
                    text: '\t\t\t\t',
                    }),

                    new TextRun( {
                    text: ' ' + this.phead + '  ',
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
                      text: '\t' + this.dateend + ' г.\t\t',
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
            bright.addChildElement(brighth)
            bright.addChildElement(brightm)
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
                saveAs(blob, 'ref' + this.fname + '.docx' );
            });
        }
         
    
    
  }

}

</script>

<style lang="scss">
</style>
