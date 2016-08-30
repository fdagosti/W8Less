(function () {

  angular
    .module('w8lessApp')
    .directive('queueAdmin', ["queue", navigation]);

  function navigation (queue) {
    return {
      restrict: 'EA',
      templateUrl: 'src/app/common/directives/queueadmin/queueadmin.template.html',
      link: function(scope){
        console.log("Salut, testing the link"+queue);
        queue.queueData()
        .then(function(response){
          scope.queue = response.data;
          console.log(response);
        }, function(err){
          console.log("ERRROR "+err);
        });
        scope.next = function(){
          queue.next()
          .then(function(response){
            console.log("yeah, next worked");
            scope.queue = response.data;
          }, function(error){
            console.log("error on next");
          });
        }
      }
    };
  }

})();