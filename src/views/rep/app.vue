<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Педагогическая практика: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Описание места прохождения практики:</p>
          <textarea v-model="report.placeDesc" class="textarea"></textarea>
          <p>Реализуемые образовательные программы:</p>
          <textarea v-model="report.edProg" class="textarea"></textarea>
          <p>Постановка индивидуального задания:</p>
          <textarea v-model="report.personalTask" class="textarea"></textarea>
          <p>Этапы выполнения персонального задания:</p>
          <textarea v-model="report.PTparts" class="textarea"></textarea>
          <p>Используемые образовательные технологии:</p>
          <textarea v-model="report.usedEd" class="textarea"></textarea>
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
import { WidthType, BorderStyle, Document, Paragraph, Packer, TextRun, Header, Footer, AlignmentType, HeadingLevel, PageNumber, PageNumberFormat, TableOfContents, StyleLevel } from "docx";

export default {
    data: () => ({
        pid: '',
        sid: '',
        report: '',
        student: '',
        group: '',
        ref: '',
        year: '',
        prac: '',
        head: '',
        short_sname: '',
        short_hname: '',
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
        this.report = await this.$store.dispatch('getAppByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        Object.assign(this.report, {log: this.sid});

        this.group = await this.$store.dispatch('getGroupById', this.student.grid)
        this.ref = await this.$store.dispatch('getRefById', {pid, sid})
        this.year = new Date().getFullYear()
        this.prac = await this.$store.dispatch('getPracById', this.report.pid)
        this.head = await this.$store.dispatch('getHeadById', this.prac.pid)


        this.short_sname = this.initials(this.student.fname)
        this.short_hname = this.initials(this.head.fname)

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
        await this.$store.dispatch('UpdateApp', this.report)
        this.$success("Успешно обновлено")
        }
        catch (e) {
          this.$error("Ошибка при обновлении!")
        }
      },

      createDoc(){
            if(this.report.placeDesc == "" || this.report.edProg == "" || this.report.personalTask == "" ||  this.report.PTparts == "" || this.report.usedEd == "" || this.report.conclusion == "")
            {
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
                  break: 4,
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
                    text: "Аспирант гр. " + this.group.title + "\t\t ___________________ " + this.short_sname,
                    break: 5,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t подпись, дата",
                    bold: false,
                    font: "Times New Roman",
                    size: 16,
                    break: 1,
                    }),

                    new TextRun( {
                    text: "Место прохождения практики  \t",
                    break: 3,
                    }),

                    new TextRun( {
                    text: "УГНТУ, кафедра " + this.head.abbr,
                    underline: {},
                    }),


                    new TextRun( {
                    text: "Руководитель практики",
                    break: 3,
                    }),

                    new TextRun( {
                    text: "от кафедры " + this.head.abbr + "\t\t\t\ ___________________ " + this.short_hname,
                    break: 1,
                    }),


                    new TextRun( {
                    text: "\t\t\t\t\t\t  подпись, дата",
                    bold: false,
                    font: "Times New Roman",
                    size: 16,
                    break: 1,
                    }),


                    new TextRun( {
                    text: "\t\t\t\t\t\t\t\t\t\t Оценка: _________",
                    break: 4,
                    }),

                    new TextRun( {
                    text: "\t\t\t\t\t\t\t\t\t\t\t____________",
                    break: 2,
                    }),
                    new TextRun( {
                    text: "\t\t\t\t\t\t\t\t\t\t\t\t подпись, дата",
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
                    break: 3,
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

              const contenth = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  alignment: AlignmentType.CENTER,
                  pageBreakBefore: true,
                  text: "СОДЕРЖАНИЕ",
                  //style: "HeadingCustom",
            });
            const placeDesch = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t1\tОписание места прохождения практики",
                  style: "HeadingCustom",
            });

            const edProgh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t2\tРеализуемые образовательные программы",
                  style: "HeadingCustom",
            });

            const personalTaskh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t3\tПостановка индивидуального задания, календарный график выполнения задания",
                  style: "HeadingCustom",
            });

            const PTpartsh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t4\tЭтапы выполнения индивидуального задания и достигнутые результаты",
                  style: "HeadingCustom",
            });

            const usedEdh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t5\tИспользуемые образовательные технологии",
                  style: "HeadingCustom",
            });

            const pracdih = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t6\tДневник практики",
                  style: "HeadingCustom",
            });
            
            const conclusionh = new Paragraph({
                  spacing: {
                            line: 360,
                            after: 200,
                        },
                  pageBreakBefore: true,
                  alignment: AlignmentType.LEFT,
                  text: "\t7\tВыводы по практике",
                  style: "HeadingCustom",
            });

            let toc = new TableOfContents("Содержание",
                    {
                    hyperlink: true,
                    headingStyleRange: "1-1",
                    stylesWithLevels: [new StyleLevel("HeadingCustom", 1)],
                    
                    });

            let placeDesc = this.splitLines(this.report.placeDesc)
            let edProg = this.splitLines(this.report.edProg)
            let personalTask = this.splitLines(this.report.personalTask)
            let PTparts = this.splitLines(this.report.PTparts)
            let usedEd = this.splitLines(this.report.usedEd)
            let conclusion = this.splitLines(this.report.conclusion)

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
                    toc,
                    //content,

                    placeDesch,
                    ...placeDesc
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

                    edProgh,
                    ...edProg
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
                    
                    personalTaskh,
                    ...personalTask
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

                    PTpartsh,
                    ...PTparts
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

                    usedEdh,
                    ...usedEd
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
                    
                    pracdih,

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