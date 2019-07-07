const couchbase = require("couchbase");

module.exports = class CouchBaseApi {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;

    this.cluster = new couchbase.Cluster(config.url);
    this.cluster.authenticate(config.username, config.password);

    this.bucket = this.cluster.openBucket(config.bucket);
  }

  insert(key, data) {
    return new Promise((resolve, reject) => {
      this.bucket.upsert(key, data, (err, result) => {
        if (err) {
          this.logger.log(`${key} Insert into Couchbase failed.`);
          reject(err);
        } else {
          this.logger.log(`${key} Inserted into Couchbase successfully.`);
          resolve(result);
        }
      });
    });
  }

  replace(key, data) {
    return new Promise((resolve, reject) => {
      this.bucket.replace(key, data, (err, result) => {
        if (err) {
          this.logger.log(`${key} Replace into Couchbase failed.`);
          reject(err);
        } else {
          this.logger.log(`${key} Replaced into Couchbase successfully.`);
          resolve(result);
        }
      });
    });
  }

  read(key) {
    return new Promise((resolve, reject) => {
      key = key.toString();

      this.bucket.get(key, (err, result) => {
        if (err) {
          if (err.code == couchbase.errors.keyNotFound) {
            this.logger.log("Key does not exist");
            reject(err);
          } else {
            this.logger.log("Some other error occurred: %j", err);
            reject(err);
          }
        } else {
          this.logger.log("Retrieved document with value: %j", result.value);
          this.logger.log("CAS is %j", result.cas);
          resolve(result.value);
        }
      });
    });
  }

  getMulti(arrayOfKeys) {
    return new Promise((resolve, reject) => {
      this.bucket.getMulti(arrayOfKeys, (err, result) => {
        if (err) {
          if (err.code == couchbase.errors.keyNotFound) {
            this.logger.log("Key does not exist");
            reject(err);
          } else {
            this.logger.log("Some other error occurred: %j", err);
            reject(err);
          }
        } else {
          this.logger.log("Retrieved document with value: %j", result.value);
          this.logger.log("CAS is %j", result.cas);
          for (var key in results) {
            if (results.hasOwnProperty(key)) {
              if (results[key].error) {
                this.logger.log(
                  "`" + key + "`: " + JSON.stringify(results[key])
                );
              }
            }
          }
          resolve(result.value);
        }
      });
    });
  }
};
