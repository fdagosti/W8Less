var express = require("express");
var router = express.Router();

var ctrlQueue = require("../controllers/queue");
var ctrlTicket = require("../controllers/ticket");

// hello
router.get("/hello", function(req, res){
  res.status(200),
  res.json({result:"fine"});
});


// Queue
router.get("/queue", ctrlQueue.queueStatus);

// Ticket
router.post("/ticket", ctrlTicket.createTicket);
router.get("/ticket", ctrlTicket.getRouleauDeTicket);

// Next
router.post("/queue/next", ctrlQueue.postNext); 

// Reset
router.post("/queue/reset", ctrlQueue.postReset);

module.exports = router;