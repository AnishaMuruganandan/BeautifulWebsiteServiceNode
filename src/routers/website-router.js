var express = require("express");
var router = express.Router();
var websiteDelegate = require("../delegate-layer/website-delegate");
var urlConst = require("../constants/url-constants");
var logger = require("../loggers/logger");
const FILE_NAME = "ROUTER";

router.post(urlConst.WEBSITE_DETAILS, async function(req, res, next) {
  const METHOD_NAME = "POST DETAILS";
  logger.debug("entry", FILE_NAME, METHOD_NAME, JSON.stringify(req.body));
  let url = req.body.url;
  let webIdentifier = req.body.webIdentifier;
  let isSaved = await websiteDelegate.saveDetails(url, webIdentifier);
  logger.debug("exit", FILE_NAME, METHOD_NAME);
  res.json(isSaved);
});

router.get(urlConst.WEBSITE_DETAILS, async function(req, res, next) {
  const METHOD_NAME = "GET DETAILS";
  logger.debug("entry", FILE_NAME, METHOD_NAME, JSON.stringify(req.query));

  let details = await websiteDelegate.getDetails();
  logger.debug("exit", FILE_NAME, METHOD_NAME);
  res.json(details);
});

router.get(urlConst.WEBSITE_DETAILS + urlConst.ID_SELECTOR, async function(
  req,
  res,
  next
) {
  const METHOD_NAME = "GET DETAILS";
  logger.debug("entry", FILE_NAME, METHOD_NAME, JSON.stringify(req.params));
  let detailsByID = await websiteDelegate.getDetailsByID(req.params.id);
  res.json(detailsByID);
});

router.put(urlConst.WEBSITE_DETAILS + urlConst.ID_SELECTOR, async function(
  req,
  res,
  next
) {
  console.log(JSON.stringify(req.params) + "req");
  const METHOD_NAME = "UPDATE DETAILS";
  logger.debug("entry", FILE_NAME, METHOD_NAME);
  let isUpdated = await websiteDelegate.updateVoteCount(req.params.id);
  logger.debug("exit", FILE_NAME, METHOD_NAME);
  res.json(isUpdated);
});
module.exports = router;
