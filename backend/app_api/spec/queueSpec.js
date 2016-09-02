var rest = require("restler");
var base = "http://localhost:9876/api/";


  describe("The waitless queue", function(){
 

    it("should allow to create a new Queue", function(done){
      var queue = {nom: "Queue du boucher", description: "a stupid description"};
      rest.post(base+"queues", {data:queue})
      .on("success", function(data, response){
        expect(data.nom).toBe(queue.nom);
        expect(data.description).toBe(queue.description);
        expect(data.customerPosition).toBeDefined();
        expect(data.rouleau).toBeDefined();
        done();
      }).on("fail", function(err, response){
        done.fail(err);
      });
    });

    it("should allow to create a new Queue and read it", function(done){
      var queue = {nom: "Queue du boucher", description: "a stupid description"};
      rest.post(base+"queues", {data:queue})
      .on("success", function(returnValue, response){
        rest.get(base+"queues/"+returnValue._id)
        .on("success", function(data, response){
          expect(data._id).toBe(returnValue._id);
          done();
        }).on("failure", function(err, response){
          done.fail(err);
        });
      }).on("fail", function(err, response){
        done.fail(err);
      });
    });


    var _addQueue = function(name, desc, done){
      var queue = {nom: name, description: desc};
      rest.post(base+"queues", {data:queue})
      .on("success", function(data, response){
        done(data);
      }).on("fail", function(err, response){
        done.fail(err);
      });
    };

    it("shoud allow to create some queues and list them", function(done){
      _addQueue("queue1", "desc1", function(){
        _addQueue("queue2", "desc2", function(){
          rest.get(base+"queues")
          .on("success", function(queues, response){
            expect(queues.length).toBe(2);
            done();
          }).on("failure", function(err, response){
            done.fail();
          });
        });
      });
    });

    it("shoud allow to delete queues", function(done){
      _addQueue("queue1", "desc1", function(){
        _addQueue("queue2", "desc2", function(queue){
          rest.del(base+"queues/"+queue._id)
          .on("success", function(data, response){
             rest.get(base+"queues")
            .on("success", function(queues, response){
              expect(queues.length).toBe(1);
              done();
            }).on("failure", function(err, response){
              done.fail();
            });
          }).on("failure", function(err, response){
            done.fail();
          });
        });
      });
    });

    it("should allow to modify a queue", function(done){
      _addQueue("queue1", "desc1", function(queue){
        var anotherQueue = {nom: "anotherNom",description:"another description"};
        rest.put(base+"queues/"+queue._id, {data:anotherQueue})
        .on("success", function(data, response){
          rest.get(base+"queues/"+queue._id)
          .on("success", function(queue, response){
            expect(queue.description).toBe(anotherQueue.description);
            done();
          }).on("failure", function(err, response){
            done.fail(err);
          })
        }).on("failure", function(err, response){
          done.fail(err);
        })
      });
    });

    // it("should increment the current position when calling next", function(done){
    //   rest.get(base+"queue")
    //   .on("success", function(data, response){
    //     var currentPosition = data.currentPosition;
    //     rest.post(base+"queue/next")
    //     .on("success", function(data, response){
    //       expect(data.currentPosition).toBe(currentPosition+1);
    //       done();
    //     }).on("fail", function(err, response){
    //       done.fail();
    //     });
    //   }).on("fail", function(err, response){
    //     done.fail(err);
    //   });
    // });
  });