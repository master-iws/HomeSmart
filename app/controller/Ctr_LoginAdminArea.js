'use strict';

app.controller('LoginAdminAreaController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.validationMessage = null;
	$scope.adminPin;
	
	$scope.login = function() {
		//pin auslesen
		if($scope.adminPin == $rootScope.adminPin)
        {
			//richtigen state setzen
        	$state.go("index");
        }
        else
        	$scope.validationMessage = "Admin PIN falsch.";
    };
}]);
