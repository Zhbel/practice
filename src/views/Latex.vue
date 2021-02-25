<template>
  <html>
    <body>
      <div class="wrapper">
        <header>
        </header>
        <div class="content-wrapper">
         <div class="button button-primary ui-messageBox-ok" @click="click">docx</div>
         <div class="button button-primary ui-messageBox-ok" @click="test">test</div>
        </div>
      </div>


    </body>
  </html>
</template>



<script>
import { saveAs } from 'file-saver';
import { WidthType, BorderStyle, Document, Paragraph, Packer, TextRun, Header, Footer, AlignmentType, HeadingLevel } from "docx";

export default {
  data: () => ({
        user: '',
        EditButton: false,
        someVariable: '1',
        depart: 'ВТИК',
        newid: '',
        fname: 'Фамилия',
        jobname: 'производственной практике',
        pracplace: 'ФГБОУ ВПО УГНТУ каф. ВТИК',
        group: 'БПО-11-11',
        stud: 'А.А. Иванов',
        var: '1',
        head: 'К.Л. Петров',
        phead: 'М.А. Салихова',
        year: ''
    }),
    components: {
      Document, Paragraph, Packer, TextRun, saveAs, BorderStyle, WidthType, Header, Footer, AlignmentType, HeadingLevel
    },

  async mounted(){
      this.year = new Date().getFullYear()
     },

  methods:{
    async test(){
      var id = 'prac_oFfgUCjw'
      await this.$store.dispatch('deleteRefPr', id)
    },
    click(){

            const doc = new Document();
			
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
                  text: "Кафедра «Вычислительная техника и инженерная кибернетика»",
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
                  children: [
                    new TextRun( {
                    text: "Студент гр. " + this.group + "\t\t______________________________\t" + this.stud,
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
                    text: this.pracplace,
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
                    text: "Руководитель практики\t\t" + "_____________________________",
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
                    text: "\t\t\t\t\t_____________________________ " + this.head,
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
                    text: "от кафедры " + this.depart + "\t\t_____________________________ " + this.phead,
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
            
            /*doc.addSection({
	          children: [
              paragraph2,
            ],
            
            });*/
            
            Packer.toBlob(doc).then(blob => {
                console.log(this.fname)
                saveAs(blob, 'Отчет' + this.fname + '.docx' );
            });
        }
         
    
    
  }

}

</script>

<style lang="scss">
</style>
