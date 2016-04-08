angular.module('hr', ['ngRoute'])

	.config(function ($routeProvider) {
		$routeProvider.
			when('/hr/employee', {templateUrl: 'hr/tpl/list.tpl.html', controller: 'EmployeeListCtrl'}).
			when('/hr/employee/:id', {templateUrl: 'hr/tpl/details.tpl.html', controller: 'EmployeeDetailCtrl'}).
			when('/hr/employee_new', {templateUrl: 'hr/tpl/form.tpl.html', controller: 'EmployeeCreateCtrl'}).
			when('/hr/employee_remove/:id', {template: 'ok', controller: 'EmployeeRemoveCtrl'}).
			otherwise({redirectTo: '/hr/employee'});
	})

	.controller('EmployeeListCtrl', function ($scope, $http) {
		$http.get('/api/hr/employee').
			success(function (data, status, headers, config) {
				$scope.employee = data;
			});
	})

	.controller('EmployeeDetailCtrl', function ($scope, $routeParams, $http) {
		$http.get('/api/hr/employee/' + $routeParams.id).
			success(function (data, status, headers, config) {
				$scope.employee = data;
			});

		$scope.submit = function () {

			var newEmployee = {
				cin : $scope.employee.cin,
				nom : $scope.employee.nom,
				prenom : $scope.employee.prenom,
				genre : $scope.employee.genre,
				email : $scope.employee.email,
				date_nais : $scope.employee.date_nais,
				adresse : $scope.employee.adresse,
				tel : $scope.employee.tel	


			};

			$http.put('/api/hr/employee/' + $scope.employee._id, newEmployee).
				success(function (data, status, headers, config) {
					$scope.message = data.message;
				});
		};
	})

	.controller('EmployeeCreateCtrl', function ($scope, $routeParams, $http) {
		$scope.submit = function () {

			var newEmployee = {
				cin : $scope.cin,
				nom : $scope.nom,
				prenom : $scope.prenom,
				genre : $scope.genre,
				email : $scope.email,
				date_nais : $scope.date_nais,
				adresse : $scope.adresse,
				tel : $scope.tel	
			};

			$http.post('/api/hr/employee/', newEmployee).
				success(function (data, status, headers, config) {
					$scope.message = data.message;
				});

							
			$scope.cin = "";
			$scope.nom = "";
			$scope.prenom = "";
			$scope.genre = "";
			$scope.email = "";
			$scope.date_nais = "";
			$scope.adresse = "";
			$scope.tel = "";	



		};
	})

	.controller('EmployeeRemoveCtrl', function ($scope, $routeParams, $http, $location) {
		$http.delete('/api/hr/employee/' + $routeParams.id).
			success(function (data, status, headers, config) {
				//$scope.message = data.message;
				$location.path("/employee");
			});
	})
;