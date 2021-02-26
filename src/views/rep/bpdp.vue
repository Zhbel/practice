<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">{{prac.type}}: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Введение:</p>
          <textarea v-model="report.intro" class="textarea"></textarea>
          <p>Характеристика предприятия:</p>
          <textarea v-model="report.baseChar" class="textarea"></textarea>
          <p>Результаты выполнения индивидуальных заданий:</p>
          <textarea v-model="report.taskResults" class="textarea"></textarea>
          <p>Используемые источники:</p>
          <textarea v-model="report.usedRes" class="textarea"></textarea>
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
import { WidthType, BorderStyle, Document, Paragraph, Packer, TextRun, Header, Footer, AlignmentType, HeadingLevel, PageNumber, PageNumberFormat } from "docx";

export default {
    data: () => ({
        pid: '',
        sid: '',
        report: '',
        student: '',
        group: '',
        prac: '',
        ref: '',
        head: '',
        short_sname: '',
        short_hname: '',
        jobname: 'производственной практике'
    }),

    components: {
      Document, Paragraph, Packer, TextRun, saveAs, BorderStyle, WidthType, Header, Footer, AlignmentType, HeadingLevel, PageNumber, PageNumberFormat
    },

    async mounted() {
        this.pid = this.$route.query.prac
        this.sid = this.$route.query.stud
        //console.log(this.idRep)
        var pid = this.pid
        var sid = this.sid
        //console.log(this.pid)
        this.report = await this.$store.dispatch('getBpdpByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        Object.assign(this.report, {log: this.sid});

        this.group = await this.$store.dispatch('getGroupById', this.student.grid)
        this.ref = await this.$store.dispatch('getRefById', {pid, sid})
        this.year = new Date().getFullYear()
        this.prac = await this.$store.dispatch('getPracById', this.report.pid)
        this.head = await this.$store.dispatch('getHeadById', this.prac.pid)


        this.short_sname = this.initials(this.student.fname)
        this.short_hname = this.initials(this.head.fname)

        console.log(this.prac)
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

        createLitLine(text) {
          return new Paragraph({
              spacing: {
                              line: 360,
                          },
                    alignment: AlignmentType.JUSTIFIED,
                    //keepNext: true,
                    //keepLines: true,
                    children: [
                      new TextRun( {
                      text: text,
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
            await this.$store.dispatch('UpdateBpdp', this.report)
            this.$success("Успешно обновлено")
        }
        catch (e) {
          this.$error("Ошибка при обновлении!")
        }
        },

        createDoc(){
            if(this.report.baseChar == "" || this.report.taskResults == "" || this.report.intro == "" ||  this.report.usedRes == ""){
            this.$message("Заполните все поля перед созданием документа")
            return
            } 
            //console.log('create doc')
            
            const doc = new Document({
            creator: "VTIK Practice System",
            description: "Made in VTIK Practice System",
            title: "Report",
            });
            doc.Settings.addCompatibility().doNotExpandShiftReturn();

            const paragraph1 = new Paragraph({
                  spacing: {
                        line: 360,
                    },
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun( {
                  text: "Министерство науки и высшего образования Российской Федерации",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  }),

                  new TextRun( {
                  text: "Федеральное государственное бюджетное образовательное учреждение",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 1,
                  }),

                  new TextRun( {
                  text: "высшего образования",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 1,
                  }),

                  new TextRun( {
                  text: "«Уфимский государственный нефтяной технический университет»",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 1,
                  }),

                  new TextRun( {
                  text: "Кафедра «" + this.head.depart + "»",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 1,
                  }),

                  new TextRun( {
                  text: "Отчет",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 4,
                  }),

                  new TextRun( {
                  text: "по " + this.jobname,
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 1,
                  }),

                  new TextRun( {
                  text: "(тип: " + this.prac.type.toLowerCase() + ")",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
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
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 7,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t подпись, дата",
                    bold: false,
                    font: "Times New Roman",
                    size: 16,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "Место прохождения\t\t",
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 2,
                    }),

                    new TextRun( {
                    text: this.ref.pracbase,
                    underline: {},
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    }),

                    new TextRun( {
                    text: "практики",
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "Дипломный руководитель\t" + "_________________________",
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 3,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t   должность",
                    bold: false,
                    font: "Times New Roman",
                    size: 16,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t_________________________ " + this.initials(this.ref.pracHead),
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t   подпись, дата, оценка, МП",
                    bold: false,
                    font: "Times New Roman",
                    size: 16,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "Руководитель практики",
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 3,
                    }),

                    new TextRun( {
                    text: "от кафедры " + this.head.abbr + "\t\t_________________________ " + this.short_hname,
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t   подпись, дата",
                    bold: false,
                    font: "Times New Roman",
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
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 5,
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
	          children: [
            paragraph1,
            paragraph2,
            paragraph3
            ],
            
	          });
            
             ///титульник
            
             const introh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  alignment: AlignmentType.CENTER,
                  pageBreakBefore: true,
                  children: [
                    new TextRun( {
                    text: 'ВВЕДЕНИЕ',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                  ]
            });

            const contenth = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun( {
                    text: 'СОДЕРЖАНИЕ',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                    ]
            });

            const content = new Paragraph({
                  spacing: {
                            line: 360,
                        },
                  alignment: AlignmentType.JUSTIFIED,
                  children: [
                     new TextRun( {
                    text: 'Введение',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                    new TextRun( {
                    text: '1  Характеристика предприятия',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),
                    new TextRun( {
                    text: '2  Результаты выполнения индивидуальных заданий',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),
                    new TextRun( {
                    text: 'Список использованных источников',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),
                    new TextRun( {
                    text: 'Приложение A (обязательное). Часть ВКР',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),
                    new TextRun( {
                    text: 'Приложение Б (обязательное). Дневник по преддипломной практике',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),
                    ]
            });

            const lith = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  alignment: AlignmentType.CENTER,
                  pageBreakBefore: true,
                  children: [
                    new TextRun( {
                    text: 'СПИСОК ИСПОЛЬЗОВАННЫХ ИСТОЧНИКОВ',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                    ]
            });

            const baseCharh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun( {
                    text: '\t1\tХарактеристика предприятия',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                  ]
            });

            const resulth = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun( {
                    text: '\t2\tРезультаты выполнения индивидуальных заданий',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                  ]
            });

            let intro = this.splitLines(this.report.intro)
            let baseChar = this.splitLines(this.report.baseChar)
            let result = this.splitLines(this.report.taskResults)
            let lit = this.splitLines(this.report.usedRes)


            // console.log(intro)
            // console.log(baseChar)
            //  console.log(result)
            // console.log(lit)
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
                                bold: false,
                                font: "Times New Roman",
                                size: 24,
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
                    content,

                    introh,
                    ...intro
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

                    baseCharh,
                    ...baseChar
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
                    
                  
                    resulth,
                    ...result
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

                    lith,
                    ...lit
                    .map((string) => {
                        const arr = [];
                        const bulletPoints = this.splitParagraphIntoStrings(string);
                        //console.log(bulletPoints)
                        bulletPoints.forEach((bulletPoint) => {
                            arr.push(this.createLitLine(bulletPoint));
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