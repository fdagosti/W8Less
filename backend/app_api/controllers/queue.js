var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var queueInfo = {
  currentPosition : 45,
  maxPosition : 100
};

module.exports.queueStatus = function(req, res){
    sendJsonResponse(res, 200, queueInfo);
};

module.exports.postNext = function(req, res){
  queueInfo.currentPosition++;
  sendJsonResponse(res, 200, queueInfo);
};

