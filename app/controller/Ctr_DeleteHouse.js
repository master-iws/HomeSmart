'use strict';

app.controller('DeleteHouseController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance) {
	
	$scope.ok = function () {
		$rootScope.houses.splice($scope.deleteIdx,1);
	    $uibModalInstance.close();
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
}]);