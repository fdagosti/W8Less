((function(){

angular.module('w8lessApp').controller('queueListCtrl', function($scope, queue, mySocket) {
  var vm = this;
  mySocket.removeAllListeners();
  mySocket.on("queue update", function(newQueue){
    vm.updateQueues();
  });

  vm.updateQueues = function(){
    queue.queueList()
    .then(function(response){
      vm.queues = response.data;
    }, function(err){
      vm.error = err.data;
    });
};

  vm.createQueue = function(newQueue){
    queue.createQueue(newQueue)
    .then(function(response){
      vm.updateQueues();
    }, function(err){
      vm.error = err.data;
    });
  };

  vm.deleteQueue = function(queueToDel){
    queue.deleteQueue(queueToDel)
    .then(function(response){
      vm.updateQueues();
    }, function(err){
      vm.error = err.data;
    });
  };

  vm.nextCustomer = function(queueToUpdate){
    queue.next(queueToUpdate)
    .then(function(response){
      vm.updateQueues();
    }, function(err){
      queueToUpdate.error = err.data.message;
    });
  };

  vm.resetQueue = function(queueToUpdate){
    queue.reset(queueToUpdate)
    .then(function(response){
      vm.updateQueues();
    }, function(err){
      vm.error = err.data;
    });
  };

  vm.setCameraControl = function(queueToUpdate){
    console.log(queueToUpdate);
    queue.setQueueData(queueToUpdate)
    .then(function(response){
    }, function(err){
      vm.error = err.data;
    });
  };

  vm.updateQueues();

});

})());