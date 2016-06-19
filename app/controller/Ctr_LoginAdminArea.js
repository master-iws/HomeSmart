'use strict';

app.controller('LoginAdminAreaController',["$scope", "$rootScope", "$state", "$stateParams",
                                           function($scope, $rootScope, $state, $stateParams) {
	console.log($stateParams.name);
	$scope.validationMessage = null;
	$scope.adminPin;
	
	$scope.login = function() {
		//pin auslesen
		/*if($scope.adminPin == "Test12")//$rootScope.adminPin)
        {
			*///richtigen state setzen
        	$state.go($stateParams.name);
       /* }
        else
        	$scope.validationMessage = "Admin PIN falsch.";*/
    };
}]);
