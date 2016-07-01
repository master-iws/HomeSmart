'use strict';

app.controller('NavigationController',	["$scope", "$rootScope", "$state","MainService",
                                      	 function($scope, $rootScope, $state, mainService) {
	
	
	$scope.notificationContainerShow = false;
	$scope.date = moment().subtract(1,'hour');
	$scope.notification = $scope.date.format("DD.MM.YYYY HH:mm")+': Spülmaschine fertig.'
	$rootScope.notifications = [];
	$rootScope.notifications.push($scope.notification);
	
	$scope.showNotifications = function() {
		
		$scope.notificationContainerShow = !$scope.notificationContainerShow;
    };
    
    $scope.houseIndexChanged = function($index) {
		
		$rootScope.houseIndex = $index;
    };
}]);
