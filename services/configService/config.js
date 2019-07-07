const fs = require("fs");
const sharedConfig = require("../configurations/sharedConfig");

module.exports = class Config {
  constructor(lambdaDir) {
    const lambdaConfigFile = `${lambdaDir}/config/config.js`;
    this.lambdaConfig = fs.existsSync(lambdaConfigFile)
      ? require(lambdaConfigFile)
      : {};
  }

  load() {
    return { ...sharedConfig, ...this.lambdaConfig };
  }
};
