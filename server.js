const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// })

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  databsase: conf.database,
});

connection.connect();

const multer = require("multer");
const upload = multer({ dest: "./upload" });

app.get("/api/customers", (req, res) => {
  console.log("aaaa");
  connection.query("SELECT * FROM TEST.CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
});

app.use("/image", express.static("./upload")); // 맵핑이 됨.

app.post("/api/customers", upload.single("image"), (req, res) => {
  console.log("post /api/customers");
  let sql = "INSERT INTO TEST.CUSTOMER VALUES (null, ?, ?, ?, ?, ?)";
  let image = "/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  console.log("?!?!?!?!?!?");
  console.log(name);
  console.log(image);
  console.log(birthday);
  console.log(gender);

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log("aaaa" + err);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
