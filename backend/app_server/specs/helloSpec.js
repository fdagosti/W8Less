var rest = require("restler");
var app = require("../../app");
var base = "http://localhost:9876";


describe("A stupid hello test", function(){
  
 
  it("should answer to the hello function", function(done){

    rest.get(base+"/api/hello/")
    .on("success", function(data, response){
      expect(response.result).toBe("fine");
      done();
    }).on("fail", function(err, response){
        done.fail("simple hello api not working");
    });
  });

  

  });
