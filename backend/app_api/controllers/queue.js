var mongoose = require("mongoose");
var queuesDB = mongoose.model("queue");
var camera = require("./camera");

var _io;
var io = function(){
    if (!_io){
        _io = require("../../app").settings["socket.io"];
    }
    return _io;
}

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var queueInfo = {
  currentPosition : 0,
  maxPosition : 100
};

module.exports.queueReadOne = function(req, res){
    if (req.params && req.params.queueid){
        queuesDB.findById(req.params.queueid).exec(function(err, queue){
            if (!queue){
                sendJsonResponse(res, 404, {"message":"queueid not found"});
                return;
            } else if (err){
                sendJsonResponse(res, 404, err);
                return;
            }

            sendJsonResponse(res, 200, queue);
        });
    } else {
        sendJsonResponse(res, 404, {
            "message":"No queueid in request"
        });
    }
};

module.exports.queueList = function(req, res){
    queuesDB.find()
    // .select("-description")
    .exec(
      function(err, queues){
        if (err){
            sendJsonResponse(res, 404, err);
        }else{
            sendJsonResponse(res, 200, queues);
        }
      }
    );
};

module.exports.queueCreate = function(req, res){
    queuesDB.create({
      nom: req.body.nom, 
      description: req.body.description
    }, function(err, queue){

      if (err){
        sendJsonResponse(res, 400, err)
      }else{
        sendJsonResponse(res, 201, queue);
        io().emit("queue update", queue);
      }
    });
};

module.exports.queueUpdateOne = function(req, res){
    
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
            queue.nom = req.body.nom;
            queue.description = req.body.description;
            queue.cameraControl = req.body.cameraControl;
            queue.customerPosition = req.body.customerPosition;
            queue.save(function(err, queue){
                if (err){
                    sendJsonResponse(res, 404, err);
                } else {
                    io().emit("queue update", queue);
                    sendJsonResponse(res, 200, queue);
                    camera.enableCameraMonitoring(queue.cameraControl);
                }
            });
        });
};

module.exports.queueDeleteOne = function(req, res){
    var queueid = req.params.queueid;
    if (queueid){
        queuesDB
        .findByIdAndRemove(queueid)
        .exec(
            function(err, queue) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                io().emit("queue update", null);
                sendJsonResponse(res, 204, null);
            });
    } else {
        sendJsonResponse(res, 404, {
            message : "No queueid"
        });
    }
};



module.exports.postNext = function(req, res){
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
            if (queue.rouleau.ticketPosition - queue.customerPosition <= 1){
                sendJsonResponse(res, 403, {
                    message: "your customers are at the same level as your tickets. Take a ticket first to move to the next customer"
                });
                return;
            }

            queue.customerPosition++;
            queue.save(function(err, queue){
                if (err){
                    sendJsonResponse(res, 404, err);
                } else {
                    io().emit("queue update", queue);
                    sendJsonResponse(res, 200, queue);
                }
            });
        });
};

module.exports.postReset = function(req, res){
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
            queue.customerPosition = 0;
            queue.rouleau.ticketPosition = 1;
            queue.lastResetDate = Date.now();
            queue.save(function(err, queue){
                if (err){
                    sendJsonResponse(res, 404, err);
                } else {
                    io().emit("queue update", queue);
                    sendJsonResponse(res, 200, queue);
                }
            });
        });
};