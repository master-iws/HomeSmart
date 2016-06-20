'use strict';

app.controller('NavigationController',	["$scope", "$rootScope", "$state","MainService",
                                      	 function($scope, $rootScope, $state, mainService) {
	
	var test = mainService.getHouses();
	console.log("navigation controller");
	console.log(test);
	$scope.houses = mainService.getHouses();
	
	$scope.notificationContainerShow = false;
	//$rootScope.notifications = ['test','test2'];

	
	$scope.showNotifications = function() {
		
		$scope.notificationContainerShow = !$scope.notificationContainerShow;
    };
}]);
