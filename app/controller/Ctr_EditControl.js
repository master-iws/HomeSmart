'use strict';

app.controller('EditControlController',["$scope", "$rootScope", "$state", "$stateParams","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,vibrator) {
	
	$scope.originalControl = $rootScope.dashboard.controls[$stateParams.controlId];
	$scope.control = {};
	$scope.control.roomId = $scope.orginalControl.roomId;
	$scope.control.componentId = $scope.originalControl.componentId;	
	
	$scope.save = function() {
		vibrator.vibrate(10);
		 $rootScope.houses[$rootScope.houseIndex].dashboard.controls[$stateParams.controlId] = $scope.control;
		 mainService.saveHouses($rootScope.houses);
	};
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	$state.go("houseconfiguration.dashboard");
   };
}]);