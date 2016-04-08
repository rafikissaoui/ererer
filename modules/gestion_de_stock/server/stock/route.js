var express = require('express');
var Stock = require('./stock');

module.exports.init = function () {

	var routerApi = express.Router();

	// middleware to use for all requests
	routerApi.use(function (req, res, next) {
		console.log('Somebody uses our API !');
		next();
	});

	// POST NEW ITEM http://localhost:8080/api/wh/stock
	routerApi.route('/wh/stock').post(function (req, res) {

		var stock = new Stock();
		
		stock.nom = req.body.nom;
		stock.quantite = req.body.quantite;


	
		stock.save(function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'employée créer!' });
		});

	});

	// GET ALL ITEMS http://localhost:8080/api/wh/stock
	routerApi.route('/wh/stock').get(function (req, res) {
		Stock.find(function (err, stock) {
			if (err) {
				res.send(err);
			}
			res.json(stock);
		});
	});

	// GET ONE ITEM http://localhost:8080/stock/:stock_id
	routerApi.route('/wh/stock/:stock_id').get(function (req, res) {
		Stock.findById(req.params.stock_id, function (err, stock) {
			if (err) {
				res.send(err);
			}
			res.json(stock);
		});
	});

	// PUT UPDATE ONE ITEM http://localhost:8080/api/stock/:stock_id
	routerApi.route('/wh/stock/:stock_id').put(function (req, res) {

		Stock.findById(req.params.stock_id, function (err, stock) {
			if (err) {
				res.send(err);
			}
			
		stock.nom = req.body.nom;
		stock.quantite = req.body.quantite;


			stock.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'stock modifié!' });
			});

		});
	});

	//DELETE ONE ITEM http://localhost:8080/api/stock/:stock_id
	routerApi.route('/wh/stock/:stock_id').delete(function (req, res) {
		Stock.remove({
			_id: req.params.stock_id
		}, function (err, stock) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Suppression avec succée' });
		});
	});

	return routerApi;
};