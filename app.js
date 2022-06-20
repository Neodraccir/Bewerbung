#!/usr/bin/env node

var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");
var bodyParser = require("body-parser");
var stringSimilarity = require("string-similarity");

var app = express();
var port = 3632;
var companies = require(`${__dirname}/companies/companies.json`);

const behindPass = require(`${__dirname}/behindPass/loadBehindPass.json`);
var getCompanyNameFromPath = (path) => /(?:\/((sendPassFor)|(passLengthFor)))(?<id>.*)/gi.exec(path)?.groups?.id

app.use(bodyParser());

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use("/main", express.static(`${__dirname}/main.js`));
app.use("/static", express.static(`${__dirname}/static`));
app.use("/cimg", express.static(`${__dirname}/companies/companyLogos`));
app.use("/modules", express.static(`${__dirname}/modules/`));
app.use("/style.css", express.static(`${__dirname}/style.css`));
app.use("/bTxt", express.static(`${__dirname}/behindPass/buildText.js`));

//build different company passes and textes
function identifyCompany(nameString){
  let identifier = decodeURI(nameString);
  function removeCompanySuffixes(name){
    let companyName = name;
    companyName = companyName.replace(/(\s((stiftung)|(gesellschaft)|(verein)))?(\s((g?gmbh)|(ag)|(limited)))?(\s(\&|(und)))?(\sco\.?)?(\s((kg)|(((oh)|u)g)))?(\s((PartG(\smgb)?)|(stille Gesellschaft)|(e\.?\s?v\.?)|(eg)|(kör)|(((vv)|g|(kg)|(reit-)|(inv))ag)|(EWIV)|(SE)|(SCE)|(Aör)|(regiebetrieb)))?(\s|\.){0,2}$/i, "");
    companyName = companyName.replace(/(\s(((pte\.?\s?)?(ltd)?\.?)|(s\.?\s?a)|(a\.?\s?g)|(n\.?\s?v)|(ltee)|(b\.?\s?v)|(l\.?\s?l\.?\s?c\.?)|(sia)|(inc\.?\s?)|(corp\.?\s?)|(foundation)|(society)))?(\s|\.){0,2}$/i, "");
    return companyName
  }

  identifier = removeCompanySuffixes(identifier);
  let companyCanidates = [];
  let companyCanidatesClean = [];
  let companyIndexes = [];

  for (let i = 0; i<companies.length; i++){
    let companyName = companies[i].name;
    let completeName = companyName;
    companyName = removeCompanySuffixes(companyName);
    if(stringSimilarity.compareTwoStrings(companyName.toLowerCase(), identifier.toLowerCase()) >= 0.85){
      companyCanidates.push(companyName)
      companyCanidatesClean.push(completeName)
      companyIndexes.push(i)
    }

  }

  if(companyCanidates.length > 0){
    let bestIndex = stringSimilarity.findBestMatch(identifier, companyCanidates).bestMatchIndex;
    return [companyCanidatesClean[bestIndex], companyIndexes[bestIndex]];
  }

  return false
}



app.get(/\/passLengthFor/gi, (req, res) => {
  let name = getCompanyNameFromPath(req.path);
  let company = identifyCompany(name);
  if(company != false){
    let length = companies[company[1]]?.pass?.length;
    let name = companies[company[1]]?.name;
     //send pass length to client
    res.send({ l: length, n:name });
  }
  if (company == false) res.send({ l: 1000, n:null });
  return;
});
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));
app.get("/_*", (req, res) => res.sendFile(`${__dirname}/index.html`));

app.post(/\/sendPassFor/gi, (req, res) => {
  let name = getCompanyNameFromPath(req.path);
  let company = identifyCompany(name);
  let companyData = companies[company[1]];
  let pass = companyData?.pass;
  if(company != false){
    let newBehindPass = JSON.stringify(behindPass)
    newBehindPass = newBehindPass.replace(/_:_insert:CompanyName_:_/gi, companyData.name);
    newBehindPass = newBehindPass.replace(/_:_insert:CompanySpecificText_:_/gi, companyData.text);
    newBehindPass = JSON.parse(newBehindPass);
    if (req.body.pass == pass) res.json(newBehindPass);
    if (req.body.pass != pass) res.json({ successfullLoad: false });
  }else{
    res.json({ successfullLoad: false })
  }
  return;
});

app.listen(port, () => {
  console.log(`App listening at http://192.168.2.128:${port}`);
});
