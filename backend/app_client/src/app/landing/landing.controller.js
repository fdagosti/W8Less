((function(){

angular.module('w8lessApp').controller('landingCtrl', function($scope, queue) {
 var vm = this;

 queue.queueList()
 .then(function(response){
  vm.queues = response.data;
 }, function(error){
  vm.error = error;
 });

});

})());