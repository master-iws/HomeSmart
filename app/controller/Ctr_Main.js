'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state",
	function($scope, $rootScope, $state) {
		$rootScope.houses = [];
		$rootScope.houses.push({"name": "test", "city": "95119 Naila"});
		$rootScope.houses.push({"name": "test1", "city": "95119 Naila"});
		$rootScope.houseIndex = $rootScope.houses.length-1;
		$rootScope.loggedIn = true;
}]);
