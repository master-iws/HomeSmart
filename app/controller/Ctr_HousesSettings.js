'use strict';

app.controller('HousesSettingsController',["$scope", "$rootScope", "$state", "$uibModal",	
                                           function($scope, $rootScope, $state,$uibModal) {
	
	$scope.deleteHouse = function($houseIdx) {
		
		var size = 0;
		$scope.deleteIdx = $houseIdx;
		
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteHouseDialog.htm',
		      controller: 'DeleteHouseController',
		      scope: $scope
		});
    };
    
    $scope.addHouse = function() {
    	
    	$state.go("settings.addHouse");
    };
    
    $scope.configureHouse = function($houseIdx) {
    	
    	$rootScope.houseIndex = $houseIdx;
    	$state.go("houseconfiguration.house");
    };
}]);