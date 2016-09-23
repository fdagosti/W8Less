((function(){

angular.module('w8lessApp').controller('landingCtrl', function($scope, $location, queue, ticketService) {
 var vm = this;

 vm.createTicket = function(id){
  console.log("CREATING TICKET")
  ticketService.createTicket({_id:id})
  .then(function(response){
    $location.path("/tickets");
  }, function(error){
    vm.error = error;
  });
 }

 queue.queueList()
 .then(function(response){
  vm.queues = response.data;
 }, function(error){
  vm.error = error;
 });

});

})());