'use strict';

app.controller('WLANController',["$scope", "$rootScope", "$state","MainService",	
                                 function($scope, $rootScope, $state, mainService) {
	
	$rootScope.wlan = {};
	$scope.showPassword = false;
	$scope.inputType = 'password';
	
	$scope.wlan = {};
	$scope.wlan.ssid = $rootScope.houses[$rootScope.houseIndex].getWlan().ssid;
	$scope.wlan.password = $rootScope.houses[$rootScope.houseIndex].getWlan().password;
	
	$scope.cancel = function() {
		
		$scope.wlan = $rootScope.houses[$rootScope.houseIndex].getWlan();
    };
    
    $scope.hideShowPassword = function(){
    	if ($scope.inputType == 'password')
          $scope.inputType = 'text';
        else
          $scope.inputType = 'password';
      };
    
    $scope.statusChanged = function(){
    	
    	mainService.saveHouses($rootScope.houses);
    }
    
    $scope.save = function(){
    	$scope.wlan.status = $rootScope.houses[$rootScope.houseIndex].getWlan().status;
    	$rootScope.houses[$rootScope.houseIndex].setWlan($scope.wlan);
    	mainService.saveHouses($rootScope.houses);
    }
}]);
