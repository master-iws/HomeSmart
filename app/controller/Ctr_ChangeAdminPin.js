'use strict';

app.controller('RegistrationController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.oldPin;
	$scope.pin;
	$scope.confirmPin;
	$scope.validationMessage = null;
	
	$scope.changeAdminPin = function() {
		
		if($scope.oldPin === $rootScope.globalSettings.getAdminPin())
        {
			$scope.validationMessage ="PIN wurde geändert.";
			//speichern
        }
        else
        	$scope.validationMessage = "Alter PIN ist falsch.";
    };
}]);