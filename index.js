const fs = require('fs')
const PdfPrinter = require('pdfmake/src/printer')
const generateChartSvgString = require('./generateSvgChart')
const fonts = {
  Roboto: {
    normal: './Roboto-Regular.ttf'
  },
}
const printer = new PdfPrinter(fonts)

const width = 400
const height = 300
const demoData = [{
    key: 1,
    barValue: 12,
    lineValue: 10,
  }, {
    key: 2,
    barValue: 20,
    lineValue: 20,
  }, {
    key: 3,
    barValue: 5,
    lineValue: 15,
  }]


const testChartSvg = generateChartSvgString({
  width,
  height,
  data: demoData,
  lineColor: '#00b894',
  barColor: '#74b9ff',
})

// GENERATE PDF
const docDefinition = {
	content: [
		'THIS IS A TEST PDF!!!11!',
		{
			svg: testChartSvg, // add svg to pdf
		},
	],
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)
pdfDoc.pipe(fs.createWriteStream('demo.pdf'))
pdfDoc.end()