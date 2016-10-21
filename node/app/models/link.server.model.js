var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
    shortlink: String,
    longlink: String,
});

mongoose.model('Link', LinkSchema);
