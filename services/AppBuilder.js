"use strict";

const Config = require("./configService/config");
const Logger = require("./loggerService/Logger");
const Router = require("./routerService/Router");
const Res = require("./responseService/Response");

module.exports = class AppBuilder {
  constructor(event, context, dir) {
    this.services = {};

    this.event = event;
    this.context = context;
    this.dir = dir;

    this.output = {};

    this.addConfigService();
    this.addLoggerService();
  }

  addConfigService() {
    if (!this.services.config)
      this.services.config = new Config(this.dir).load();
  }

  addLoggerService() {
    if (!this.services.logger) {
      var apiRequestId = this.event.requestContext.requestId;
      var lambdaRequestId = this.context.awsRequestId;

      this.services.logger = new Logger(
        apiRequestId,
        apiRequestId,
        lambdaRequestId
      );
    }
  }

  addS3Service() {}

  addDynamoDBService() {}

  addCouchbaseService() {}

  addAxiosService() {}

  async run() {
    const handler = new Router(this.dir).route(
      this.event.path,
      this.event.httpMethod
    );

    this.output = handler ? await handler(this.services) : Res.notFound();
  }
};
