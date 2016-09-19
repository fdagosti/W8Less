(function(){

  angular
  .module('w8lessApp')
  .service('queue', queueData);

  queueData.$inject = ["$http"];   
  function queueData ($http) {

    var queueList = function(){
      return $http.get("/api/queues");
    };

    var createQueue = function(newQueue){
      return $http.post("/api/queues/", newQueue);
    };

    var next = function(queue){

      return $http.post("/api/queues/"+queue._id+"/next");
    };

    var reset = function(queue){

      return $http.post("/api/queues/"+queue._id+"/reset");
    };

    var setQueueData = function(queue){
      return $http.put("/api/queues/"+queue._id, queue);
    };


    

    var deleteQueue = function(queueToDel){
      return $http.delete("/api/queues/"+queueToDel._id);
    }
   
   return {
     setQueueData : setQueueData,
     next: next,
     reset: reset,
     queueList : queueList,
     createQueue: createQueue,
     deleteQueue: deleteQueue
   };
 }
})();