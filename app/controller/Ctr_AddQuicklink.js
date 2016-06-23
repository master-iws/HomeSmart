'use strict';

app.controller('AddQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams","ComponentService", "MainService",
                                      function($scope, $rootScope, $state, $stateParams, componentService, mainService) {
	
	$scope.types = [];
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	$scope.quicklink = {};//auf rootScope setzen
	$scope.quicklink.category='Kategorie';
	$scope.quicklink.typ='';
	$scope.quicklink.name='';
	
	$scope.types = componentService.getCategorys();
	
	$scope.save = function() {
		
		$scope.quicklink.name = '';
		$rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks.push($scope.quicklink);
		mainService.saveHouses($rootScope.houses);
    };
    
    $scope.cancel = function() {
		$state.go("houseconfiguration.dashboard");
   };
   
   $scope.categoryChanged = function()
   {
	   console.log($rootScope.houses[$rootScope.houseIndex].getRooms());
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