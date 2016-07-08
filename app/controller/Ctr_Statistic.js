'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('StatisticController',["$scope", "$rootScope", "$state","MainService"
                                 ,	function($scope, $rootScope, $state,mainService) {
	
	$scope.nextTab = function()
	{
		$state.go("pv");
	}
	
		
}]);