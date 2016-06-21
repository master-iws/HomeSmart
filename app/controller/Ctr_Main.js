//'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state","MainService",
	function($scope, $rootScope, $state, mainService) {
		
		$rootScope.houseIndex = 0;
		$rootScope.loggedIn = true;
		
		$rootScope.houses = mainService.getHouses();
		$rootScope.globalSettings = new Mod_GlobalSettings();
		$rootScope.globalSettings.setAdminPin("123456");
		$rootScope.globalSettings.setUser({name:'maxmustermann',password:'Test12'});
		
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
	    
	    $scope.lightOff = function() {
	    	$rootScope.houses[$rootScope.houseIndex].setLight(0);
	    };	
	    
	    $scope.consumerOff = function() {
	    	$rootScope.houses[$rootScope.houseIndex].setConsumer(0);
	    };	
		
	    $scope.setShadowing = function($value) {
	    	$rootScope.houses[$rootScope.houseIndex].setShadowing($value);
	    };
}]);
