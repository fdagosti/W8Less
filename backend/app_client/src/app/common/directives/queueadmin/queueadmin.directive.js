(function () {

  angular
    .module('w8lessApp')
    .directive('queueAdmin', ["queue", "$timeout", navigation]);

  function navigation (queue, $timeout) {
    return {
      restrict: 'EA',
      templateUrl: 'src/app/common/directives/queueadmin/queueadmin.template.html',
      link: function(scope){
        
        scope.refresh = function(){
            queue.queueData()
          .then(function(response){
            scope.queue = response.data;
          }, function(err){
            showTempMsg(err);
          });

          queue.getRouleauDeTicket()
          .then(function(response){
            scope.rouleau = response.data;
          }, function(err){
            showTempMsg(err);
          });
      };

        scope.next = function(){
          queue.next()
          .then(function(response){
            scope.queue = response.data;
          }, function(err){
            showTempMsg("you cannot go to the next customer, he needs to take a ticket first");
          });
        };
        scope.reset = function(){
          queue.reset()
          .then(function(response){
            scope.queue = response.data;
          }, function(error){
            showTempMsg(error);
          });
        };

        scope.refresh();

        var showTempMsg = function(msg){
          scope.error = msg;
          $timeout(function(){scope.error = null;}, 2000);
        }

      }
    };
  }

})();