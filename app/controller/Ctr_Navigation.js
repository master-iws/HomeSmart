'use strict';

app.controller('NavigationController',	["$scope", "$rootScope", "$state","MainService",
                                      	 function($scope, $rootScope, $state, mainService) {
	
	
	$scope.notificationContainerShow = false;
	$rootScope.notifications = ['Spülmaschine fertig','Herd fertig'];
	
	$scope.showNotifications = function() {
		
		$scope.notificationContainerShow = !$scope.notificationContainerShow;
    };
    
    $scope.houseIndexChanged = function($index) {
		
		$rootScope.houseIndex = $index;
    };
}]);
