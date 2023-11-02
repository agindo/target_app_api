const express = require('express');
const db = require("../config/database");
const router = express.Router();

router.get("/PcpR0w0db5", (req, res, next) => {
  var sql = "SELECT * FROM sasaran_mutu"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":rows})
  });
});

router.get("/354BsYGvuN/:id", (req, res, next) => {
  var sql = "SELECT * FROM sasaran_mutu where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({"message":"success", "data":row})
  });
});

router.post("/TIynZ216PM", (req, res, next) => {
  var errors=[];

  if (!req.body.name){
    errors.push("No name specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  var data = {name: req.body.name, is_active: req.body.is_active};
  var sql = 'INSERT INTO sasaran_mutu (name, is_active) VALUES (?,?)'
  var params = [data.name, data.is_active];

  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({"message": "success", "data": data, "id" : this.lastID})
  });
});

router.put("/7cEk44F4lq/:id", (req, res, next) => {
  var data = {id: req.params.id, name: req.body.name};
  db.run(`UPDATE sasaran_mutu set name = COALESCE(?,name) WHERE id = ?`, [data.name, data.id], function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({message: "success", data: data, changes: this.changes})
  });
})

router.delete("/vO5FZR3x7M/:id", (req, res, next) => {
  db.run('DELETE FROM sasaran_mutu WHERE id = ?', req.params.id, function (err, result) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({"message":"deleted", changes: this.changes})
  });
});

module.exports = router;