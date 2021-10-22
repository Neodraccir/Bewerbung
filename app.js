var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = 3632;
var pass = require(`${__dirname}/pass/pass.json`).pass;

const behindPass = require(`${__dirname}/behindPass/loadBehindPass.json`);
app.use(bodyParser());

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use("/main", express.static(`${__dirname}/main.js`));
app.use("/static", express.static(`${__dirname}/static`));
app.use("/modules", express.static(`${__dirname}/modules/`));
app.use("/style.css", express.static(`${__dirname}/style.css`));
app.use("/bTxt", express.static(`${__dirname}/behindPass/buildText.js`));


app.get("/passLength", (req, res) => {
  console.log(pass.length); //send pass length to client
  res.send({ l: pass.length });
});
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));
app.get("/t", (req, res) => res.sendFile(`${__dirname}/testsite.html`));

app.post("/sendPass", (req, res) => {
  if (req.body.pass == pass) res.json(behindPass);
  if (req.body.pass != pass) res.json({ successfullLoad: false });
});



app.listen(port, () => {
  console.log(`Example app listening at http://192.168.2.128:${port}`);
});
