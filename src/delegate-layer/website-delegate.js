var websiteService = require("../services/website-service");
var logger = require("../loggers/logger");
var websiteUtil = require("../utils/website-utils");
var response = require("../objects/response-object");

var websiteDelegate = (function() {
  const FILE_NAME = "DELEGATE";
  var saveDetails = async function(url, webIdentifier) {
    const METHOD_NAME = "SAVE DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME, url);

    response = await websiteService.checkLive(url);
    logger.warn(response);
    if (response.data.isLiveURL) {
      response = await websiteService.checkURLExist(webIdentifier);

      if (!response.data.isURLPresent) {
        let wesbiteDetails = await websiteUtil.getMetaData(url, webIdentifier);
        response = await websiteService.saveWebsiteDetails(wesbiteDetails);
      } else {
        response.msg = "The website URL is already in our treasure";
        response.status = "ERROR";
      }
    } else {
      response.msg = "The website URL is broken";
      response.status = "ERROR";
    }
    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return response;
  };

  var getDetailsByID = async function(id) {
    const METHOD_NAME = "GET DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME);
    var detailsfetched = await websiteService.fetchDetailsById(id);
    logger.info(detailsfetched);
    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return detailsfetched;
  };

  var getDetails = async function() {
    const METHOD_NAME = "GET ALL DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME);
    var allDetailsFetched = await websiteService.fetchDetails();
    logger.info(allDetailsFetched);
    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return allDetailsFetched;
  };

  var updateVoteCount = async function(id) {
    const METHOD_NAME = "UPDATE DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME);
    var voteCount = await websiteService.fetchUpVote(id);
    var isVoted = await websiteService.updateUpVote(
      id,
      voteCount[0].website_upvote_count
    );
    logger.info(isVoted);
    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return isVoted;
  };
  return {
    saveDetails: saveDetails,
    getDetailsByID: getDetailsByID,
    getDetails: getDetails,
    updateVoteCount: updateVoteCount
  };
})();
module.exports = websiteDelegate;
