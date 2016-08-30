var rouleauDeTicket = require("./rouleauTicket").rouleau;

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var queueInfo = {
  currentPosition : 0,
  maxPosition : 100
};

module.exports.queueStatus = function(req, res){
    sendJsonResponse(res, 200, queueInfo);
};

module.exports.postNext = function(req, res){
  if (rouleauDeTicket.currentTicketNumber-1 > queueInfo.currentPosition){
    queueInfo.currentPosition++;
    sendJsonResponse(res, 200, queueInfo);
  }else{
    sendJsonResponse(res, 403, queueInfo);
  }
};

module.exports.postReset = function(req, res){
  queueInfo.currentPosition = 1;
  sendJsonResponse(res, 200, queueInfo);
};