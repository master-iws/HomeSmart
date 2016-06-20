//'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state","MainService",
	function($scope, $rootScope, $state, mainService) {
		
		$rootScope.houseIndex = 0;
		$rootScope.loggedIn = true;
		
		$rootScope.houses = mainService.getHouses();
		
		var test = mainService.getHouses();
		console.log(JSON.stringify(test));
		console.log(JSON.stringify(test[0].getRooms()));
		mainService.saveHouses(test);
}]);
