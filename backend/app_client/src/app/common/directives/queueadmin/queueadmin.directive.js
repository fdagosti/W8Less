(function () {

  angular
    .module('w8lessApp')
    .directive('queueAdmin', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'src/app/common/directives/queueadmin/queueadmin.template.html',
      link: function(scope){
        console.log("Salut, testing the link");
        scope.test = function(){
          console.log("button pressed");
        }
      }
    };
  }

})();