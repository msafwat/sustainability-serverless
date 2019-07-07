const AppBuilder = require("/opt/AppBuilder");
//const AppBuilder = require("../services/AppBuilder");

exports.handler = async (event, context) => {
  const app = new AppBuilder(event, context, __dirname);
  await app.run();

  return app.output;
};

/*
(async () => {
  console.log('1')
  await getHtml()
  console.log('2')
})()
*/
