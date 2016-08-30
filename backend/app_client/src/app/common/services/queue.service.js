(function(){

  angular
  .module('w8lessApp')
  .service('queue', queueData);

  queueData.$inject = ["$http"];   
  function queueData ($http) {
console.log("Inside QueueService");
    var queueData = function(id){
      return $http.get('/api/queue');
    };

    var next = function(enigme){

      return $http.post("/api/queue/next");
    };



    

   
   return {
     queueData : queueData,
     next: next,
   };
 }
})();