'use strict';

app.controller('LoginController',["$scope", "$rootScope", "$state", "$stateParams",	function($scope, $rootScope, $state, $stateParams) {
	
	console.log($stateParams);
	
	$scope.validationMessage = null;
	$scope.userName;
	$scope.password;
	
	$scope.login = function() {
		
		if($scope.userName == "maxmustermann" && $scope.password == "test12")
        {
			$rootScope.loggedIn= true;
        	$state.go($stateParams.name);
        }
        else
        	$scope.validationMessage = "Login nicht erfolgreich. Benutzername oder Passwort falsch.";
    };
}]);
