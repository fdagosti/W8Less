var rest = require("restler");

var ocr_url = "http://54.226.69.147";
var t;
var monitoring = false;
module.exports.enableCameraMonitoring = function(enable){
  if (monitoring != enable){
    monitoring = enable;
    if (monitoring){
      t = setInterval(function(){
        _pollCameraData();
      }, 5000);
    }else{
      clearInterval(t);
    }
  }
};

var _self_url;
var self_url = function(){
  if (!_self_url){
    _self_url = "http://127.0.0.1:" + require("../../app").settings["port"];
  }
  return _self_url;
}

var _pollCameraData = function(cb){

  rest.post(ocr_url+"/api/check")
  .on("success", function(cameraLed, response){
    rest.get(self_url()+"/api/queues")
    .on("success", function(queues, response){
      for (var i = 0; i < queues.length; i++) {
        if (queues[i].cameraControl){
          queues[i].customerPosition = cameraLed;
          rest.putJson(self_url()+"/api/queues/"+queues[i]._id, queues[i])
          .on("success", function(data, response){
            console.log("Camera position successfully pushed into queue "+queues[i]._id);
          }).on("fail", function(err, reponse){
            console.error(err);
          }); 
        }
      }
    }).on("fail", function(err, response){
      console.log("qeueus fail");
      console.error(err);
    });
  }).on("fail", function(err, response){
    console.log("CAMERA FAIL "+err);
    console.error(err);
  });

};