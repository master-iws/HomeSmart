//'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state","MainService",
	function($scope, $rootScope, $state, mainService) {
		
		$rootScope.houseIndex = 0;
		$rootScope.loggedIn = true;
		
		$rootScope.houses = mainService.getHouses();
		
		$rootScope.dashboard = {};
		$rootScope.dashboard.quicklinks = [];
		$rootScope.dashboard.quicklinks.push({category: 'Raum', typ: 'wohnzimmer'},{category: 'Raum', typ: 'esszimmer'});
		$rootScope.dashboard.controls = [];
		
		var test = mainService.getHouses();
		mainService.saveHouses(test);
		
		$scope.configureHouse = function($houseIdx) {
	    	
	    	$rootScope.houseIndex = $houseIdx;
	    	$state.go("houseconfiguration.house");
	    };
	    
	    $scope.goStatistic = function($houseIdx) {
	    	
	    	$rootScope.houseIndex = $houseIdx;
	    	$state.go("house.statistic");
	    };
	    
	    $scope.selectHouse = function($houseIdx) {
	    	
	    	$rootScope.houseIndex = $houseIdx;
	    	$state.go("dashboard");
	    };
}]);
