const express = require("express");
const cors = require("cors");
// const db = require("./app/config/database");
// const md5 = require("md5");

const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const programmingLanguagesRouter = require("./app/routes/programmingLanguages");
// const user = require("./app/routes/user.routes");
// const target = require("./app/routes/target.routes");
// const monitor = require("./app/routes/monitoring.routes");
const sasaran_mutu = require("./app/routes/sasaranmutu.routes");
const permasalahan = require("./app/routes/permasalahan.routes");
const itdevice = require("./app/routes/itdevice.routes");
const job = require("./app/routes/job.routes");

// app.use("/programming-languages", programmingLanguagesRouter);
// app.use("/api", [user, target, monitor]);
app.use("/api", [sasaran_mutu, permasalahan, itdevice, job]);
// app.use("/api", [permasalahan]);
// app.use("/api", [itdevice]);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   console.error(err.message, err.stack);
//   res.status(statusCode).json({ message: err.message });
//   return;
// });

// const db = require("./app/models");

// db.sequelize.sync()
// .then(() => {
//   console.log("Synced db.");
// })
// .catch((err) => {
//   console.log("Failed to sync db: " + err.message);
// });

app.get('/api/protected', (req, res) => {
  // res.send({message: 'Hello World'});
  const { createInvoice } = require("./app/files/createInvoice.js");

  const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111
    },
    items: [
      {
        item: "TC 100",
        description: "Toner Cartridge",
        quantity: 2,
        amount: 6000
      },
      {
        item: "USB_EXT",
        description: "USB Cable Extender",
        quantity: 1,
        amount: 2000
      }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234
  };

  createInvoice(invoice, "invoice.pdf");
});

app.get('/api/pdf/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // const { id } = req.body;
    // console.log(id);
    
    // const doc = new PDFDocument({size: 'A4', layout: 'landscape'});
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    doc.pipe(fs.createWriteStream('./app/files/'+id+'.pdf')); // write to PDF
    doc.pipe(res); // HTTP response

    // doc.fontSize(25).text('Some text with an embedded font!', 100, 100);
    let arr = ["foo","moo","bar","xyz","abc","foo","moo","bar","xyz","abc","foo","moo","bar","xyz","abc","foo","moo","bar","xyz","abc","foo","moo","bar","xyz","abc","foo","moo","bar","xyz","abc"];
    const invoiceTableTop = 10;
    // let margin = 150;
    // let serialNo = 1;


    // for(var i=0; i<arr.length; i++){
    for(var i=10; i<20; i++){
      const position = invoiceTableTop + (i + 1) * 31;
      doc.fontSize(10).text(arr[i], 50, position);
      generateHr(doc, position + 20);
    }

    // if (arr.length >= 20) {
    //   doc.addPage()
    // }

    doc.end();
  } catch (error) {
    error.status = 400;
    // next(error);
  }
})

app.get('/api/download/:id', function(req, res){
  const { id } = req.params;
  // const file = `./uploads/${id}.pdf`;
  const file = './app/files/'+id+'.pdf';
  res.download(file); // Set disposition and send it.
  // fs.unlinkSync(file);
})

app.get('/api/remove/:id', function(req, res){
  const { id } = req.params;
  const file = './app/files/'+id+'.pdf';
  // res.download(file); // Set disposition and send it.
  // var filePath = 'c:/book/discovery.docx'; 
  fs.unlinkSync(file);
})

app.get('/api/rekapan/:id', async(req, res) => {
  try {
    const { id } = req.params;

    const doc = new PDFDocument({size: 'A4', layout: 'landscape'});

    doc.pipe(fs.createWriteStream('./app/files/'+id+'.pdf')); // write to PDF
    doc.pipe(res); // HTTP response

    doc
    .fontSize(10)
    .text("MONITORING PENCAPAIAN SASARAN MUTU ", 40, 50, {align: "center"})
    .fontSize(8)
    .text("Bagian ", 50, 70, {align: "left"})
    .fontSize(8)
    .text("Bulan", 50, 85, {align: "left"})

    const invoiceTableTop = 100;

    // for(var l = 0; l < 3; l++){
      // const position = invoiceTableTop + (l + 1) * 31;
      const position = invoiceTableTop + 30;
      doc
      .fontSize(7)
      .text("Sasaran Mutu", 50, position)
      .fontSize(9)
      .text("Jaringan running", 50, position+9)
      .fontSize(7)
      .text("TARGET", 0, position+24, {align: "right"})
      .fontSize(9)
      .text("0,0%", 0, position+33, {align: "right"})
      .fontSize(7)
      .text("REALISASI", 0, 100, {align: "right"})
      .fontSize(9)
      .text("0,0%", 0, 110, {align: "right"})
      .fontSize(7)
      .text("Permasalahan", 50, position+24)
      .fontSize(9)
      .text("Jaringan FO terputus di koordinat 115 Meter", 50, position+33)
      .fontSize(7)
      .text("Rencana Perbaikan", 0, position+47, {align: "right"})
      .fontSize(9)
      .text("Menambahkan provider", 0, position+55, {align: "right"})
      .fontSize(7)
      .text("Evaluasi", 50, position+47)
      .fontSize(9)
      .text("Menambahkan provider", 50, position+55)
      generateHr(doc, position + 70);
    // }

    doc.end();
  } catch (error) {
    error.status = 400;
  }
})

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(0.5)
    .moveTo(50, y)
    .lineTo(790, y)
    .stroke();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});