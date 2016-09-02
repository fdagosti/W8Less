var app = require("../../../app");
var mongoose = require("mongoose");
var queueDB = mongoose.model("queue");

beforeEach(function(done){
  // console.log("BeforeEach Helpers");
   server = app.listen(9876, function(){
      queueDB.remove({}, function(err){
      done();
      });
    });
  }); 

  afterEach(function(done){
    // console.log("AfterEach Helpers");
    server.close(function(){
      done();
    });
  });