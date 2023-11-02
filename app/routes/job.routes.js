const express = require('express');
const db = require("../config/database");
const router = express.Router();

router.get("/jobs", (req, res, next) => {
  var sql = "SELECT * FROM job"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":rows})
  });
})

router.get("/job/:id", (req, res, next) => {
  var sql = "SELECT * FROM job where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":row})
  });
})

router.post("/job", (req, res, next) => {
  var errors=[];

  if (!req.body.deskripsi){
    errors.push("No deskripsi specified");
  }

  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  var data = {tanggal: req.body.tanggal, deskripsi: req.body.deskripsi, start: req.body.start, finish: req.body.finish};
  var sql = 'INSERT INTO job (tanggal, deskripsi, start, finish) VALUES (?,?,?,?)'
  var params = [data.tanggal, data.deskripsi, data.start, data.finish];

  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({"message": "success", "data": data, "id" : this.lastID})
  });
})

router.put("/job/:id", (req, res, next) => {
  var data = {tanggal: req.body.tanggal, deskripsi: req.body.deskripsi, start: req.body.start, finish: req.body.finish};
  db.run(`UPDATE job set tanggal = COALESCE(?,tanggal), deskripsi = COALESCE(?,deskripsi), start = COALESCE(?,start), finish = COALESCE(?,finish) WHERE id = ?`, [data.tanggal, data.deskripsi, data.start, data.finish, req.params.id], function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({message: "success", data: data, changes: this.changes})
  });
})

router.delete("/job/:id", (req, res, next) => {
  db.run('DELETE FROM job WHERE id = ?', req.params.id, function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({"message":"deleted", changes: this.changes})
  });
})

module.exports = router;