const express = require('express');
const db = require("../config/database");
const router = express.Router();

router.get("/v7X3fL327o", (req, res, next) => {
  var sql = "SELECT * FROM it_device"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":rows})
  });
});

router.get("/HW5w04yjW5/:id", (req, res, next) => {
  var sql = "SELECT * FROM it_device where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":row})
  });
});

router.post("/J3czJh4z76", (req, res, next) => {
  var errors=[];

  if (!req.body.asset_number){
    errors.push("No Asset Number specified");
  }

  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  var data = {sn: req.body.sn, asset_number: req.body.asset_number, tdp: req.body.tdp, kode: req.body.kode, email: req.body.email, username: req.body.username, model: req.body.model, pc_name: req.body.pc_name, remark: req.body.remark, is_active: req.body.is_active};
  // var sql = 'INSERT INTO monitor (sasaran_mutu, target, realisasi, gap, permasalahan, tanggal_rencana_perbaikan, waktu_rencana_perbaikan, evaluasi) VALUES (?,?,?,?,?,?,?,?)'
  var sql = 'INSERT INTO it_device (sn, asset_number, tdp, kode, email, username, model, pc_name, remark, is_active) VALUES (?,?,?,?,?,?,?,?,?,?)'
  var params = [data.sn, data.asset_number, data.tdp, data.kode, data.email, data.username, data.model, data.pc_name, data.remark, data.is_active];

  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({"message": "success", "data": data, "id" : this.lastID})
  });
});

router.put("/653b2Jho88/:id", (req, res, next) => {
  var data = {sn: req.body.sn, asset_number: req.body.asset_number, tdp: req.body.tdp, kode: req.body.kode, email: req.body.email, username: req.body.username, model: req.body.model, pc_name: req.body.pc_name, remark: req.body.remark};
  db.run(`UPDATE it_device set sn = COALESCE(?,sn), asset_number = COALESCE(?,asset_number), tdp = COALESCE(?,tdp), kode = COALESCE(?,kode), email = COALESCE(?,email), username = COALESCE(?,username), model = COALESCE(?,model), pc_name = COALESCE(?,pc_name), remark = COALESCE(?,remark) WHERE id = ?`, [data.sn, data.asset_number, data.tdp, data.kode, data.email, data.username, data.model, data.pc_name, data.remark, req.params.id], function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({message: "success", data: data, changes: this.changes})
  });
})

router.delete("/08qp3hDB1C/:id", (req, res, next) => {
  db.run('DELETE FROM it_device WHERE id = ?', req.params.id, function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({"message":"deleted", changes: this.changes})
  });
});

module.exports = router;