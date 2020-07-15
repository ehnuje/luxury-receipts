const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

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

app.get("/api/customers", (req, res) => {
    console.log("aaaa")
  connection.query("SELECT * FROM TEST.CUSTOMER", (err, rows, fields) => {
    console.log("abcde"+err)
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
