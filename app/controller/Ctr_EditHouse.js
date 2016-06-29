'use strict';

app.controller('EditHouseController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
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
    $scope.house.setId($rootScope.houses[$rootScope.houseIndex].getId());
    $scope.house.setName($rootScope.houses[$rootScope.houseIndex].getName());
    $scope.house.setCity($rootScope.houses[$rootScope.houseIndex].getCity());
    $scope.house.setZip($rootScope.houses[$rootScope.houseIndex].getZip());
    $scope.house.components = $rootScope.houses[$rootScope.houseIndex].components;
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIndex] = $scope.house;
		 mainService.saveHouses($rootScope.houses);
    };
    
    $scope.cancel = function() {
    	$scope.house ={};// = $rootScope.houses[$rootScope.houseIndex];
    	$scope.house.name = $rootScope.houses[$rootScope.houseIndex].name;
    	$scope.house.city = $rootScope.houses[$rootScope.houseIndex].city;
    	$scope.house.components = $rootScope.houses[$rootScope.houseIndex].components;
   };
   
}]);