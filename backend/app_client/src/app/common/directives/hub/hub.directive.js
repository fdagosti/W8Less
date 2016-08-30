(function () {

  angular
    .module('w8lessApp')
    .directive('hub', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'src/app/common/directives/hub/hub.template.html',
      link: function(scope){
        console.log("in hub link function");
      }     
    };
  }

})();