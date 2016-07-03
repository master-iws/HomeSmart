'use strict';

app.controller('RegistrationController',["$scope", "$rootScope", "$state", "MainService","vibrator",	
                                         function($scope, $rootScope, $state, mainService,vibrator) {
	
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
			$scope.validationMessage ="PIN wurde geändert.";
        }
        else{
        	vibrator.vibrate(1000);
        	$scope.validationMessage = "Alter PIN ist falsch.";
        }
    };
}]);