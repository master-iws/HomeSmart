'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('AddHouseController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,vibrator) {
	$scope.cities = ["10115 Berlin","10117 Berlin","10178 Berlin",
                     "80335 München",
                     "80336 München",
                     "80337 München",
                     "80469 München",
                     "21035 Hamburg",
                     "21037 Hamburg",
                     "22113 Hamburg",
                     "50667 Köln",
                     "50668 Köln",
                     "60308 Frankfurt am Main",
                     "70173 Stuttgart",
                     "40210 Düsseldorf",
                     "28195 Bremen"];
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.house = new Mod_House();
	$scope.floorCount=1;
	
	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.house.setId($rootScope.nextHouseId);
		$rootScope.nextHouseId++;
		for(var count=0; count < $scope.floorCount; count++)
		{
			$scope.floor = new Mod_Floor();
			$scope.floor.setId($rootScope.nextFloorId);
			$scope.floor.setHouse($scope.house);
			$rootScope.nextFloorId++;
			$scope.floor.setName("Etage_"+count);
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