const Res = require("/opt/responseService/Response");

exports.handler = async function(services) {
  services.logger.logInfo("Hi hi hi hi.....");
  return Res.ok({ id: 1 });
};
