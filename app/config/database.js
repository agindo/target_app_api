var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }else{
    console.log('Connected to the SQLite database.')
    // db.run(`CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT,name text, email text UNIQUE, password text, CONSTRAINT email_unique UNIQUE (email))`, (err) => {
    //   if (err) {
    //     // Table already created
    //   }else{
    //     // Table just created, creating some rows
    //     var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    //     db.run(insert, ["admin","admin@example.com",md5("admin123456")])
    //     // db.run(insert, ["user","user@example.com",md5("user123456")])
    //   }
    // });
    
    // db.run(`CREATE TABLE karyawan (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, email text UNIQUE, password text, CONSTRAINT email_unique UNIQUE (email))`, (err) => {
    //   if (err) {
    //     // Table already created
    //   }else{
    //     // Table just created, creating some rows
    //     var insert = 'INSERT INTO karyawan (name, email, password) VALUES (?,?,?)'
    //     db.run(insert, ["admin","admin@example.com",md5("admin123456")])
    //     db.run(insert, ["user","user@example.com",md5("user123456")])
    //   }
    // });

    // db.run(`CREATE TABLE target (id INTEGER PRIMARY KEY AUTOINCREMENT, nama text, jumlah_karyawan numeric, target_hari_kerja numeric, total_target_hari_kerja numeric, pencapaian numeric, keterangan text, created_at DATETIME DEFAULT (datetime('now', 'localtime')))`, (err) => {
    //   if (err) {
    //     // Table already created
    //   }else{
    //     var insert = 'INSERT INTO target (nama, jumlah_karyawan, target_hari_kerja, total_target_hari_kerja, pencapaian, keterangan) VALUES (?,?,?,?,?,?)'
    //     db.run(insert, ["nama_1", 23, 21, 483, 376, "Keterangan 1"])
    //     db.run(insert, ["nama_2", 43, 23, 989, 1030, "Keterangan 2"])
    //   }
    // });

    // db.run(`CREATE TABLE monitor (id INTEGER PRIMARY KEY AUTOINCREMENT, sasaran_mutu text, target numeric, realisasi numeric, gap numeric, permasalahan text, tanggal_rencana_perbaikan DATE, waktu_rencana_perbaikan numeric, evaluasi text, created_at DATETIME DEFAULT (datetime('now', 'localtime')))`, (err) => {
    //   if (err) {
    //     // Table already created
    //   }else{
    //     var insert = 'INSERT INTO monitor (sasaran_mutu, target, realisasi, gap, permasalahan, tanggal_rencana_perbaikan, waktu_rencana_perbaikan, evaluasi) VALUES (?,?,?,?,?,?,?,?)'
    //     db.run(insert, ["sasaran_mutu 1", 1, 1, 1, "permasalahan 1", new Date(), 1, "evaluasi 1"])
    //     db.run(insert, ["sasaran_mutu 2", 2, 2, 2, "permasalahan 2", new Date(), 2, "evaluasi 2"])
    //   }
    // });

    db.run(`CREATE TABLE karyawan (id INTEGER PRIMARY KEY AUTOINCREMENT, nomor text UNIQUE, name text, password text, created_at DATETIME DEFAULT (datetime('now', 'localtime')), is_active numeric)`, (err) => {
      if (err) {
        // Table already created
      }else{
        var insert = 'INSERT INTO karyawan (nomor, name, password, is_active) VALUES (?,?,?,?)'
        db.run(insert, ["0254241@mchcgr.com", "MICHAEL EKA PUTRA", md5("12345"), 1])
      }
    });

    db.run(`CREATE TABLE ruangan (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, created_at DATETIME DEFAULT (datetime('now', 'localtime')), is_active numeric)`, (err) => {
      if (err) {
        // Table already created
      }else{
        var insert = 'INSERT INTO ruangan (name, is_active) VALUES (?,?)'
        db.run(insert, ["ruangan 1", 1])
        db.run(insert, ["ruangan 2", 1])
      }
    });

    db.run(`CREATE TABLE sasaran_mutu (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, created_at DATETIME DEFAULT (datetime('now', 'localtime')), is_active numeric)`, (err) => {
      if (err) {
        // Table already created
      }else{
        var insert = 'INSERT INTO sasaran_mutu (name, is_active) VALUES (?,?)'
        db.run(insert, ["sasaran_mutu 1", 1])
        db.run(insert, ["sasaran_mutu 2", 1])
      }
    });

    db.run(`CREATE TABLE permasalahan (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, tanggal_rencana_perbaikan DATE, waktu_rencana_perbaikan numeric, target numeric, realisasi numeric, gap numeric, evaluasi text, proses text, ruangan text, pelapor text, pic text, serial_number text, tipe text, created_at DATETIME DEFAULT (datetime('now', 'localtime')),  is_active numeric, sasaran_mutu_id numeric)`, (err) => {
      if (err) {
        // Table already created
      }else{
        var insert = 'INSERT INTO permasalahan (name, tanggal_rencana_perbaikan, waktu_rencana_perbaikan, target, realisasi, gap, evaluasi, proses, ruangan, pelapor, pic, serial_number, tipe, is_active, sasaran_mutu_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        db.run(insert, ["permasalahan 1", new Date(), 1, 1, 1, 1, "evaluasi 1", "proses 1", "ruangan 1", "pelapor 1", "pic 1", "serial_number 1", "tipe 1", 1, 1])
        db.run(insert, ["permasalahan 2", new Date(), 2, 2, 2, 2, "evaluasi 2", "proses 2", "ruangan 2", "pelapor 2", "pic 2", "serial_number 2", "tipe 1", 1, 1])
      }
    });

    db.run(`CREATE TABLE it_device (id INTEGER PRIMARY KEY AUTOINCREMENT, sn text, asset_number text, tdp text, kode text, email text, username text, model text, pc_name text, remark text, created_at DATETIME DEFAULT (datetime('now', 'localtime')), is_active numeric)`, (err) => {
      if (err) {
        // Table already created
      }else{
        var insert = 'INSERT INTO it_device (sn, asset_number, tdp, kode, email, username, model, pc_name, remark, is_active) VALUES (?,?,?,?,?,?,?,?,?,?)'
        db.run(insert, ["PC-0YZ330", "2022/IT/00001", "TDP 111", "0254241@mchcgr.com", "michael.putra.ma@mcgc.com", "MICHAEL EKA PUTRA", "LAPTOP", "LENOVO X280", "NOVIANI", 1])
      }
    });
  }
});


module.exports = db;