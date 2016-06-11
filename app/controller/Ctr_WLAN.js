'use strict';

app.controller('WLANController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.wlan.ssid = $rootScope.wlan.ssid;
	$scope.wlan.password = $rootScope.wlan.password;
	
	$scope.cancel = function() {
		$scope.wlan = $rootScope.wlan;
    };
}]);
