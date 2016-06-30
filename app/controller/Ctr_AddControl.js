'use strict';

app.controller('AddQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, mainService) {
	
	$scope.control = {roomId:'',componentId:''};
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIndex].dashboard.controls.push($scope.control);
		 mainService.saveHouses($rootScope.houses);
    };
    
    $scope.cancel = function() {
		$state.go("houseconfiguration.dashboard");
   };
   
}]);