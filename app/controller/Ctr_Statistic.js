'use strict';

app.controller('StatisticController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.nextTab = function()
	{
		$state.go("pv");
	}
	
		
}]);