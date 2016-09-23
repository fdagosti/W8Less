(function(){

  angular
  .module('w8lessApp')
  .service('ticketService', ticketService);

    ticketService.$inject = ["$http", "$window"];   
  function ticketService ($http, $window) {

    var W8LESS_PREFIX = "w8less-ticket-";

    var _saveTicket = function(ticket){
      $window.localStorage[W8LESS_PREFIX+ticket.sourceQueue] = JSON.stringify(ticket);
    };

    var deleteTicket = function(ticket){
      $window.localStorage.removeItem(W8LESS_PREFIX+ticket.sourceQueue);
    };

    var createTicket = function(queue){
      return $http.post("/api/ticket/"+queue._id).then(function(response){
        _saveTicket(response.data);
        return response;
      });
    };

    var getTickets = function(){
      var returnValue = [];
      var ls = $window.localStorage;
      for(var i = 0, len = ls.length; i< len; ++i){
        if (ls.key(i).startsWith(W8LESS_PREFIX)){
            var ticketString = ls.getItem(ls.key(i));
            returnValue.push(JSON.parse(ticketString));
        }
      }
      return returnValue;
    };

    var getTicket = function(queue){
      var ticket = $window.localStorage[W8LESS_PREFIX+queue.sourceQueue];
      if (ticket){
        return JSON.parse(ticket);
      }
      return null;
    };

    return {
      createTicket: createTicket,
      getTickets: getTickets,
      deleteTicket: deleteTicket,
    };

}
})();