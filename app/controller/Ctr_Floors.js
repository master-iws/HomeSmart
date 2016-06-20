'use strict';

app.controller('FloorsController',["$scope", "$rootScope", "$state","dragulaService","$uibModal",	
                                                     function($scope, $rootScope, $state,dragulaService,$uibModal) {
    //$rootScope.houseIndex = 0;
	
    $scope.addFloor = function() {
    	$state.go("houseconfiguration.floors.addFloor");
    };
    
    $scope.editFloor = function($floorIdx) {
    	$state.go("houseconfiguration.floors.editFloor",{'floorId':$floorIdx});
    };
    
    $scope.changeIndex = function() {
    	if($rootScope.houseIndex === 0)
    		$rootScope.houseIndex = 1;
    	else
    		$rootScope.houseIndex =0;
    	
    	console.log($rootScope.houseIndex);
    };
}]);