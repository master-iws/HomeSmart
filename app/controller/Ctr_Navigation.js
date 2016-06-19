'use strict';

app.controller('NavigationController',	["$scope", "$rootScope", "$state",
                                      	 function($scope, $rootScope, $state) {
	
	$scope.notificationContainerShow = false;
	$rootScope.notifications = ['test','test2'];

	
	$scope.showNotifications = function() {
		
		$scope.notificationContainerShow = !$scope.notificationContainerShow;
    };
}]);
