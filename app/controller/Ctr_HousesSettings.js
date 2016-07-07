'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('HousesSettingsController',["$scope", "$rootScope", "$state", "$uibModal","MainService",	
                                           function($scope, $rootScope, $state,$uibModal,mainService) {
	
	mainService.saveHouses($rootScope.houses);
	
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