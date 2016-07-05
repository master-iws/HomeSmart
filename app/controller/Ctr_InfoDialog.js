'use strict';

app.controller('InfoDialogController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance,mainService,vibrator) {
	
	  $scope.ok = function () {
		$uibModalInstance.close();
	  };
}]);