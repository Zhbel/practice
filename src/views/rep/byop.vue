<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">{{prac.type}}: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Программирование:</p>
          <textarea v-model="report.programmingTask" class="textarea"></textarea>
          <p>Кодирование данных:</p>
          <textarea v-model="report.dataCodeTask" class="textarea"></textarea>
          <p>Результаты выполнения тестовых заданий:</p>
          <textarea v-model="report.taskResults" class="textarea"></textarea>
          <p>Выводы по практике:</p>
          <textarea v-model="report.conclusion" class="textarea"></textarea>
          <div class="row">
          <div class="button button-primary" @click="saveRep">Сохранить</div>
          <div class="button button-light doc" @click="createDoc">Создать документ</div>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<script>
import { saveAs } from 'file-saver';
import { WidthType, BorderStyle, Document, Paragraph, Packer, TextRun, Header, Footer, AlignmentType, HeadingLevel, PageNumber, PageNumberFormat, TableOfContents, StyleLevel} from "docx";

export default {
    data: () => ({
        pid: '',
        sid: '',
        report: '',
        student: '',
        group: '',
        prac: '',
        head: '',
        short_sname: '',
        short_hname: '',
        jobname: ''
    }),

    components: {
      Document, Paragraph, Packer, TextRun, saveAs, BorderStyle, WidthType, Header, Footer, AlignmentType, HeadingLevel, PageNumber, PageNumberFormat, TableOfContents, StyleLevel
    },

    async mounted() {
        this.pid = this.$route.query.prac
        this.sid = this.$route.query.stud
        //console.log(this.idRep)
        var pid = this.pid
        var sid = this.sid
        //console.log(this.pid)
        this.report = await this.$store.dispatch('getByopByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        Object.assign(this.report, {log: this.sid});


        this.group = await this.$store.dispatch('getGroupById', this.student.grid)
        this.year = new Date().getFullYear()
        this.prac = await this.$store.dispatch('getPracById', this.report.pid)
        this.head = await this.$store.dispatch('getHeadById', this.prac.pid)


        this.short_sname = this.initials(this.student.fname)
        this.short_hname = this.initials(this.head.fname)
        //console.log(this.report)
        //console.log(this.student)

        //console.log(this.report)
        // console.log(this.group)
        // console.log(this.prac)
        // console.log(this.head)
        // console.log(this.report)
        // console.log(this.student)
        // console.log(this.short_sname)
        // console.log(this.short_hname)
    },

    methods: {
        splitLines(t) { return t.split(/\r\n|\r|\n/); },

        initials(value){
        var result = "";
        var tokens = value.split(/\s/);
        var fm = value.split(' ')
        //console.log(fm)
        for(var i =0; i < tokens.length; i++){
        if (i != 0){
        result += tokens[i].substring(0,1).toUpperCase();
        result += '.'
        }
         }
        return result + ' ' + fm[0];
        },

        splitParagraphIntoStrings(text){
        return text.split("\n\n");
        },

        createTextLine(text) {
        return new Paragraph({
            spacing: {
                            line: 360,
                        },
                  alignment: AlignmentType.JUSTIFIED,
                  //keepNext: true,
                  keepLines: true,
                  children: [
                    new TextRun( {
                    text: '\t' + text,
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                  ],
        });
      },

        async saveRep(){
        //console.log('saveRep')
        //console.log(this.report)
        try{
        await this.$store.dispatch('UpdateByop', this.report)
        this.$success("Успешно обновлено")
        }
        catch (e) {
          this.$error("Ошибка при обновлении!")
        }
      },

      createDoc(){
            //console.log('create doc')

            if(this.report.conclusion == "" || this.report.dataCodeTask == "" || this.report.programmingTask == "" || this.report.taskResults == ""){
            this.$message("Заполните все поля перед созданием документа")
            return
          }
          //console.log('create doc')

          const doc = new Document({
            creator: "VTIK Practice System",
            description: "Made in VTIK Practice System",
            title: "Report",

            styles: {

              paragraphStyles: [
                {
                    id: "HeadingCustom",
                    name: "HeadingCustom",
                    basedOn: "Heading1",
                    next: "Heading1",
                    //quickFormat: true,
                    run: {
                        italics: false,
                        bold: false,
                        font: "Times New Roman",
                        size: 28,
                        color: "000000",
                    },
                },

                {
                 // Only `name` prop required, `id` not necessary
                  name: 'Normal',
                  run: {
                    color: '#000000',
                    font: "Times New Roman",
                    size: 28,
                    italics: false,
                    bold: false,
                },}

                ],
                },
           });
          doc.Settings.addCompatibility().doNotExpandShiftReturn();
          ///титульник
            const paragraph1 = new Paragraph({
                  spacing: {
                        line: 360,
                    },
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun( {
                  text: "Министерство науки и высшего образования Российской Федерации",
                  }),

                  new TextRun( {
                  text: "Федеральное государственное бюджетное образовательное учреждение",
                  break: 1,
                  }),

                  new TextRun( {
                  text: "высшего образования",
                  break: 1,
                  }),

                  new TextRun( {
                  text: "«Уфимский государственный нефтяной технический университет»",
                  break: 1,
                  }),

                  new TextRun( {
                  text: "Кафедра «" + this.head.depart + "»",
                  break: 1,
                  }),

                  new TextRun( {
                  text: "Отчет",
                  break: 6,
                  }),

                  new TextRun( {
                  text: "по практике",
                  break: 1,
                  }),
                  new TextRun( {
                  text: "(тип: " + this.prac.type.toLowerCase() + ")",
                  break: 1,
                  }),
                  ],
                 
            });
            
            const paragraph2 = new Paragraph({
                  spacing: {
                            line: 240,
                        },
                  alignment: AlignmentType.LEFT,
                  //keepNext: false,
                  //keepLines: false,
                  //rightTabStop: '2000',
                  children: [
                    new TextRun( {
                    text: "Студент гр. " + this.group.title + "\t\t_________________________ " + this.short_sname,
                    break: 8,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t подпись, дата",
                    size: 16,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "Руководитель практики",
                    break: 2,
                    }),

                    new TextRun( {
                    text: "от кафедры " + this.head.abbr + "\t\t_________________________ " + this.short_hname,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t   подпись, дата, оценка",
                    size: 16,
                    break: 1,
                    }),
                    
                  ]
            });

            const paragraph3 = new Paragraph({
                  spacing: {
                            line: 360,
                        },
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun( {
                    text: "Уфа " + this.year,
                    break: 6,
                    }),
                  ]
            });
			
            doc.addSection({
            margins: {
            top: 850,
            right: 565,
            bottom: 850,
            left: 1700,
            },
            // size: {
            //   orientation: 'landscape'
            // },
	          children: [
            paragraph1,
            paragraph2,
            paragraph3
            ],
            
	          });
            
             ///титульник
            const contenth = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun( {
                    text: 'СОДЕРЖАНИЕ',
                    //break: 1,
                    }),
                    ]
            });

            // const content = new Paragraph({
            //       spacing: {
            //                 line: 360,
            //             },
            //       alignment: AlignmentType.JUSTIFIED,
            //       children: [
            //         //  new TextRun( {
            //         // text: 'Введение',
            //         // bold: false,
            //         // font: "Times New Roman",
            //         // size: 28,
            //         // //break: 1,
            //         // }),
            //         new TextRun( {
            //         text: '1  Программирование',
            //         bold: false,
            //         font: "Times New Roman",
            //         size: 28,
            //         //break: 1,
            //         }),
            //         new TextRun( {
            //         text: '2  Кодирование данных',
            //         bold: false,
            //         font: "Times New Roman",
            //         size: 28,
            //         break: 1,
            //         }),
            //         new TextRun( {
            //         text: '3  Результаты выполнения тестовых заданий',
            //         bold: false,
            //         font: "Times New Roman",
            //         size: 28,
            //         break: 1,
            //         }),
            //         new TextRun( {
            //         text: '4  Выводы по практике',
            //         bold: false,
            //         font: "Times New Roman",
            //         size: 28,
            //         break: 1,
            //         }),
            //         ]
            // });

            // var mas = ['1', '2', '3', '4', '5']
            // for(var i = 0; i < 5; i++){
            // var pt = new TextRun( {
            //         text: "Уфа " + mas[i],
            //         bold: false,
            //         font: "Times New Roman",
            //         size: 28,
            //         break: 1,
            //         });
            // content.addChildElement(pt)
            
            // }


            let programmingTask = this.splitLines(this.report.programmingTask)
            const programmingTaskh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t1\tПрограммирование",
                  style: "HeadingCustom",
                  // children: [
                  //   new TextRun( {
                  //   text: '\t1\tПрограммирование',
                  //   bold: false,
                  //   font: "Times New Roman",
                  //   size: 28,
                  //   //break: 1,
                  //   }),
                  // ]
            });
        //     new Paragraph({
        //     text: "My Spectacular Style #1",
        //     style: "MySpectacularStyle",
        //     pageBreakBefore: true,
        // }),

            let dataCodeTask = this.splitLines(this.report.dataCodeTask)
            const dataCodeTaskh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t2\tКодирование данных",
                  style: "HeadingCustom",
                  // children: [
                  //   new TextRun( {
                  //   text: '\t2\tКодирование данных',
                  //   bold: false,
                  //   font: "Times New Roman",
                  //   size: 28,
                  //   //break: 1,
                  //   }),
                  // ]
            });

            let taskResults = this.splitLines(this.report.taskResults)
            const taskResultsh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t3\tРезультаты выполнения тестовых заданий",
                  style: "HeadingCustom",
                  // children: [
                  //   new TextRun( {
                  //   text: '\t3\tРезультаты выполнения тестовых заданий',
                  //   bold: false,
                  //   font: "Times New Roman",
                  //   size: 28,
                  //   //break: 1,
                  //   }),
                  // ]
            });

            let conclusion = this.splitLines(this.report.conclusion)
            const conclusionh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t4\tВыводы по практике",
                  style: "HeadingCustom",
                  // children: [
                  //   new TextRun( {
                  //   text: '\t4\tВыводы по практике',
                  //   bold: false,
                  //   font: "Times New Roman",
                  //   size: 28,
                  //   //break: 1,
                  //   }),
                  // ]
            });

            let toc = new TableOfContents("Содержание",
                    {
                    hyperlink: true,
                    headingStyleRange: "1-1",
                    stylesWithLevels: [new StyleLevel("HeadingCustom", 1)],
                    
                    });

            doc.addSection({
            margins: {
            top: 850,
            right: 565,
            bottom: 850,
            left: 1700,
            },
            footers: {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [

                            new TextRun({
                                children: [PageNumber.CURRENT],
                            }),
                        ],
                    }),
                ],
            }),
            },
            properties: {
                pageNumberStart: 2,
                pageNumberFormatType: PageNumberFormat.DECIMAL,
            },

            children: [
                    
                    contenth,
                    toc,
                    
                    //content,

                    programmingTaskh,
                    ...programmingTask
                    .map((string) => {
                        const arr = [];
                        const bulletPoints = this.splitParagraphIntoStrings(string);
                        //console.log(bulletPoints)
                        bulletPoints.forEach((bulletPoint) => {
                            arr.push(this.createTextLine(bulletPoint));
                        });
                        //console.log(arr)
                        return arr;
                    })  .reduce((prev, curr) => prev.concat(curr), []),

                    dataCodeTaskh,
                    ...dataCodeTask
                    .map((string) => {
                        const arr = [];
                        const bulletPoints = this.splitParagraphIntoStrings(string);
                        //console.log(bulletPoints)
                        bulletPoints.forEach((bulletPoint) => {
                            arr.push(this.createTextLine(bulletPoint));
                        });
                        //console.log(arr)
                        return arr;
                    })  .reduce((prev, curr) => prev.concat(curr), []),
                    
                    taskResultsh,
                    ...taskResults
                    .map((string) => {
                        const arr = [];
                        const bulletPoints = this.splitParagraphIntoStrings(string);
                        //console.log(bulletPoints)
                        bulletPoints.forEach((bulletPoint) => {
                            arr.push(this.createTextLine(bulletPoint));
                        });
                        //console.log(arr)
                        return arr;
                    })  .reduce((prev, curr) => prev.concat(curr), []),

                    conclusionh,
                    ...conclusion
                    .map((string) => {
                        const arr = [];
                        const bulletPoints = this.splitParagraphIntoStrings(string);
                        //console.log(bulletPoints)
                        bulletPoints.forEach((bulletPoint) => {
                            arr.push(this.createTextLine(bulletPoint));
                        });
                        //console.log(arr)
                        return arr;
                    })  .reduce((prev, curr) => prev.concat(curr), []),
                    ]
            })  

             Packer.toBlob(doc).then(blob => {
                //console.log(this.fname)
                saveAs(blob,'report_' + this.student.login + '.docx' );
            });
      }


    }

    
}
</script>

<style lang="scss">

</style>
