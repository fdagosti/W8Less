var mongoose = require("mongoose");

var rouleauSchema = new mongoose.Schema({
    ticketPosition:{type: Number, required: true, "default":1},
});

var queueSchema = new mongoose.Schema({
    nom: {type: String, required: true},
    description: {type: String, required: true},
    cameraControl: {type: Boolean, required: true, default: false},
    customerPosition: {type: Number, required: true, default: 0},
    rouleau: {type: rouleauSchema, required: true, default: {ticketPosition:1}},
    lastResetDate: {type: Date, required: true, default: Date.now}
});

mongoose.model("queue", queueSchema);