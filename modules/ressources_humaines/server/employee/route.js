var express = require('express');
var Employee = require('./employee');

module.exports.init = function () {

	var routerApi = express.Router();

	// middleware to use for all requests
	routerApi.use(function (req, res, next) {
		console.log('Somebody uses our API !');
		next();
	});

	// POST NEW ITEM http://localhost:8080/api/employee
	routerApi.route('/hr/employee').post(function (req, res) {

		var employee = new Employee();
		employee.cin = req.body.cin;
		employee.nom = req.body.nom;
		employee.prenom = req.body.prenom;
		employee.genre = req.body.genre;
		employee.email = req.body.email;
		employee.date_nais = req.body.date_nais;
		employee.adresse = req.body.adresse;
		employee.tel = req.body.tel;


	
		employee.save(function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'employée créer!' });
		});

	});

	// GET ALL ITEMS http://localhost:8080/api/hr/employee
	routerApi.route('/hr/employee').get(function (req, res) {
		Employee.find(function (err, employee) {
			if (err) {
				res.send(err);
			}
			res.json(employee);
		});
	});

	// GET ONE ITEM http://localhost:8080/api/bears/:article_id
	routerApi.route('/hr/employee/:employee_id').get(function (req, res) {
		Employee.findById(req.params.employee_id, function (err, employee) {
			if (err) {
				res.send(err);
			}
			res.json(employee);
		});
	});

	// PUT UPDATE ONE ITEM http://localhost:8080/api/articles/:article_id
	routerApi.route('/hr/employee/:employee_id').put(function (req, res) {

		Employee.findById(req.params.employee_id, function (err, employee) {
			if (err) {
				res.send(err);
			}
			
			employee.cin = req.body.cin;
			employee.nom = req.body.nom;
			employee.prenom = req.body.prenom;
			employee.genre = req.body.genre;
			employee.email = req.body.email;
			employee.date_nais = req.body.date_nais;
			employee.adresse = req.body.adresse;
			employee.tel = req.body.tel;


			employee.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'employée modifié!' });
			});

		});
	});

	//DELETE ONE ITEM http://localhost:8080/api/articles/:article_id
	routerApi.route('/hr/employee/:employee_id').delete(function (req, res) {
		Employee.remove({
			_id: req.params.employee_id
		}, function (err, employee) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Suppression avec succée' });
		});
	});

	return routerApi;
};