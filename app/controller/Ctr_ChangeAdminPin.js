'use strict';

app.controller('RegistrationController',["$scope", "$rootScope", "$state", "MainService",	
                                         function($scope, $rootScope, $state, mainService) {
	
	$scope.oldPin;
	$scope.pin;
	$scope.confirmPin;
	$scope.validationMessage = null;

	$scope.changeAdminPin = function() {
		
		if($scope.oldPin === $rootScope.globalSettings.getAdminPin())
        {
			$rootScope.globalSettings.setAdminPin($scope.pin);
			mainService.saveSettings($rootScope.globalSettings);
			$scope.validationMessage ="PIN wurde geändert.";
        }
        else
        	$scope.validationMessage = "Alter PIN ist falsch.";
    };
}]);