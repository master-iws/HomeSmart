'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('DeleteRoomController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance,mainService,vibrator) {
	
	$scope.ok = function () {
		vibrator.vibrate(10);
		$scope.room = $rootScope.houses[$rootScope.houseIndex].getRooms()[$scope.deleteIdx];  
		$scope.floorIdx = $scope.houses[$rootScope.houseIndex].getFloors().indexOf($scope.room.getFloor());
		$rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].getRooms().splice($scope.deleteIdx,1);
		mainService.saveHouses($rootScope.houses);
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
		  vibrator.vibrate(10);
	    $uibModalInstance.dismiss('cancel');
	  };
}]);