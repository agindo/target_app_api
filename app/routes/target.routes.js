const express = require('express');
const db = require("../config/database");
const router = express.Router();

router.get("/targets", (req, res, next) => {
  var sql = "SELECT * FROM target"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":rows})
  });
});

router.get("/target/:id", (req, res, next) => {
  var sql = "SELECT * FROM target where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":row})
  });
});

router.post("/target", (req, res, next) => {
  var errors=[];

  if (!req.body.nama){
    errors.push("No nama specified");
  }
  if (!req.body.keterangan){
    errors.push("No keterangan specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  var data = {nama: req.body.nama, jumlah_karyawan: req.body.jumlah_karyawan, target_hari_kerja: req.body.target_hari_kerja, total_target_hari_kerja: req.body.total_target_hari_kerja, pencapaian: req.body.pencapaian, keterangan: req.body.keterangan};
  var sql = 'INSERT INTO target (nama, jumlah_karyawan, target_hari_kerja, total_target_hari_kerja, pencapaian, keterangan) VALUES (?,?,?,?,?,?)'
  var params = [data.nama, data.jumlah_karyawan, data.target_hari_kerja, data.total_target_hari_kerja, data.pencapaian, data.keterangan];

  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({"message": "success", "data": data, "id" : this.lastID})
  });
})

router.put("/target/:id", (req, res, next) => {
  var data = {nama: req.body.nama, jumlah_karyawan: req.body.jumlah_karyawan, target_hari_kerja: req.body.target_hari_kerja, total_target_hari_kerja: req.body.total_target_hari_kerja, pencapaian: req.body.pencapaian, keterangan: req.body.keterangan};
  db.run(`UPDATE target set nama = COALESCE(?,nama), jumlah_karyawan = COALESCE(?,jumlah_karyawan), target_hari_kerja = COALESCE(?,target_hari_kerja), total_target_hari_kerja = COALESCE(?,total_target_hari_kerja), pencapaian = COALESCE(?,pencapaian), keterangan = COALESCE(?,keterangan) WHERE id = ?`, [data.nama, data.jumlah_karyawan, data.target_hari_kerja, data.total_target_hari_kerja, data.pencapaian, data.keterangan, req.params.id], function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({message: "success", data: data, changes: this.changes})
  });
})

router.delete("/target/:id", (req, res, next) => {
  db.run('DELETE FROM target WHERE id = ?', req.params.id, function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({"message":"deleted", changes: this.changes})
  });
})

module.exports = router;