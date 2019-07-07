"use strict";

module.exports = {
  couchbase: {
    url: "",
    username: "",
    password: "",
    bucket: "process.env.COUCHBASE_BUCKET"
  },
  AWS: {
    destinationBucket: "process.env.AWS_DESTINATION_BUCKET",
    destinationBucketUrl: "process.env.AWS_DESTINATION_BUCKET_URL",
    sourceBucket: "process.env.AWS_SOURCE_BUCKET",
    accountData: {
      accessKeyId: "process.env.AWS_ACCOUNT_DATA_ACCESS_KEY_ID",
      secretAccessKey: "process.env.AWS_ACCOUNT_DATA_SECRET_ACCESS_KEY",
      region: "process.env.AWS_ACCOUNT_DATA_REGION"
    }
  },
  API: {
    LandDB: {
      GET_APPLICATIONS: "https://test.landdb.com/api/applications"
    }
  }
};
