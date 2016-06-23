'use strict';

app.controller('FloorsHouseConfigurationController',["$scope", "$rootScope", "$state","dragulaService","$uibModal","MainService",	
                                                     function($scope, $rootScope, $state,dragulaService,$uibModal, mainService) {
	
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
    	console.log($rootScope.houses[$rootScope.houseIndex].getFloors()[0].toJSON());
    	mainService.saveHouses($rootScope.houses);
      });
    
    $scope.addFloor = function() {
    	$state.go("houseconfiguration.floors.addFloor");
    };
    
    $scope.editFloor = function($floorIdx) {
    	$state.go("houseconfiguration.floors.editFloor",{'floorId':$floorIdx});
    };
}]);