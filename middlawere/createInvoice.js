const PDFDocument = require("pdfkit");
function createInvoice(invoice, path) {
  return new Promise((resolve, reject) => {
    console.log("create");
    let doc = new PDFDocument({ size: "A4", margin: 50 });
    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);
    try {
      var bufferChunks = [];
      doc.on("readable", function () {
        // Store buffer chunk to array
        bufferChunks.push(doc.read());
      });
      doc.on("end", () => {
        var pdfBuffer = Buffer.concat(bufferChunks),
          pdfBase64String = pdfBuffer.toString("base64");
        resolve(pdfBase64String);
      });
      doc.end();
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Hk Coding Camp")
    .fontSize(10)
    .text("Hk Coding Camp.", 200, 50, { align: "right" })
    .text("7B, One Capital Place, 18 Luard Road", 200, 65, { align: "right" })
    .text("Wanchai, Hong Kong", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text(invoice.client.parentName, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.client.studentName, 300, customerInformationTop + 15); //invoice.student.studentName
  generateHr(doc, 252);
}
function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Course",
    "Number of Classes",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.courses.length; i++) {
    const item = invoice.courses[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.courseTitle,
      item.numberofClasses,
      formatCurrency(item.amount),
      item.amount,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(doc, y, course, numberOfClasses, lineTotal) {
  doc
    .fontSize(10)
    .text(course, 50, y)
    .text(numberOfClasses, 280, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + cents.toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice,
};
