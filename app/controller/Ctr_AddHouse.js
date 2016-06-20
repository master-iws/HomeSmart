'use strict';

app.controller('AddHouseController',["$scope", "$rootScope", "$state", "$stateParams",
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
                     "Hannover"
                     ,"Naila"];
	
	
	
	$scope.house = new Mod_House();
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIndex].push($scope.hous);
		 mainService.saveHouses($rootScope.houses);
    };
    
    $scope.cancel = function() {
    	$scope.house = new Mod_House();
   };
   
}]);