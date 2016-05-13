'use strict';

app.controller('MainController',
	["$scope", "$rootScope", "$state",
	function($scope, $rootScope, $state) {
		$scope.greet = "It work's!";
		$scope.TITLE = "It work's!";
		
		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
			$scope.greet = "It work'sddd!";
			console.log(",,,");
		});
		
		setTimeout(function(){
			$state.go("floors");
			console.log("sdf");
		},3000);
}]);
