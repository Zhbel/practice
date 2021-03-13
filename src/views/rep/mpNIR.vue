<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
          <p class="ui-title-4 center">Научное исследование: Отчет</p>
          <p class="ui-title-4 center">{{student.fname}}</p>
          <p>Полугодие:</p>
          <input class="arep" type="text" v-model="report.halfyear">
          <p>Работы, выполненные по диссертации:</p>
          <textarea v-model="report.workbefore" class="textarea"></textarea>
          <p>Опубликована работа/подготовлена рукопись статьи:</p>
          <p>(Авторы. Название. // Сборник. – Город: Издательство, Год. – Страницы)</p>
          <textarea v-model="report.publicW" class="textarea"></textarea>
          <p>Участие в конкурсах, конференциях (указать названия, уровень, результат):</p>
          <textarea v-model="report.conf" class="textarea"></textarea>
          <p>Другие виды работ по НИР:</p>
          <textarea v-model="report.other" class="textarea"></textarea>
          <p>Отзыв руководителя:</p>
          <textarea v-model="report.review" class="textarea"></textarea>
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
        prac: '',
        year: '',
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
        this.report = await this.$store.dispatch('getMpNIRByID', {pid, sid})
        this.student = await this.$store.dispatch('getStudById', this.report.sid)
        this.prac = await this.$store.dispatch('getPracById', this.report.pid)
        Object.assign(this.report, {log: this.sid});
        //console.log(this.report)
        //console.log(this.student)
        //console.log(this.prac)
        this.year = this.toDate(this.prac.datestart).getFullYear()
        //console.log(this.year)
    },

    methods: {

        toDate (dateStr) {
        const [day, month, year] = dateStr.split(".")
        return new Date(year, month - 1, day)
        },

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
        await this.$store.dispatch('UpdateMpNIR', this.report)
        this.$success("Успешно обновлено")
        }
        catch (e) {
          this.$error("Ошибка при обновлении!")
        }
      },

      createDoc(){
            if(this.report.halfyear == "" || this.report.workbefore == "" || this.report.publicW == "" ||  this.report.conf == "" || this.report.other == "")
            {
            this.$message("Заполните 1-4 поле перед созданием документа")
            return
            }

            const doc = new Document({
            creator: "VTIK Practice System",
            description: "Made in VTIK Practice System",
            title: "Report",

            styles: {

              paragraphStyles: [

                {
                 // Only `name` prop required, `id` not necessary
                  name: 'Normal',
                  run: {
                    color: '#000000',
                    font: "Times New Roman",
                    size: 26,
                    italics: false,
                    bold: false,
                },}

                ],
                },
           });

           doc.Settings.addCompatibility().doNotExpandShiftReturn();
           const paragraph1 = new Paragraph({
                  spacing: {
                        //line: 360,
                    },
                  alignment: AlignmentType.CENTER,
                  children: [

                  new TextRun( {
                  text: "ОТЧЕТ О НАУЧНО-ИССЛЕДОВАТЕЛЬСКОЙ РАБОТЕ",
                  bold: true,
                  size: 24,
                  }),

                  new TextRun( {
                  text: "студента ",
                  break: 2,
                  }),

                  new TextRun( {
                  text: "\t" + this.student.fname + "\t\t\t\t",
                  underline: {}
                  }),

                  new TextRun( {
                  text: "\t (Фамилия, имя, отчество)",
                  size: 24,
                  break: 1,
                  }),

                  new TextRun( {
                  text: "за",
                  break: 3,
                  }),

                  new TextRun( {
                  text: "\t" + this.report.halfyear + "\t",
                  underline: {}
                  }),

                  new TextRun( {
                  text: "полугодие",
                  }),

                  new TextRun( {
                  text: "\t" + this.year + "\t",
                  underline: {}
                  }),

                  new TextRun( {
                  text: "год обучения",
                  }),
                  ]})

                  const paragraph2 = new Paragraph({
                  spacing: {
                        //line: 360,
                    },
                  alignment: AlignmentType.JUSTIFIED,
                  children: 
                  [
                  ]
                  });


                  //let workbefore = this.splitLines(this.report.workbefore)
                 // console.log(this.report.workbefore)

                  //работы до
                  const workbeforeh = new TextRun({
                    text: '1 Работы, выполненные до диссертации:',
                    break: 1
                  });

                  const workbefore = new TextRun({
                    text: this.report.publicW,
                    break: 1,
                    underline: {}
                  });
                  const workbeforef = new TextRun({
                    text: '\t\t\t\t\t\t      Процент выполнения по пункту 1 _________',
                    break: 1
                  });


                  paragraph2.addChildElement(workbeforeh)
                  paragraph2.addChildElement(workbefore)
                  paragraph2.addChildElement(workbeforef)

                  //работы до

                  //работы publ
                  const publicWh = new TextRun({
                    text: '2 Опубликована работа/подготовлена рукопись статьи:',
                    break: 2
                  });

                  const publicWhh = new TextRun({
                    text: '(Авторы. Название. // Сборник. – Город: Издательство, Год. – Страницы)',
                    break: 1
                  });

                  const publicW = new TextRun({
                    text: this.report.workbefore,
                    break: 1,
                    underline: {}
                  });
                  const publicWf = new TextRun({
                    text: '\t\t\t\t\t\t      Процент выполнения по пункту 2 _________',
                    break: 1
                  });


                  paragraph2.addChildElement(publicWh)
                  paragraph2.addChildElement(publicWhh)
                  paragraph2.addChildElement(publicW)
                  paragraph2.addChildElement(publicWf)

                  //работы publ

                  //конференции
                  const confh = new TextRun({
                    text: '3 Участие в конкурсах, конференциях (указать названия, уровень, результат):',
                    break: 2
                  });

                  const conf = new TextRun({
                    text: this.report.conf,
                    break: 1,
                    underline: {}
                  });
                  const conff = new TextRun({
                    text: '\t\t\t\t\t\t      Процент выполнения по пункту 3 _________',
                    break: 1
                  });

                  paragraph2.addChildElement(confh)
                  paragraph2.addChildElement(conf)
                  paragraph2.addChildElement(conff)

                  //конференции

                  //другие
                  const otherh = new TextRun({
                    text: '4 Другие виды работ по НИР',
                    break: 2
                  });

                  const other = new TextRun({
                    text: this.report.other,
                    break: 1,
                    underline: {}
                  });
                  const otherf = new TextRun({
                    text: '\t\t\t\t\t\t      Процент выполнения по пункту 4 _________',
                    break: 1
                  });

                  paragraph2.addChildElement(otherh)
                  paragraph2.addChildElement(other)
                  paragraph2.addChildElement(otherf)

                  //другие

                  //Отзыв
                  const reviewh = new TextRun({
                    text: '5 Отзыв руководителя ',
                    break: 2
                  });

                  const review = new TextRun({
                    text: this.report.review,
                    break: 1,
                    underline: {}
                  });
                  const reviewf = new TextRun({
                    text: 'Научный руководитель _____________________________ «____» _______ ' + this.year + ' г.',
                    break: 3
                  });

                  const reviewff= new TextRun({
                    text: '\t\t\t\t\t      (подпись)',
                    break: 1,
                    size: 24
                  });

                  paragraph2.addChildElement(reviewh)
                  paragraph2.addChildElement(review)
                  paragraph2.addChildElement(reviewf)
                  paragraph2.addChildElement(reviewff)

                  //Отзыв


                  doc.addSection({
                  margins: {
                  top: 850,
                  right: 565,
                  bottom: 850,
                  left: 1700,
                  },
                  children: [
                  paragraph1,
                  paragraph2
                  ],
                  
                  });

                  Packer.toBlob(doc).then(blob => {
                //console.log(this.fname)
                saveAs(blob,'report_' + this.student.login + '.docx' );
                  });

            //console.log('create doc')
      }


    }

    
}
</script>

<style lang="scss">

</style>
