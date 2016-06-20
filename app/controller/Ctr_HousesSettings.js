'use strict';

app.controller('HousesSettingsController',["$scope", "$rootScope", "$state", "MainService",	
                                           function($scope, $rootScope, $state,mainService) {
	
	console.log(mainService.getHouses());
	$scope.houses = mainService.getHouses();
	/*$scope.houses = [];
	$scope.houses.push({"name": "test", "city": "95119 Naila"});
	$scope.houses.push({"name": "test1", "city": "95119 Naila"});
	$rootScope.houseIndex = $scope.houses.length-1;*/
	console.log("house-settings:"+$scope.houses);
	
	/*$scope.deleteHouse = function($houseIdx) {
		
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteHouseDialog.htm',
		      controller: 'DeleteHouseController',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });
    };
    
    $scope.addHouse = function() {
    	$state.go("settings.addHouse");
    };
    
    $scope.configureHouse = function($houseIdx) {
    	console.log($houseIdx);
    	$rootScope.houseIndex = $houseIdx;
    	$state.go("houseconfiguration.house");
    };*/
}]);