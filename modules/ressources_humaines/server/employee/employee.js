var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	cin:String,
	nom: String,
	prenom:String,
	genre:String,
	email:String,
	date_nais:Date,
	adresse:String,
	tel:String,
});

module.exports = mongoose.model('employee', employeeSchema);
