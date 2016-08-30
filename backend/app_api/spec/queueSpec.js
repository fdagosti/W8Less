var rest = require("restler");
var base = "http://localhost:9876/api/";


  describe("The waitless queue", function(){
    it("should return the current queue position", function(done){
      console.log("testing current queue position");
      rest.get(base+"queue")
      .on("success", function(data, response){
        expect(data.currentPosition).toBeDefined();
        done();
      }).on("fail", function(err, response){
        done.fail(err);
      });
    });

    it("should increment the current position when calling next", function(done){
      console.log("testing current queue position");
      rest.get(base+"queue")
      .on("success", function(data, response){
        var currentPosition = data.currentPosition;
        rest.post(base+"queue/next")
        .on("success", function(data, response){
          expect(data.currentPosition).toBe(currentPosition+1);
          done();
        }).on("fail", function(err, response){
          done.fail();
        });
      }).on("fail", function(err, response){
        done.fail(err);
      });
    });
  });