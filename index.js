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
    key: 1,
    value: 12,
  }, {
    key: 2,
    value: 15,
  }, {
    key: 3,
    value: 5,
  }]
})

const find = 'currentColor'
const re = new RegExp(find, 'g')

const svgString = testChart
  .svgString()
  .replace(re, 'black'); // or maybe more like gray?

console.log(svgString)

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