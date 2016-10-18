var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkStatisticSchema = new Schema({
    shortlink: String,
    count: Number,
    qrcode: Boolean,
});

mongoose.model('LinkStatistic', LinkStatisticSchema);