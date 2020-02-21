// https://www.npmjs.com/package/pdfmake
const fs = require('fs')
const PdfPrinter = require('pdfmake/src/printer')
const barChart = require('./generateSvgChart')
const fonts = {
  Roboto: {
    normal: './Roboto-Regular.ttf'
  },
}
const printer = new PdfPrinter(fonts)

const width = 300
const height = 200

const testChart = barChart({
  width,
  height,
  data: [{
    key: 'test',
    value: 12,
  }, {
    key: 'sd',
    value: 15,
  }]
})

var find = 'currentColor';
var re = new RegExp(find, 'g');

const svgString = testChart.svgString().replace(re, 'black');

// GENERATE PDF
const docDefinition = {
	content: [
		'THIS IS A TEST PDF!!!11!',
		{
			svg: svgString,
		},
	],
};

const pdfDoc = printer.createPdfKitDocument(docDefinition)
pdfDoc.pipe(fs.createWriteStream('demo.pdf'))
pdfDoc.end();