module.exports.initDb = function () {

	var mongoose = require('mongoose');


	mongoose.connect('mongodb://mean-434:4y$Gg*F3)B@db-mean-434.nodechef.com:5392/mean?ssl=true');

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function () {
		console.log('ERP db opened');
	});
};