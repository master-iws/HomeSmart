'use strict';

app.controller('DeleteQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","MainService",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance,mainService) {
	
	  $scope.ok = function () {
		$rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks.splice($scope.deleteIdx,1);
		mainService.saveHouses($rootScope.houses);
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
}]);