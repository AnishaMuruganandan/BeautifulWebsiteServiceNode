var http = require("http");
var path = require("path");
var express = require("express");
var urlConst = require("./constants/url-constants");
var websiteRoute = require("./routers/website-router");
var app = express();
const cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const BASE_PATH = "/";
app.get(BASE_PATH, function(req, res) {
  res.json({ hey: "hey" });
});
app.use(urlConst.AWARDS, websiteRoute);
app.listen(8080, function() {
  console.log("CORS-enabled web server listening on port 80");
});
