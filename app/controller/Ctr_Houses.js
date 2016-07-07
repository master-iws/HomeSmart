'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('HousesController',
	["$scope", "$rootScope", "$state","vibrator","MainService",
	 function($scope, $rootScope, $state,vibrator,mainService) {
		
		mainService.saveHouses($rootScope.houses);
		
		$scope.lightOff = function($houdeIdx) {
			vibrator.vibrate(1000);
	    	$rootScope.houses[$houseIdx].setLight(0);
	    };	
	    
	    $scope.consumerOff = function($houseIdx) {
	    	vibrator.vibrate(1000);
	    	$rootScope.houses[houseIdx].setConsumer(0);
	    };	
		
	    $scope.setShadowing = function($houseIdx, $value) {
	    	vibrator.vibrate(1000);
	    	$rootScope.houses[$houseIdx].setShadowing($value);
	    };
}]);
