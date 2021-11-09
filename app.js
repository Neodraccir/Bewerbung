var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = 3632;
var subdomain = "BewerbungZacherMedia";
var pass = require(`${__dirname}/${subdomain}/pass/pass.json`).pass;

const behindPass = require(`${__dirname}/${subdomain}/behindPass/loadBehindPass.json`);
app.use(bodyParser());

app.use(favicon(path.join(__dirname, subdomain, "favicon.ico")));
app.use("/main", express.static(`${__dirname}/${subdomain}/main.js`));
app.use("/static", express.static(`${__dirname}/${subdomain}/static`));
app.use("/modules", express.static(`${__dirname}/${subdomain}/modules/`));
app.use("/style.css", express.static(`${__dirname}/${subdomain}/style.css`));
app.use("/bTxt", express.static(`${__dirname}/${subdomain}/behindPass/buildText.js`));


app.get("/passLength", (req, res) => {
  console.log(pass.length); //send pass length to client
  res.send({ l: pass.length });
});
app.get("/", (req, res) => res.sendFile(`${__dirname}/${subdomain}/index.html`));
app.get("/t", (req, res) => res.sendFile(`${__dirname}/${subdomain}/testsite.html`));

app.post("/sendPass", (req, res) => {
  if (req.body.pass == pass) res.json(behindPass);
  if (req.body.pass != pass) res.json({ successfullLoad: false });
});



app.listen(port, () => {
  console.log(`Example app listening at http://192.168.2.128:${port}`);
});
