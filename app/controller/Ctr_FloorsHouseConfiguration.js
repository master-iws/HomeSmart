'use strict';

app.controller('FloorsHouseConfigurationController',["$scope", "$rootScope", "$state","dragulaService","$uibModal",	
                                                     function($scope, $rootScope, $state,dragulaService,$uibModal) {
	
	$scope.deleteFloor = function($floorIdx) {
		
		$scope.deleteIdx = $floorIdx;
		
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteFloorDialog.htm',
		      controller: 'DeleteFloorController',
		      scope: $scope
		 });
    };
    
    $scope.addFloor = function() {
    	$state.go("houseconfiguration.floors.addFloor");
    };
    
    $scope.editFloor = function($floorIdx) {
    	$state.go("houseconfiguration.floors.editFloor",{'floorId':$floorIdx});
    };
}]);