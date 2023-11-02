const express = require('express');
const db = require("../config/database");
const router = express.Router();

router.get("/cGm52nD23M", (req, res, next) => {
  var sql = "SELECT * FROM permasalahan"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":rows})
  });
});

router.get("/kmPI1o6U70/:id", (req, res, next) => {
  var sql = "SELECT * FROM permasalahan where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":row})
  });
});

router.get("/NsNvYy925A/:id", (req, res, next) => {
  var sql = "SELECT * FROM permasalahan WHERE sasaran_mutu_id = ?;"
  var params = [req.params.id]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":rows})
  });
});

router.post("/qnU4Pr433s", (req, res, next) => {
  var errors=[];

  if (!req.body.name){
    errors.push("No name specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  var data = {name: req.body.name, tanggal_rencana_perbaikan: req.body.tanggal_rencana_perbaikan, waktu_rencana_perbaikan: req.body.waktu_rencana_perbaikan, target: req.body.target, realisasi: req.body.realisasi, gap: req.body.gap, evaluasi: req.body.evaluasi, proses: req.body.proses, ruangan: req.body.ruangan, pelapor: req.body.pelapor, pic: req.body.pic, serial_number: req.body.serial_number, tipe: req.body.tipe, is_active: req.body.is_active, sasaran_mutu_id: req.body.sasaran_mutu_id};
  // var sql = 'INSERT INTO permasalahan (name, tanggal_rencana_perbaikan, waktu_rencana_perbaikan, target, realisasi, gap, evaluasi, is_active, sasaran_mutu_id) VALUES (?,?,?,?,?,?,?,?,?)'
  var sql = 'INSERT INTO permasalahan (name, tanggal_rencana_perbaikan, waktu_rencana_perbaikan, target, realisasi, gap, evaluasi, proses, ruangan, pelapor, pic, serial_number, tipe, is_active, sasaran_mutu_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  var params = [data.name, data.tanggal_rencana_perbaikan, data.waktu_rencana_perbaikan, data.target, data.realisasi, data.gap, data.evaluasi, data.proses, data.ruangan, data.pelapor, data.pic, data.serial_number, data.tipe, data.is_active, data.sasaran_mutu_id];

  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({"message": "success", "data": data, "id" : this.lastID})
  });
})

router.put("/qzh0c74D2f/:id", (req, res, next) => {
  var data = {name: req.body.name, tanggal_rencana_perbaikan: req.body.tanggal_rencana_perbaikan, waktu_rencana_perbaikan: req.body.waktu_rencana_perbaikan, target: req.body.target, realisasi: req.body.realisasi, gap: req.body.gap, evaluasi: req.body.evaluasi, proses: req.body.proses, ruangan: req.body.ruangan, pelapor: req.body.pelapor, pic: req.body.pic, serial_number: req.body.serial_number, tipe: req.body.tipe};
  db.run(`UPDATE permasalahan set name = COALESCE(?,name), tanggal_rencana_perbaikan = COALESCE(?,tanggal_rencana_perbaikan), waktu_rencana_perbaikan = COALESCE(?,waktu_rencana_perbaikan), target = COALESCE(?,target), realisasi = COALESCE(?,realisasi), gap = COALESCE(?,gap), evaluasi = COALESCE(?,evaluasi), proses = COALESCE(?,proses), ruangan = COALESCE(?,ruangan), pelapor = COALESCE(?,pelapor), pic = COALESCE(?,pic), serial_number = COALESCE(?,serial_number), tipe = COALESCE(?,tipe) WHERE id = ?`, [data.name, data.tanggal_rencana_perbaikan, data.waktu_rencana_perbaikan, data.target, data.realisasi, data.gap, data.evaluasi, data.proses, data.ruangan, data.pelapor, data.pic, data.serial_number, data.tipe, req.params.id], function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({message: "success", data: data, changes: this.changes})
  });
});

router.delete("/r3Q70Hw4U6/:id", (req, res, next) => {
  db.run('DELETE FROM permasalahan WHERE id = ?', req.params.id, function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({"message":"deleted", changes: this.changes})
  });
});

module.exports = router;