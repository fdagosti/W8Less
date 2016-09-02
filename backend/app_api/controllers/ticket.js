var mongoose = require("mongoose");
var queuesDB = mongoose.model("queue");


var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};



module.exports.createTicket = function(req, res){
  if (!req.params.queueid) {
        sendJsonResponse(res, 404, {
            message: "Not found, queueid is required"
        });
        return;
    }

    queuesDB
    .findById(req.params.queueid)
    .exec(
        function(err, queue) {
            if (!queue){
                sendJsonResponse(res, 404, {
                    message: "queueid not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }

            var ticket = {
              number: queue.rouleau.ticketPosition,
              creationDate: Date.now(),
              sourceQueue: queue._id,
              sourceQueueName: queue._id,  // initially, the field is similar to the queue ID. Later, it can have the queue display name
              validationToken: "UN ID BIDON"
            };

            queue.rouleau.ticketPosition++;

            queue.save(function(err, queue){
                if (err){
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, ticket);
                }
            });
        });
};

