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
          }).on("fail", function(err, response){
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
            }).on("fail", function(err, response){
              done.fail();
            });
          }).on("fail", function(err, response){
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
          }).on("fail", function(err, response){
            done.fail(err);
          });
        }).on("fail", function(err, response){
          done.fail(err);
        });
      });
    });

    it("should fail when calling next without taking a ticket", function(done){
      _addQueue("queue1", "desc1", function(queue){
        var previousCustomerPosition = queue.customerPosition;
        expect(previousCustomerPosition).toBe(0);
        rest.post(base+"queues/"+queue._id+"/next")
        .on("success", function(queue, response){
          done.fail("you did not take a ticket, it should fail");
        }).on("fail", function(err, response){
          expect(response.statusCode).toBe(403);
          done();
        });
      });
    });

       it("should have its customer position back to 0 when calling reset", function(done){
      _addQueue("queue1", "desc1", function(queue){
        rest.post(base+"ticket/"+queue._id)
        .on("success", function(ticket, response){
          rest.post(base+"queues/"+queue._id+"/next")
          .on("success", function(queue, response){
            expect(queue.customerPosition).toBe(1);
            expect(queue.lastResetDate).toBeDefined();
            var lastReset = queue.lastResetDate;
            rest.post(base+"queues/"+queue._id+"/reset")
            .on("success", function(queue, response){
              expect(queue.customerPosition).toBe(0);
              expect(queue.lastResetDate).toBeGreaterThan(lastReset);
              done();
            }).on("fail", function(err, response){
              done.fail(err);
            });
          }).on("fail", function(err, response){
            done.fail(err);
          });
        }).on("fail", function(err, response){
          done.fail(err);
        });
      });
    });


  });