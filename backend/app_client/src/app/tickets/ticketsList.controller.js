((function(){

  angular.module('w8lessApp').controller('ticketsListCtrl', function($scope, queue, ticketService) {
    var vm = this;

    vm.createTicket = function(queue){
      ticketService.createTicket(queue)
      .then(function(response){
        vm.listTickets();
      }, function(error){
        vm.error = error;
      });
    };

    vm.listTickets = function(){
      vm.tickets = ticketService.getTickets();
      _syncQueueNamesWithTickets();
    };

    vm.deleteTicket = function(ticket){
      ticketService.deleteTicket(ticket);
      vm.listTickets();
    };

    _syncQueueNamesWithTickets = function(){
      if (vm.queues && vm.tickets){
        for (var i = 0; i < vm.tickets.length; i++){
          vm.tickets[i].tmpInvalid = true;
          vm.tickets[i].invalidReason = "Source Queue was not found on the server";
          for (var j = 0; j < vm.queues.length; j++){
            if (vm.tickets[i].sourceQueue === vm.queues[j]._id){
              if (vm.tickets[i].createDate > vm.queues[i].lastResetDate){
                vm.tickets[i].tmpInvalid = false;
              }else{
                vm.tickets[i].invalidReason = "ticket is outdated, Queue has been reset";
              }
              vm.tickets[i].sourceQueueName = vm.queues[j].nom;
              break;
            }
          }
          if (vm.tickets[i].tmpInvalid){
            vm.tickets[i].invalid = true;
          }
        }
      }
    };

    vm.listTickets();

    queue.queueList()
    .then(function(response){
      vm.queues = response.data;
      _syncQueueNamesWithTickets();
    }, function(error){
      vm.error = error;
    });

  });

})());