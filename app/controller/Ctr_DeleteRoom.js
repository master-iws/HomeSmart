'use strict';

app.controller('DeleteFloorController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","MainService",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance,mainService) {
	
	  $scope.ok = function () {
		
		$scope.room = $rootScope.houses[$rootScope.houseIndex].getRooms()[$scope.deleteIdx];  
		$scope.floorIdx = $scope.houses[$rootScope.houseIndex].getFloors().indexOf($scope.room.getFloor();)
		$rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].getRooms().splice($scope.deleteIdx,1);
		mainService.saveHouses($rootScope.houses);
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
}]);