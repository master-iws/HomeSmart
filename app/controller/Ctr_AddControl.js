'use strict';

app.controller('AddQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,vibrator) {
	
	$scope.control = {roomId:'',componentId:''};
	
	$scope.save = function() {
		vibrator.vibrate(10);
		 $rootScope.houses[$rootScope.houseIndex].dashboard.controls.push($scope.control);
		 mainService.saveHouses($rootScope.houses);
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.dashboard");
   };
   
}]);