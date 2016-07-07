'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('AddControlController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.control = {roomId:'',componentId:''};
	
	$scope.save = function() {
		vibrator.vibrate(10);
		$rootScope.houses[$rootScope.houseIndex].getDashboard().controls.push($scope.control);
		mainService.saveHouses($rootScope.houses);
		 $state.go("houseconfiguration.dashboard");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.dashboard");
   };
   
}]);