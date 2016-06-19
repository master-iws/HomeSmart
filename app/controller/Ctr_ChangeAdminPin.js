'use strict';

app.controller('RegistrationController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.oldPin;
	$scope.pin;
	$scope.confirmPin;
	
	$scope.changeAdminPin = function() {
		
		if($scope.oldPin === $rootScope.adminPin)
        {
			$scope.validationMessage ="PIN wurde geändert.";
        }
        else
        	$scope.validationMessage = "Alter PIN ist falsch.";
    };
}]);