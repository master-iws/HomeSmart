'use strict';

app.controller('LandingController',
	["$scope", "$rootScope", "$state",
	function($scope, $rootScope, $state) {
		$scope.$parent.greet = "LandingController";
}]);
