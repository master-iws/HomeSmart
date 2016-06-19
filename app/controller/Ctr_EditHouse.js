'use strict';

app.controller('EditHouseController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
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
                     "Hannover"];
	
	$scope.house ={};// = $rootScope.houses[$rootScope.houseIndex];
	$scope.house.name = $rootScope.houses[$rootScope.houseIndex].name;
	$scope.house.city = $rootScope.houses[$rootScope.houseIndex].city;
	$scope.house.components = $rootScope.houses[$rootScope.houseIndex].components;
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIndex] = $scope.house;
    };
    
    $scope.cancel = function() {
    	$scope.house ={};// = $rootScope.houses[$rootScope.houseIndex];
    	$scope.house.name = $rootScope.houses[$rootScope.houseIndex].name;
    	$scope.house.city = $rootScope.houses[$rootScope.houseIndex].city;
    	$scope.house.components = $rootScope.houses[$rootScope.houseIndex].components;
   };
   
}]);