'use strict';

app.controller('DashboardController',["$scope", "$rootScope", "$state","dragulaService",	
                                      function($scope, $rootScope, $state,dragulaService) {
	console.log($rootScope.dashboard);
}]);