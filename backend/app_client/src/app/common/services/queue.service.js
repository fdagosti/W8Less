(function(){

  angular
  .module('w8lessApp')
  .service('queue', queueData);

  queueData.$inject = ["$http", "$window"];   
  function queueData ($http, $window) {

    var queueList = function(){
      return $http.get("/api/queues");
    };

    var createQueue = function(newQueue){
      return $http.post("/api/queues/", newQueue);
    };

    var queueData = function(id){
      return $http.get('/api/queue');
    };

    var next = function(){

      return $http.post("/api/queue/next");
    };

    var reset = function(){

      return $http.post("/api/queue/reset");
    };

    var _saveTicket = function(ticket){
      $window.localStorage["w8less-ticket"] = JSON.stringify(ticket);
    }

    var createTicket = function(){
      return $http.post("/api/ticket").then(function(response){
        _saveTicket(response.data);
        return response;
      });
    };

    var getRouleauDeTicket = function(){
      return $http.get("/api/ticket");
    }

    var getTicket = function(){
      var ticket = $window.localStorage["w8less-ticket"];
      if (ticket){
        return JSON.parse(ticket);
      }
      return null;
    };

    var deleteQueue = function(queueToDel){
      return $http.delete("/api/queues/"+queueToDel._id);
    }
   
   return {
     queueData : queueData,
     next: next,
     reset: reset,
     createTicket: createTicket,
     getTicket: getTicket,
     getRouleauDeTicket : getRouleauDeTicket,
     queueList : queueList,
     createQueue: createQueue,
     deleteQueue: deleteQueue
   };
 }
})();