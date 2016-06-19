//'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state","MainService",
	function($scope, $rootScope, $state, mainService) {
		$rootScope.houses = [];
		$rootScope.houses.push({"name": "test", "city": "95119 Naila"});
		$rootScope.houses.push({"name": "test1", "city": "95119 Naila"});
		$rootScope.houseIndex = $rootScope.houses.length-1;
		$rootScope.loggedIn = true;
		
		var test = mainService.getHouses();
		console.log(JSON.stringify(test));
		mainService.saveHouses(test);
}]);
