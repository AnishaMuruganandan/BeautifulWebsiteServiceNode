var webshot = require("webshot");
const url = require("url");
var urlExists = require("url-exists");
var cloudinary = require("cloudinary");
var logger = require("../loggers/logger");

var fs = require("fs");

var websiteUtil = (function() {
  var checkURLLive = async function(url) {
    return new Promise((resolve, reject) => {
      logger.log(url + "url");
      return urlExists(url, function(err, exists) {
        logger.log(exists);
        if (err) reject(err);
        resolve(exists);
      });
    });
  };

  var getMetaData = async function(websiteURL, webIdentifier) {
    var websiteName = getwebsiteName(websiteURL);
    var wesbiteScreenshotPath = await getwesbiteScreenshotPath(
      websiteURL,
      websiteName
    );
    var websiteUploadTime = getwebsiteUploadTime();
    var websiteDetails = {
      url: websiteURL,
      name: webIdentifier,
      screenshotPath: wesbiteScreenshotPath,
      time: websiteUploadTime
    };
    return websiteDetails;
  };

  var getwebsiteName = function(websiteURL) {
    logger.log(websiteURL + "websiteURL");
    const myURL = new URL(websiteURL);

    logger.log(myURL.hostname + "myURL.hostname");
    return myURL.hostname;
  };

  var getwesbiteScreenshotPath = async function(websiteURL, websiteName) {
    cloudinary.config({
      cloud_name: "the-corp-in",
      api_key: "785612911498771",
      api_secret: "hK9b8aNPMcOrPZiyZ2qEKdQOhII"
    });
    return new Promise((resolve, reject) => {
      var path = "./src/images/" + websiteName + ".jpg";
      webshot(websiteURL, path, function(err) {
        logger.log("IMAGE SCREENSHOT" + err);

        if (err) reject(err);

        cloudinary.v2.uploader.upload(path, function(error, result) {
          //     console.log("Cloudinary" + JSON.stringify(result), error);

          path = result.url;
          logger.log("after cloudinary:" + path);
          resolve(path);
        });
      });
    });
  };

  var getwebsiteUploadTime = function(websiteURL) {
    var date = new Date();
    return date;
  };
  return {
    checkURLLive: checkURLLive,
    getMetaData: getMetaData
  };
})();
module.exports = websiteUtil;
