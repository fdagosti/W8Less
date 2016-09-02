var rest = require("restler");
var base = module.exports.base = "http://localhost:9876/api/";


module.exports.addQueue = function(name, desc, done){
  
  var queue = {nom: name, description: desc};
  rest.post(base+"queues", {data:queue})
  .on("success", function(data, response){
    done(data);
  }).on("fail", function(err, response){
    done.fail(err);
  });
};