const Res = require("../responseService/Response");

module.exports = class Router {
  constructor(lambdaDir) {
    this.lambdaDir = lambdaDir;
  }

  route(path, method) {
    const apiGateway = require("../configurations/apiGateway.swagger.json");

    const paths = Object.entries(apiGateway.paths).filter(
      p =>
        p[0].split("/").length === path.split("/").length &&
        p[1][method.toLowerCase()]
    );

    if (paths && paths.length > 0) {
      // Get first element then get method object in API swagger then the operationId which is operationId
      const lambdaName = paths[0][1][method.toLowerCase()]["operationId"];

      return require(`${this.lambdaDir}/${lambdaName}/index.js`).handler;
    }

    return null;
  }
};
/*
new Router(
  "e:Projectssustainability-backend NewSustainabilitysoilCharacteristics"
).route("/SoilCharacteristics", "post");
*/
