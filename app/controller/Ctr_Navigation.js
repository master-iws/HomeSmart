'use strict';

app.controller('NavigationController',	["$scope", "$rootScope", "$state","MainService",
                                      	 function($scope, $rootScope, $state, mainService) {
	
	
	$scope.notificationContainerShow = false;
	$rootScope.notifications = ['Spülmaschine fertig','Herd fertig'];

	$rootScope.$watch('houseIndex', function () {
	    console.log('change currentUser')
	    console.log($rootScope.houseIndex);
	  });
	
	$scope.showNotifications = function() {
		
		$scope.notificationContainerShow = !$scope.notificationContainerShow;
    };
    
    $scope.houseIndexChanged = function($index) {
		
		$rootScope.houseIndex = $index;
    };
    
    $scope.changeIndex = function() {
    	if($rootScope.houseIndex === 0)
    		$rootScope.houseIndex = 1;
    	else
    		$rootScope.houseIndex =0;
    	
    	console.log($rootScope.houseIndex);
    };
}]);
