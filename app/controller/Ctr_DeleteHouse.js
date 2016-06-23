'use strict';

app.controller('DeleteHouseController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance", "MainService",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance, mainService) {
	
	  $scope.ok = function () {
		$rootScope.houses.splice($scope.deleteIdx,1);
		mainService.saveHouses($rootScope.houses);
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
}]);