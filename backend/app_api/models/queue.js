var mongoose = require("mongoose");

var rouleauSchema = new mongoose.Schema({
    ticketPosition:{type: Number, required: true, "default":0},
});

var queueSchema = new mongoose.Schema({
    nom: {type: String, required: true},
    description: {type: String, required: true},
    customerPosition: {type: Number, required: true, default: 0},
    rouleau: {type: rouleauSchema, required: true, default: {ticketPosition:0}}
});

mongoose.model("queue", queueSchema);