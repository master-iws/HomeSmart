'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('FloorsController',["$scope", "$rootScope", "$state","dragulaService","$uibModal","vibrator","MainService",	
                                                     function($scope, $rootScope, $state,dragulaService,$uibModal,vibrator,mainService) {
    //$rootScope.houseIndex = 0;
	
	$scope.addFloor = function() {
    	$state.go("houseconfiguration.floors.addFloor");
    };
    
    $scope.editFloor = function($floorIdx) {
    	$state.go("houseconfiguration.floors.editFloor",{'floorId':$floorIdx});
    };
    
    $scope.lightOff = function($floorIdx) {
    	vibrator.vibrate(1000);
    	$rootScope.houses[$rootScope.houseIndex].getFloors()[$floorIdx].setLight(0);
    };	
    
    $scope.consumerOff = function($floorIdx) {
    	vibrator.vibrate(1000);
    	$rootScope.houses[$rootScope.houseIndex].getFloors()[$floorIdx].setConsumer(0);
    };	
	
    $scope.setShadowing = function($floorIdx, $value) {
    	vibrator.vibrate(1000);
    	$rootScope.houses[$rootScope.houseIndex].getFloors()[$floorIdx].setShadowing($value);
    };
    
    $scope.configureFloor = function($floorIdx) {
    	
    	$state.go("houseconfiguration.floors.editFloor",{floorId: $floorIdx});
    };
    
    $scope.goToRooms= function($floorId)
    {
    	console.log("Test")
    	$rootScope.floorId = $floorId;
    	$state.go("rooms");
    }
}]);