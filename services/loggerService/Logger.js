"use strict";

module.exports = class Logger {
  constructor(correlationId, apiRequestId, lambdaRequestId) {
    this.logMessage = { apiRequestId, lambdaRequestId, correlationId };
  }

  log(logType, message) {
    this.logMessage.logType = logType;
    this.logMessage.message = message;

    console.log(JSON.stringify(this.logMessage));
  }

  logInfo(message) {
    this.log(LogType.INFO, message);
  }

  logWarning(message) {
    this.log(LogType.WARNING, message);
  }
};

const LogType = {
  INFO: "Info",
  WARNING: "Warning",
  ERROR: "Error"
};
