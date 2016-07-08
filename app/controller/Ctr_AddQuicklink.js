'use strict';

/**
 * @author Julia Thüroff
 */
app.controller('AddQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams","ComponentService", "MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, componentService, mainService,vibrator) {
	
	$scope.types = [];
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	$scope.quicklink = {};
	$scope.quicklink.category='Kategorie';
	$scope.quicklink.typ={};
	$scope.quicklink.typ.id="";
	$scope.typ;
	
	$scope.types = componentService.getCategorys();
	
	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.quicklink.typ = {};
		console.log($scope.typ.getId());
		$scope.quicklink.typ.id = $scope.typ.getId();
		$scope.quicklink.typ.name = $scope.typ.getName();
		$rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks.push($scope.quicklink);
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.dashboard");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
		$state.go("houseconfiguration.dashboard");
   };
   
   $scope.categoryChanged = function()
   {
	   if($scope.quicklink.category == 'Kategorie')
		   $scope.types = componentService.getCategorys();
	   else if($scope.quicklink.category == 'Etage')
	   {
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getFloors();
	   }
	   else
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getRooms();
	   
	   $scope.quicklink.typ = $scope.types[0].getName();
   };
   
}]);