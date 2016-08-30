(function () {

  angular
    .module('w8lessApp')
    .directive('hub', ["$timeout", "queue", navigation]);

  function navigation ($timeout, queue) {
    return {
      restrict: 'EA',
     
      templateUrl: 'src/app/common/directives/hub/hub.template.html',

      link: function(scope){

        

        queue.queueData()
        .then(function(response){
          scope.queue = response.data;
        }, function(err){
          scope.error = err;
        });

        scope.ticket = queue.getTicket();

        scope.takeTicket = function(){
          queue.createTicket()
          .then(function(response){
            scope.ticket = response.data;
          }, function(error){
            scope.error = error;
          });
        };

      }     
    };
  }

})();