angular.module('wh', ['ngRoute'])

	.config(function ($routeProvider) {
		$routeProvider.
			when('/wh/stock', {templateUrl: 'wh/tpl/list.tpl.html', controller: 'stockListCtrl'}).
			when('/wh/stock/:id', {templateUrl: 'wh/tpl/details.tpl.html', controller: 'stockDetailCtrl'}).
			when('/wh/stock_new', {templateUrl: 'wh/tpl/form.tpl.html', controller: 'stockCreateCtrl'}).
			when('/wh/stock_remove/:id', {template: 'ok', controller: 'stockRemoveCtrl'}).
			otherwise({redirectTo: '/wh/stock'});
	})

	.controller('stockListCtrl', function ($scope, $http) {
		$http.get('/api/wh/stock').
			success(function (data, status, headers, config) {
				$scope.stock = data;
			});
	})

	.controller('stockDetailCtrl', function ($scope, $routeParams, $http) {
		$http.get('/api/wh/stock/' + $routeParams.id).
			success(function (data, status, headers, config) {
				$scope.stock = data;
			});

		$scope.submit = function () {

			var newstock = {
				nom : $scope.stock.nom,
				quantite : $scope.stock.quantite,
				


			};

			$http.put('/api/wh/stock/' + $scope.stock._id, newstock).
				success(function (data, status, headers, config) {
					$scope.message = data.message;
				});
		};
	})

	.controller('stockCreateCtrl', function ($scope, $routeParams, $http) {
		$scope.submit = function () {

			var newstock = {
				nom : $scope.nom,
				quantite : $scope.quantite,
			};

			$http.post('/api/wh/stock/', newstock).
				success(function (data, status, headers, config) {
					$scope.message = data.message;
				});

							
			
			$scope.nom = "";
			$scope.quantite = "";
			



		};
	})

	.controller('stockRemoveCtrl', function ($scope, $routeParams, $http, $location) {
		$http.delete('/api/wh/stock/' + $routeParams.id).
			success(function (data, status, headers, config) {
				//$scope.message = data.message;
				$location.path("/stock");
			});
	})
;