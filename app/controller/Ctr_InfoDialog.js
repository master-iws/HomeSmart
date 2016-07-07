'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('InfoDialogController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance,mainService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	  $scope.ok = function () {
		$uibModalInstance.close();
	  };
}]);