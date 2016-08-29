var express = require("express");
var router = express.Router();


// enigmes
router.get("/hello", function(req, res){
  res.status(200),
  res.json({result:"fine"});
});
 
module.exports = router;
