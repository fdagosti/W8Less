var mongoose = require("mongoose");


var rouleauSchema = new mongoose.Schema({
    maxTicketNumber: {type: Number, required: true},
    ticketPosition:{type: Number, required: true, "default":0},
});

mongoose.model("rouleau", rouleauSchema);