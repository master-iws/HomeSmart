'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('InfoDialogController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,$uibModalInstance,mainService,vibrator) {
	
	$scope.ok = function () {
		$uibModalInstance.close();
	  };
	  
	  $scope.cancel = function () {
		  vibrator.vibrate(10);
	    $uibModalInstance.dismiss('cancel');
	  };
}]);