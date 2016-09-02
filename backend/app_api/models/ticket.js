// not used in mongoose, but good for documentation
var ticket = {
  number: {type: Number, required: true},
  creationDate: {type: Date, "default":Date.now},
  sourceQueue: {type: String, required: true},
  validationToken: {type: String, required: true}
};