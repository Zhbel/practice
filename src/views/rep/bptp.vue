<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Производственно-технологическая практика: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Введение:</p>
          <textarea v-model="report.intro" class="textarea"></textarea>
          <p>Характеристика предприятия:</p>
          <textarea v-model="report.baseChar" class="textarea"></textarea>
          <p>Характеристика оборудования:</p>
          <textarea v-model="report.equipChar" class="textarea"></textarea>
          <p>Используемые программные продукты:</p>
          <textarea v-model="report.progChar" class="textarea"></textarea>
          <p>Результат выполнения индивидуальных заданий:</p>
          <textarea v-model="report.result" class="textarea"></textarea>
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
        ref: '',
        student: '',
        group: '',
        year: '',
        head: '',
        prac: '',
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
        this.report = await this.$store.dispatch('getBptpByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        Object.assign(this.report, {log: this.sid});


        //console.log(this.idRep)
        this.group = await this.$store.dispatch('getGroupById', this.student.grid)
        this.ref = await this.$store.dispatch('getRefById', {pid, sid})
        this.year = new Date().getFullYear()
        this.prac = await this.$store.dispatch('getPracById', this.report.pid)
        this.head = await this.$store.dispatch('getHeadById', this.prac.pid)


        this.short_sname = this.initials(this.student.fname)
        this.short_hname = this.initials(this.head.fname)


        //this.short_sname = tmp.join('')
        //console.log(this.short_hname)
        

        //console.log(this.splitLines(this.report.intro))

        //console.log(this.report)
        //console.log(this.group)
        //console.log(this.prac)
        //console.log(this.ref)
        //console.log(this.head)
        //console.log(this.report)
        //console.log(this.student)
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

        try{
            await this.$store.dispatch('UpdateBptp', this.report)
            this.$success("Успешно обновлено")
        }
        catch (e) {
          this.$error("Ошибка при обновлении!")
        }
        },

        createDoc(){

          if(this.report.baseChar == "" || this.report.equipChar == "" || this.report.intro == "" || this.report.progChar == "" || this.report.result == ""){
            this.$message("Заполните все поля перед созданием документа")
            return
          }
            
          const doc = new Document({
            creator: "VTIK Practice System",
            description: "Made in VTIK Practice System",
            title: "Report",
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
                  text: "(практика по получению профессиональных умений",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 1,
                  }),

                  new TextRun( {
                  text: "и опыта профессиональной деятельности)",
                  bold: false,
                  font: "Times New Roman",
                  size: 28,
                  break: 1,
                  })
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
                    text: "Студент гр. " + this.group.title + "\t\t___________________________ " + this.short_sname,
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 6,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t подпись, дата",
                    bold: false,
                    font: "Times New Roman",
                    size: 16,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "Место\t\t\t\t",
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
                    text: "прохождения практики",
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "Руководитель практики\t\t" + "___________________________",
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 3,
                    }),

                    new TextRun( {
                    text: "от предприятия\t\t\t\t\t",
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "должность",
                    bold: false,
                    font: "Times New Roman",
                    size: 16,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t___________________________ " + this.initials(this.ref.pracHead),
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
                    text: "от кафедры " + this.head.abbr + "\t\t___________________________ " + this.short_hname,
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
                    break: 4,
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

            const equipCharh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun( {
                    text: '\t2\tХарактеристика оборудования',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                  ]
            });

            const progCharh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun( {
                    text: '\t3\tИспользуемые программные продукты',
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
                    text: '\t4\tРезультат выполнения индивидуальных заданий',
                    bold: false,
                    font: "Times New Roman",
                    size: 28,
                    //break: 1,
                    }),
                  ]
            });

            
            
            let intro = this.splitLines(this.report.intro)
            let baseChar = this.splitLines(this.report.baseChar)
            let equipChar = this.splitLines(this.report.equipChar)
            let progChar = this.splitLines(this.report.progChar)
            let result = this.splitLines(this.report.result)

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
                    
                    equipCharh,
                    ...equipChar
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

                    progCharh,
                    ...progChar
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