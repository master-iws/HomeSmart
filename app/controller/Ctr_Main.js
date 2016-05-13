'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state",
	function($scope, $rootScope, $state) {
		$scope.greet = "It work's!";
		$scope.$state = $state;
}]);
