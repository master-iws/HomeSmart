'use strict';

app.controller('LoginAdminAreaController',["$scope", "$rootScope", "$state", "$stateParams",
                                           function($scope, $rootScope, $state, $stateParams) {
	$scope.validationMessage = null;
	$scope.adminPin;
	
	$scope.login = function() {
		//pin auslesen
		if($scope.adminPin == $rootScope.globalSettings.getAdminPin())//$rootScope.adminPin)
        {
			console.log($rootScope.previousState);
			$rootScope.adminArea = true;
        	
        }
        else
        	$scope.validationMessage = "Admin PIN falsch.";
    };
}]);
