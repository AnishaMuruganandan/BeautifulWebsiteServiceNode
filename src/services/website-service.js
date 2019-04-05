var websiteQueries = require("../models/website-db-queries");
var queryConst = require("../constants/website-query-constant");

var websiteUtil = require("../utils/website-utils");
var logger = require("../loggers/logger");
var response = require("../objects/response-object");

var websiteService = (function() {
  const FILE_NAME = "SERVICE";

  let checkLive = async function(url) {
    const METHOD_NAME = "CHECK DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME);

    let isLiveURL = await websiteUtil.checkURLLive(url);
    response.data = {
      isLiveURL: isLiveURL
    };
    logger.info(response);

    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return response;
  };

  let checkURLExist = async function(webIdentifier) {
    const METHOD_NAME = "GET DETAILS BY URL";
    logger.debug("entry", FILE_NAME, METHOD_NAME, webIdentifier);

    let resultRow = await websiteQueries.getDetailsByName(
      queryConst.GET_DETAILS_BY_NAME,
      webIdentifier
    );
    let isURLPresent = false;
    if (resultRow.length > 0) {
      isURLPresent = true;
    }
    response.data = { isURLPresent: isURLPresent };
    logger.info(response);

    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return response;
  };

  let saveWebsiteDetails = async function(detailsObj) {
    const METHOD_NAME = "SAVE WEBSITE DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME, detailsObj);
    try {
      response.data = await websiteQueries.saveDetailsQuery(
        queryConst.SAVE_DETAILS,
        detailsObj
      );
      response.status = "SUCCESS";
      response.msg = "";
    } catch (err) {
      response.status = "ERROR";
      response.msg = "Issue in DB";
      response.data = err;
    }
    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return response;
  };

  let fetchDetailsById = async function(id) {
    const METHOD_NAME = "FETCH DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME);
    try {
      var detailFetched = await websiteQueries.getDetailQuery(
        queryConst.GET_DETAILS_BY_ID,
        id
      );
      response.data = {
        detailFetched: detailFetched
      };
      response.status = "SUCCESS";
      response.msg = "";
    } catch (err) {
      response.status = "ERROR";
      response.msg = "Issue in DB";
      response.data = err;
    }
    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return response;
  };

  let fetchDetails = async function() {
    const METHOD_NAME = "FETCH ALL DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME);
    try {
      var detailsFetched = await websiteQueries.getAllDetailQuery(
        queryConst.GET_ALL_DETAILS
      );
      // console.log(JSON.stringify(detailsFetched) + "detailsFetched");
      function sortByVote(detail, key) {
        return detail.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          return x - y;
        });
      }

      function sortBy(detail, key, type) {
        let tempArr = [...detail];

        tempArr = tempArr.sort((a, b) => {
          let left, right;
          if (type) {
            if (type === "DATE") {
              left = new Date(b[key].replace(/-/g, "/"));
              right = new Date(a[key].replace(/-/g, "/"));
            }
          } else {
            left = b[key];
            right = a[key];
          }

          return left - right;
        });
        return tempArr;
      }

      let dataSortedByVote = sortBy(detailsFetched, "website_upvote_count");

      let dataSortedByDate = sortBy(
        detailsFetched,
        "website_upload_time",
        "DATE"
      );
      response.data = {
        topFour: dataSortedByVote.slice(0, 4),
        dataByDate: dataSortedByDate
      };
      response.status = "SUCCESS";
      response.msg = "";
    } catch (err) {
      response.status = "ERROR";
      response.msg = "Issue in DB";
      response.data = err;
    }
    logger.debug("exit", FILE_NAME, METHOD_NAME, JSON.stringify(response));
    return response;
  };

  let fetchUpVote = async function(id) {
    const METHOD_NAME = "FETCH UPVOTE";
    logger.debug("entry", FILE_NAME, METHOD_NAME);
    var voteCount = await websiteQueries.getCountQuery(
      queryConst.GET_UPVOTE,
      id
    );
    logger.debug("exit", FILE_NAME, METHOD_NAME);
    return voteCount;
  };

  let updateUpVote = async function(id, voteCount) {
    const METHOD_NAME = "UPDATE DETAILS";
    logger.debug("entry", FILE_NAME, METHOD_NAME);
    var isUpdated = false;
    let count = 0;
    logger.log("COUNT" + count + "upVoteCount" + voteCount);
    try {
      if (voteCount === null) {
        count = 1;
      } else {
        count = voteCount + 1;
      }
      var countUpdated = await websiteQueries.updateCountQuery(
        queryConst.UPDATE_UPVOTE,
        count,
        id
      );
      if (countUpdated.affectedRows === 1) {
        isUpdated = true;
      }
      response.data = { isUpdated: isUpdated };
      logger.debug("exit", FILE_NAME, METHOD_NAME);
      response.status = "SUCCESS";
      response.msg = "";
    } catch (err) {
      response.status = "ERROR";
      response.msg = "Issue in DB";
      response.data = err;
    }
    return response;
  };
  return {
    checkLive: checkLive,
    checkURLExist: checkURLExist,
    saveWebsiteDetails: saveWebsiteDetails,
    fetchDetailsById: fetchDetailsById,
    fetchDetails: fetchDetails,
    fetchUpVote: fetchUpVote,
    updateUpVote: updateUpVote
  };
})();

module.exports = websiteService;
