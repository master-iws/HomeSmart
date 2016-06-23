'use strict';

app.controller('AddHouseController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, mainService) {
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
		
		for(var count=0; count < $scope.floorCount; count++)
		{
			$scope.floor = new Mod_Floor();
			$scope.house.addFloor($scope.floor);
		}
		
		 $rootScope.houses.push($scope.house);
		 console.log($scope.house.toJSON());
		 mainService.saveHouses($rootScope.houses);
		 $state.go("settings.houses");
    };
    
    $scope.cancel = function() {
    	$scope.house = new Mod_House();
   };
   
}]);