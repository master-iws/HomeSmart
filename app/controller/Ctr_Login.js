'use strict';

app.controller('LoginController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.validationMessage = null;
	$scope.userName;
	$scope.password;
	
	$scope.login = function() {
		
		if($scope.userName == "maxmustermann" && $scope.password == "test12")
        {
			$rootScope.loggedIn= true;
        	$state.go("index");
        }
        else
        	$scope.validationMessage = "Login nicht erfolgreich. Benutzername oder Passwort falsch.";
    };
}]);
