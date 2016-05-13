'use strict';

app.controller('HousesController',
	["$scope", "$rootScope", "$state",
	function($scope, $rootScope, $state) {
		$scope.$parent.greet = "HousesController";
}]);
