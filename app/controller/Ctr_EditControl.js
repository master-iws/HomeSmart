'use strict';

app.controller('EditControlController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	
	$scope.originalControl = $rootScope.dashboard.controls[$stateParams.controlId];
	$scope.control = {};
	$scope.control.roomId = $scope.orginalControl.roomId;
	$scope.control.componentId = $scope.originalControl.componentId;	
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIndex].dashboard.controls[$stateParams.controlId] = $scope.control;
		 mainService.saveHouses($rootScope.houses);
	};
    
    $scope.cancel = function() {
    	$state.go("houseconfiguration.dashboard");
   };
}]);