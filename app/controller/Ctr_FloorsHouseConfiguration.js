'use strict';

/**
 * @author Julia Thüroff
 */app.controller('FloorsHouseConfigurationController',["$scope", "$rootScope", "$state","dragulaService","$uibModal","MainService",	
                                                     function($scope, $rootScope, $state,dragulaService,$uibModal, mainService) {
	
	 mainService.saveHouses($rootScope.houses);
	 
	$scope.deleteFloor = function($floorIdx) {
		
		$scope.deleteIdx = $floorIdx;
		
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteFloorDialog.htm',
		      controller: 'DeleteFloorController',
		      scope: $scope
		 });
    };
    
    $scope.$on("first-bag.drop-model", function (e, el) {
    	mainService.saveHouses($rootScope.houses);
      });
    
    $scope.addFloor = function() {
    	$state.go("houseconfiguration.floors.addFloor");
    };
    
    $scope.editFloor = function($floorIdx) {
    	$state.go("houseconfiguration.floors.editFloor",{'floorId':$floorIdx});
    };
    
    $scope.editRooms = function() {
    	$state.go("houseconfiguration.rooms");
    };
}]);