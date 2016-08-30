var rest = require("restler");
var base = "http://localhost:9876/api/";


  describe("The waitless queue", function(){
    it("should return the current queue position", function(done){
      console.log("testing current queue position");
      rest.get(base+"status")
      .on("success", function(data, response){
        done();
      }).on("fail", function(err, response){
        done.fail(err);
      });
    });
  });