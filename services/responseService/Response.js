module.exports = class Response {
  static ok(result) {
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }

  static notFound() {
    return {
      statusCode: 404,
      body: "Resource not found."
    };
  }
};
