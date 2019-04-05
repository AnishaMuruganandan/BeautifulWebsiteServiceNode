var settings = require("./db-connection-details.json");
var mysql = require("mysql");
var logger = require("../loggers/logger");

var mysqlConnect = {
  connection: null,

  connectDatabase: function() {
    this.connection = mysql.createConnection(settings);
    this.connection.connect(function(err) {
      if (!err) {
        logger.info("Database is connected!");
      } else {
        logger.debug("Error connecting database!");
      }
    });

    return this.connection;
  },

  disconnectDatabase: function() {
    this.connection.destroy();
    connection: null;
  }
};

module.exports = mysqlConnect;
