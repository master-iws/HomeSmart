'use strict';

app.controller('WLANController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$rootScope.wlan = {};
	
	$scope.wlan = {};
	$scope.wlan.status = true;
	$scope.wlan.ssid = $rootScope.wlan.ssid;
	$scope.wlan.password = $rootScope.wlan.password;
	
	$scope.cancel = function() {
		$scope.wlan = $rootScope.wlan;
    };
    
    $scope.save = function(){
    	$rootScope.wlan = $scope.wlan;
    }
}]);
