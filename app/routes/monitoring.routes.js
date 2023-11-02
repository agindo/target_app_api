const express = require('express');
const db = require("../config/database");
const router = express.Router();

router.get("/monitors", (req, res, next) => {
  var sql = "SELECT * FROM monitor"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":rows})
  });
});

router.get("/monitor/:id", (req, res, next) => {
  var sql = "SELECT * FROM monitor where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":row})
  });
});

router.post("/monitor", (req, res, next) => {
  var errors=[];

  if (!req.body.sasaran_mutu){
    errors.push("No sasaran mutu specified");
  }

  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  var data = {sasaran_mutu: req.body.sasaran_mutu, target: req.body.target, realisasi: req.body.realisasi, gap: req.body.gap, permasalahan: req.body.permasalahan, tanggal_rencana_perbaikan: req.body.tanggal_rencana_perbaikan, waktu_rencana_perbaikan: req.body.waktu_rencana_perbaikan, evaluasi: req.body.evaluasi};
  var sql = 'INSERT INTO monitor (sasaran_mutu, target, realisasi, gap, permasalahan, tanggal_rencana_perbaikan, waktu_rencana_perbaikan, evaluasi) VALUES (?,?,?,?,?,?,?,?)'
  var params = [data.sasaran_mutu, data.target, data.realisasi, data.gap, data.permasalahan, data.tanggal_rencana_perbaikan, data.waktu_rencana_perbaikan, data.evaluasi];

  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({"message": "success", "data": data, "id" : this.lastID})
  });
})

router.put("/monitor/:id", (req, res, next) => {
  var data = {sasaran_mutu: req.body.sasaran_mutu, target: req.body.target, realisasi: req.body.realisasi, gap: req.body.gap, permasalahan: req.body.permasalahan, tanggal_rencana_perbaikan: req.body.tanggal_rencana_perbaikan, waktu_rencana_perbaikan: req.body.waktu_rencana_perbaikan, evaluasi: req.body.evaluasi};
  db.run(`UPDATE monitor set sasaran_mutu = COALESCE(?,sasaran_mutu), target = COALESCE(?,target), realisasi = COALESCE(?,realisasi), gap = COALESCE(?,gap), permasalahan = COALESCE(?,permasalahan), tanggal_rencana_perbaikan = COALESCE(?,tanggal_rencana_perbaikan), waktu_rencana_perbaikan = COALESCE(?,waktu_rencana_perbaikan), evaluasi = COALESCE(?,evaluasi) WHERE id = ?`, [data.sasaran_mutu, data.target, data.realisasi, data.gap, data.permasalahan, data.tanggal_rencana_perbaikan, data.waktu_rencana_perbaikan, data.evaluasi, req.params.id], function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({message: "success", data: data, changes: this.changes})
  });
})

router.delete("/monitor/:id", (req, res, next) => {
  db.run('DELETE FROM monitor WHERE id = ?', req.params.id, function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({"message":"deleted", changes: this.changes})
  });
})

module.exports = router;