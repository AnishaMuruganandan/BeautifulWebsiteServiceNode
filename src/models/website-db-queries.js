var dbconnectionConst = require("../db-details/db-connection");
var logger = require("../loggers/logger");

var websiteQueries = (function() {
  var getDetailsByName = async function(getDetailsByNameQuery, webIdentifier) {
    //entr log
    return new Promise((resolve, reject) => {
      let dbconnectionObj = dbconnectionConst.connectDatabase();
      return dbconnectionObj.query(
        getDetailsByNameQuery,
        [webIdentifier],
        (err, rows) => {
          dbconnectionConst.disconnectDatabase();
          //exit lg
          if (err) {
            logger.error(err);
            reject(err);
          }
          logger.log(rows + "rowsstore");
          resolve(rows);
        }
      );
    });
  };

  var saveDetailsQuery = async function(
    saveWebsiteDetailsQuery,
    websiteDetailsObj
  ) {
    return new Promise((resolve, reject) => {
      let dbconnection = dbconnectionConst.connectDatabase();
      return dbconnection.query(
        saveWebsiteDetailsQuery,
        [
          websiteDetailsObj.url,
          websiteDetailsObj.name,
          websiteDetailsObj.time,
          websiteDetailsObj.screenshotPath
        ],
        (err, rows) => {
          dbconnectionConst.disconnectDatabase();
          if (err) {
            logger.error(err);
            reject(err);
          }
          logger.log(rows + "rowsstore");
          resolve(rows);
        }
      );
    });
  };

  var getDetailQuery = async function(getDetails, id) {
    return new Promise((resolve, reject) => {
      let dbconnectionObj = dbconnectionConst.connectDatabase();
      return dbconnectionObj.query(getDetails, [id], (err, rows) => {
        dbconnectionConst.disconnectDatabase();
        if (err) {
          logger.error(err);
          reject(err);
        }
        logger.log(rows + "rowsstore");
        resolve(rows);
      });
    });
  };

  var getAllDetailQuery = async function(getAllDetails) {
    return new Promise((resolve, reject) => {
      let dbconnectionObj = dbconnectionConst.connectDatabase();
      return dbconnectionObj.query(getAllDetails, (err, rows) => {
        dbconnectionConst.disconnectDatabase();
        //exit lg
        if (err) {
          logger.error(err);
          reject(err);
        }
        logger.log(rows + "rowsstore");
        resolve(rows);
      });
    });
  };

  var getCountQuery = async function(getVoteDetails, id) {
    return new Promise((resolve, reject) => {
      let dbconnectionObj = dbconnectionConst.connectDatabase();
      return dbconnectionObj.query(getVoteDetails, [id], (err, rows) => {
        dbconnectionConst.disconnectDatabase();
        //exit lg
        if (err) {
          logger.error(err);
          reject(err);
        }
        logger.log(rows + "rowsstore");
        resolve(rows);
      });
    });
  };

  var updateCountQuery = async function(updateDetails, upvote, id) {
    return new Promise((resolve, reject) => {
      let dbconnectionObj = dbconnectionConst.connectDatabase();
      return dbconnectionObj.query(updateDetails, [upvote, id], (err, rows) => {
        dbconnectionConst.disconnectDatabase();
        //exit lg
        if (err) {
          logger.error(err);
          reject(err);
        }
        logger.log(rows + "rowsstore");
        resolve(rows);
      });
    });
  };

  return {
    getDetailsByName: getDetailsByName,
    saveDetailsQuery: saveDetailsQuery,
    getDetailQuery: getDetailQuery,
    getAllDetailQuery: getAllDetailQuery,
    updateCountQuery: updateCountQuery,
    getCountQuery: getCountQuery
  };
})();
module.exports = websiteQueries;
