var express = require("express");
var router = express.Router();

var ctrlQueue = require("../controllers/queue");

// hello
router.get("/hello", function(req, res){
  res.status(200),
  res.json({result:"fine"});
});


// Queue
router.get("/queue", ctrlQueue.queueStatus);

// Next
router.post("/queue/next", ctrlQueue.postNext); 
module.exports = router;
