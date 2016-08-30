(function () {

  angular
    .module('w8lessApp')
    .directive('queueAdmin', ["queue", navigation]);

  function navigation (queue) {
    return {
      restrict: 'EA',
      templateUrl: 'src/app/common/directives/queueadmin/queueadmin.template.html',
      link: function(scope){
        
        scope.refresh = function(){
            queue.queueData()
          .then(function(response){
            scope.queue = response.data;
          }, function(err){
            scope.error = err;
          });

          queue.getRouleauDeTicket()
          .then(function(response){
            scope.rouleau = response.data;
          }, function(err){
            scope.error = err;
          });
      };

        scope.next = function(){
          queue.next()
          .then(function(response){
            scope.queue = response.data;
          }, function(err){
            scope.error = err;
          });
        };
        scope.reset = function(){
          queue.reset()
          .then(function(response){
            scope.queue = response.data;
          }, function(error){
            scope.error = error;
          });
        };

        scope.refresh();


      }
    };
  }

})();