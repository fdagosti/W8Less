var rouleauDeTicket = require("./rouleauTicket").rouleau;

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};



module.exports.createTicket = function(req, res){
  var ticket = rouleauDeTicket.currentTicketNumber++;
    
    sendJsonResponse(res, 200, {number: ticket});
};

module.exports.getRouleauDeTicket = function(req, res){
  sendJsonResponse(res, 200, rouleauDeTicket);
};
