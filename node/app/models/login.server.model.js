var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LoginSchema = new Schema({
    code: String
});

mongoose.model('Login', LoginSchema);