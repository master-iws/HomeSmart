'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('RegistrationController',["$scope", "$rootScope", "$state", "MainService","vibrator","$uibModal",	
                                         function($scope, $rootScope, $state, mainService,vibrator,$uibModal) {
	
	$scope.oldPin;
	$scope.pin;
	$scope.confirmPin;
	$scope.validationMessage = null;

	$scope.changeAdminPin = function() {
		vibrator.vibrate(10);
		if($scope.oldPin === $rootScope.globalSettings.getAdminPin())
        {
			$rootScope.globalSettings.setAdminPin($scope.pin);
			mainService.saveSettings($rootScope.globalSettings);
			
			var modalInstance = $uibModal.open({
			      animation: $scope.animationsEnabled,
			      templateUrl: 'app/views/dialog/infoDialog.htm',
			      controller: 'InfoDialogController',
			      scope: $scope
			    });
			
        }
        else{
        	vibrator.vibrate(1000);
        	$scope.validationMessage = "Alter PIN ist falsch.";
        }
    };
}]);