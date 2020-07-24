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

app.get("/api/products", (req, res) => {
  connection.query(
    "SELECT * FROM TEST.PRODUCT WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use("/image", express.static("./upload")); // 맵핑이 됨.

app.post("/api/products", upload.single("image"), (req, res) => {
  console.log("post /api/products");
  // 컨트랙트를 디플로이 하자

  let sql =
    "INSERT INTO TEST.PRODUCT (name, image, contractAddr, registeredDate, isDeleted) VALUES (?, ?, ``, now(), 0)";
  console.log(req.file);
  let image = "/image/" + req.file.filename;
  let name = req.body.name;

  let params = [name, image];

  console.log("insert params: " + params);

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/api/products/:id", (req, res) => {
  console.log("received delete request");
  let sql = "UPDATE TEST.PRODUCT SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  console.log(params);
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

const accessKeyId = "201373a4713f5d6f6dd0409035dbf89e7a89ddb1";
const secretAccessKey = "253c8ecb52c79a8fd895beada9e471df7be8d429";

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(accessKeyId + ":" + secretAccessKey).toString("base64"),
    },
    { name: "origin", value: "localhost" },
    { name: "x-krn", value: "krn:1001:node" },
  ],
};

const Caver = require("caver-js");
const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.beta.klaytn.io/v1/klaytn",
    option
  )
);

app.get("/api/klay/blocknumber", async (req, res) => {
  bb = await getBlockNumber();
  console.log("bb: " + bb);
  res.send({ blockNumber: bb });
});

app.get("/api/klay/balance/:addr", async (req, res) => {
  console.log(req.params.addr);
  b = await getBalance(req.params.addr);
  console.log("balance: " + b);
  res.send({ balance: b });
});

async function getBlockNumber() {
  hexBlockNumber = await caver.rpc.klay.getBlockNumber();
  decBlockNumber = await parseInt(hexBlockNumber, 16);
  return decBlockNumber;
}

async function getBalance(addr) {
  hexBalance = await caver.rpc.klay.getBalance(addr);
  decBalance = await parseInt(hexBalance, 16);
  return decBalance;
}

async function getAddress(sellerID) {}

let kasWalletHeader = {
  Authorization:
    "Basic " +
    Buffer.from(accessKeyId + ":" + secretAccessKey).toString("base64"),
  "x-krn": "krn:1001:wallet:114:account:default",
};

let request = require("request");

async function createAccount() {
  var options = {
    url: "https://wallet-api.beta.klaytn.io/v2/account",
    headers: kasWalletHeader,
    method: "POST",
    auth: {
      user: accessKeyId,
      pass: secretAccessKey,
    },
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log(
        "error: " + error + ", statusCode: " + response.StatusCode,
        ", response: " + response
      );
    }
  }

  request(options, callback);
}

async function getAccount() {
  var options = {
    url: "https://wallet-api.beta.klaytn.io/v2/account",
    headers: kasWalletHeader,
    method: "GET",
    body: JSON.stringify({
      address: "0xA11D5096BB4a1467Fe16D2a90222e6144eB35476",
    }),
    auth: {
      user: accessKeyId,
      pass: secretAccessKey,
    },
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log("error: " + error + ", response: " + response);
    }
  }

  request(options, callback);
}

getAccount();

app.listen(port, () => console.log(`Listening on port ${port}`));
