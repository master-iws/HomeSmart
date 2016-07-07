//'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state","MainService",
	function($scope, $rootScope, $state, mainService) {
		
		$rootScope.houseIndex = 0;
		
		$rootScope.houses = mainService.getHouses();
		$rootScope.globalSettings = mainService.getSettings();
		mainService.saveSettings($rootScope.globalSettings);
		
		var test = mainService.getHouses();
		mainService.saveHouses(test);
		
		$scope.configureHouse = function($houseIdx) {
	    	
	    	$rootScope.houseIndex = $houseIdx;
	    	$state.go("houseconfiguration.house");
	    };
	    
	    $scope.goStatistic = function($houseIdx) {
	    	
	    	$rootScope.houseIndex = $houseIdx;
	    	$state.go("statistic");
	    };
	    
	    $scope.goPrevState = function() {
		$state.go($rootScope.previousState.name,$rootScope.previousState.params);
	    }

	    $scope.setNextIds = function() {
	    	$rootScope.nextHouseId = -1;
	    	$rootScope.nextFloorId = -1;
	    	$rootScope.nextRoomId = -1;
	    	$rootScope.nextComponentId = -1;
	    	
	    	for(h in $rootScope.houses)
	    	{
	    		var house = $rootScope.houses[h];
	    		if(house.getId() > $rootScope.nextHouseId)
	    			$rootScope.nextHouseId = house.getId();
	    		
	    		for(c in $rootScope.houses[h].getComponents())
	    		{
	    			var component = $rootScope.houses[h].getComponents()[c];
	    			if(component.getId() > $rootScope.nextComponentId)
	    				$rootScope.nextComponentId = component.getId();
	    		}
	    		
	    		for(f in $rootScope.houses[h].getFloors())
	    		{
	    			var floor = $rootScope.houses[h].getFloors()[f];
	    			
	    			if(floor.getId() > $rootScope.nextFloorId)
	    				$rootScope.nextFloorId = floor.getId();
	    			
	    			for(r in floor.getRooms())
	    			{
	    				var room = floor.getRooms()[r];
	    				
	    				if(room.getId() > $rootScope.nextRoomId)
	    					$rootScope.nextRoomId = room.getId();
	    				
	    				for(c in room.getComponents())
	    	    		{
	    	    			var component = room.getComponents()[c];
	    	    			if(component.getId() > $rootScope.nextComponentId)
	    	    				$rootScope.nextComponentId = component.getId();
	    	    		}
	    				
	    			}
	    		}
	    	}
	    	console.log($rootScope.nextHouseId++);
	    	$rootScope.nextFloorId++;
	    	$rootScope.nextRoomId++;
	    };
	    
		$scope.setNextIds();

	    
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
