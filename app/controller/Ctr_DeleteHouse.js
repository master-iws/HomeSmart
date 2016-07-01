'use strict';

app.controller('DeleteHouseController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance, mainService,vibrator) {
	
	  $scope.ok = function () {
		  vibrator.vibrate(10);
		$rootScope.houses.splice($scope.deleteIdx,1);
		mainService.saveHouses($rootScope.houses);
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
		  vibrator.vibrate(10);
	    $uibModalInstance.dismiss('cancel');
	  };
}]);