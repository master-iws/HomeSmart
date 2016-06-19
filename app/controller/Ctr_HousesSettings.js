'use strict';

app.controller('HousesSettingsController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.deleteHouse = function($houseIdx) {
		
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
    };
}]);