'use strict';

app.controller('AddHouseController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,vibrator) {
	$scope.cities = ["Berlin",
                     "München",
                     "Hamburg",
                     "Köln",
                     "Frankfurt am Main",
                     "Stuttgart",
                     "Düsseldorf",
                     "Dortmund",
                     "Essen",
                     "Bremen",
                     "Dresden",
                     "Leipzig",
                     "Hannover"
                     ,"Naila"];
	
	
	
	$scope.house = new Mod_House();
	$scope.floorCount=1;
	
	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.house.setId($rootScope.nextHouseId);
		$rootScope.nextHouseId++;
		for(var count=0; count < $scope.floorCount; count++)
		{
			$scope.floor = new Mod_Floor();
			$scope.house.addFloor($scope.floor);
		}
		
		 $rootScope.houses.push($scope.house);
		 mainService.saveHouses($rootScope.houses);
		 $state.go("settings.houses");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	$state.go("settings.houses");
   };
   
}]);