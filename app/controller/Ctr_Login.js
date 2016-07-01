'use strict';

app.controller('LoginController',["$scope", "$rootScope", "$state", "$stateParams",	function($scope, $rootScope, $state, $stateParams) {
	
	$scope.validationMessage = null;
	$scope.userName;
	$scope.password;
	
	$scope.login = function() {
		
		/*if($scope.userName == $rootScope.globalSettings.getUser().name
				&& $scope.password == $rootScope.globalSettings.getUser().password)
        {*/
			$rootScope.loggedIn= true;
        	$state.go($stateParams.name);
        /*}
        else
        	$scope.validationMessage = "Login nicht erfolgreich. Benutzername oder Passwort falsch.";*/
    };
}]);
