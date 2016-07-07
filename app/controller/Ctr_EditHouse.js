'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('EditHouseController',["$scope", "$rootScope", "$state", "$stateParams", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, mainService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.cities = ["10115 Berlin","10117 Berlin","10178 Berlin",
                     "80335 München",
                     "80336 München",
                     "80337 München",
                     "80469 München",
                     "21035 Hamburg",
                     "21037 Hamburg",
                     "22113 Hamburg",
                     "50667 Köln",
                     "50668 Köln",
                     "60308 Frankfurt am Main",
                     "70173 Stuttgart",
                     "40210 Düsseldorf",
                     "28195 Bremen"];
	
	
	
	$scope.house = new Mod_House();
    $scope.house.setId($rootScope.houses[$rootScope.houseIndex].getId());
    $scope.house.setName($rootScope.houses[$rootScope.houseIndex].getName());
    $scope.house.setDescription($rootScope.houses[$rootScope.houseIndex].getDescription());
    $scope.house.setCity($rootScope.houses[$rootScope.houseIndex].getCity());
    $scope.house.setFloors($rootScope.houses[$rootScope.houseIndex].getFloors());
    //$scope.house.setZip($rootScope.houses[$rootScope.houseIndex].getZip());
    $scope.house.setComponents($rootScope.houses[$rootScope.houseIndex].getComponents());
	console.log($scope.house.getFloors());
    
	$scope.save = function() {
		vibrator.vibrate(10);
		$rootScope.houses[$rootScope.houseIndex].setName($scope.house.getName());
		$rootScope.houses[$rootScope.houseIndex].setCity($scope.house.getCity());
		$rootScope.houses[$rootScope.houseIndex].setDescription($scope.house.getDescription());
		mainService.saveHouses($rootScope.houses);
		
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/infoDialog.htm',
		      scope: $scope
		    });
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);

    	$scope.house = new Mod_House();
        $scope.house.setId($rootScope.houses[$rootScope.houseIndex].getId());
        $scope.house.setName($rootScope.houses[$rootScope.houseIndex].getName());
        $scope.house.setCity($rootScope.houses[$rootScope.houseIndex].getCity());
        $scope.house.setFloors($rootScope.houses[$rootScope.houseIndex].getFloors());
        //$scope.house.setZip($rootScope.houses[$rootScope.houseIndex].getZip());
        $scope.house.setComponents($rootScope.houses[$rootScope.houseIndex].getComponents());
   };
   
   $scope.addComponent = function() {
		$state.go("houseconfiguration.house.addComponent");
   };
   
   $scope.editComponent = function($index) {
		$state.go("houseconfiguration.house.editComponent",{componentIdx:$index});
  };
  
  $scope.deleteComponent = function($idx) {
	  $rootScope.houses[$rootScope.houseIndex].getComponents().splice($idx,1);
		mainService.saveHouses($rootScope.houses);
	    
};
   
}]);