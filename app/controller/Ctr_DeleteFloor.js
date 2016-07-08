'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('DeleteFloorController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance,mainService,vibrator) {
	
	  $scope.ok = function () {
		  vibrator.vibrate(10);
		$rootScope.houses[$rootScope.houseIndex].getFloors().splice($scope.deleteIdx,1);
		mainService.saveHouses($rootScope.houses);
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
		  vibrator.vibrate(10);
	    $uibModalInstance.dismiss('cancel');
	  };
}]);