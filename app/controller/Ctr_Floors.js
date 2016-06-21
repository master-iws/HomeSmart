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
    
    $scope.lightOff = function($floorIdx) {
    	$rootScope.houses[$rootScope.houseIndex].getFloors()[$floorIdx].setLight(0);
    };	
    
    $scope.consumerOff = function($floorIdx) {
    	$rootScope.houses[$rootScope.houseIndex].getFloors()[$floorIdx].setConsumer(0);
    };	
	
    $scope.setShadowing = function($floorIdx, $value) {
    	$rootScope.houses[$rootScope.houseIndex].getFloors()[$floorIdx].setShadowing($value);
    };
    
    $scope.addFloor = function() {
    	
    	$state.go("houseconfiguration.floors.addFloor");
    };
    
    $scope.configureHouse = function($floorIdx) {
    	
    	$state.go("houseconfiguration.floors.editFloor",{floorIdx: $floorIdx});
    };
}]);