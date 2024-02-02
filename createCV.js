// createCV.js

const fs = require('fs');
const PDFDocument = require('pdfkit');
const AcademicQual = require('./models/academicQual');


function createCV(Academics, path) {
	let doc = new PDFDocument({ margin: 50 });

	generateHeader(doc); // Invoke `generateHeader` function.
	generateAcademic(doc, Academics);
    generateFooter(doc); // Invoke `generateFooter` function.

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
	doc
		.fillColor('#444444')
		.fontSize(20)
		.text('Curriculum Vitae', 110, 57)
		.fontSize(10)
		.text('123 Main Street', 200, 65, { align: 'right' })
		.text('New York, NY, 10025', 200, 80, { align: 'right' })
		.moveDown();
}

function generateAcademic(doc, Academics) {

	doc.text(`Invoice Number: ${AcademicQual.idAcademic}`, 50, 200)
       .text(`Invoice Number: ${AcademicQual.establishment}`, 50, 200)
	   .text(`Invoice Date: ${new Date()}`, 50, 215)
	   .text(`Balance Due: ${AcademicQual.courseTitle}`, 50, 130)

		.text(AcademicQual.academicStart, 300, 200)
		.text(AcademicQual.academicEnd, 300, 215)
		.moveDown();
}

function generateFooter(doc) {
	doc
    .fontSize(10)
    .text(
		'Thank you for your time.', 50, 780, { align: 'center', width: 500 },
	);
}

module.exports = {createCV};