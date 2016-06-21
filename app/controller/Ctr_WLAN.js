'use strict';

app.controller('WLANController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$rootScope.wlan = {};
	
	$scope.wlan = {};
	$scope.wlan.ssid = $rootScope.houses[$rootScope.houseIndex].getWlan().ssid;
	$scope.wlan.password = $rootScope.houses[$rootScope.houseIndex].getWlan().password;
	
	$scope.cancel = function() {
		$scope.wlan = $rootScope.wlan;
    };
    
    $scope.save = function(){
    	$rootScope.wlan = $scope.wlan;
    }
}]);
