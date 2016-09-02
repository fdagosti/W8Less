var express = require("express");
var router = express.Router();

var ctrlQueue = require("../controllers/queue");
var ctrlTicket = require("../controllers/ticket");

// hello
router.get("/hello", function(req, res){
  res.status(200),
  res.json({result:"fine"});
});


// Queues
router.get("/queues", ctrlQueue.queueList);
router.post("/queues", ctrlQueue.queueCreate);
router.get("/queues/:queueid", ctrlQueue.queueReadOne);
router.put("/queues/:queueid", ctrlQueue.queueUpdateOne);
router.delete("/queues/:queueid", ctrlQueue.queueDeleteOne);

// Next
router.post("/queues/:queueid/next", ctrlQueue.postNext); 

// Reset
router.post("/queues/:queueid/reset", ctrlQueue.postReset);

// Ticket
router.post("/ticket/:queueid", ctrlTicket.createTicket);
// router.get("/ticket", ctrlTicket.getRouleauDeTicket);

module.exports = router;