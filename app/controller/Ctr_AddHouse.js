'use strict';

app.controller('AddHouseController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	$scope.house = {};
	$scope.house.name = "";
	$scope.house.city = "";
	$scope.house.floors = [];
	$scope.house.components = [];
	
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
	
	$scope.save = function() {
		//etagen anlegen
		 $rootScope.houses.push($scope.house);
		 $state.go("settings.houses");
    };
    
    $scope.cancel = function() {
		
    	 $state.go("settings.houses");
   };
   
}]);