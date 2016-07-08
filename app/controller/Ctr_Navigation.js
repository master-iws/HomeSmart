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
    
    $scope.houseIndexChanged = function() {
		console.log("Changed")
		if($state.includes('rooms.detail'))
			$state.go("rooms");
		else if($state.includes('floors.detail'))
			$state.go("floors");
		else if($state.includes('houseconfiguration.floors.addFloor'))
			$state.go("houseconfiguration.floors");
		else if($state.includes('houseconfiguration.floors.editFloor'))
			$state.go("houseconfiguration.floors");
		else if($state.includes('houseconfiguration.floors.addRoom'))
			$state.go("houseconfiguration.rooms");
		else if($state.includes('houseconfiguration.floors.editRoom'))
			$state.go("houseconfiguration.rooms");
		else if($state.includes('houseconfiguration.dashboard.addQuicklink'))
			$state.go("houseconfiguration.dashboard");
		else if($state.includes('houseconfiguration.dashboard.editQuicklink'))
			$state.go("houseconfiguration.dashboard");
		else if($state.includes('houseconfiguration.dashboard.addControl'))
			$state.go("houseconfiguration.dashboard");
		else if($state.includes('houseconfiguration.dashboard.editControl'))
			$state.go("houseconfiguration.dashboard");
		
    };
    
    $scope.closeAlert = function(index) {
        $scope.notifications.splice(index, 1);
      };
}]);
