var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
	nom: String,
	quantite:String,
	
});

module.exports = mongoose.model('stock', stockSchema);
