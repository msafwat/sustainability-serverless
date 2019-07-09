const AppBuilder = require("/opt/AppBuilder");

exports.handler = async (event, context) => {
  const app = new AppBuilder(event, context, __dirname);
  await app.run();

  return app.output;
};
