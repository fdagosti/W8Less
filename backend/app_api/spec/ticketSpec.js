var rest = require("restler");
var base = require("./specHelper").base;
var addQueue = require("./specHelper").addQueue;

  describe("a waitless ticket", function(){
 

    it("should be able to be created from a queue", function(done){

      addQueue("toto", "titi", function(queue){
        rest.post(base+"ticket/"+queue._id)
        .on("success", function(ticket, response){
          expect(ticket.number).toBe(1);
          expect(ticket.creationDate).toBeDefined();
          expect(ticket.sourceQueue).toBe(queue._id);
          expect(ticket.validationToken).toBeDefined();
          done();
        }).on("fail", function(err, response){
          done.fail(err);
        });
      });
    });

   

  });