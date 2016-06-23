'use strict';

app.controller('EditQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams","ComponentService","MainService",
                                      function($scope, $rootScope, $state, $stateParams,componentService,mainService) {
	
	$scope.types = [];
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	$scope.quicklink = $rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks[$stateParams.quicklinkId];//auf rootScope setzen
	$scope.categoryChanged();
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].getDashboard().quicklinks[$stateParams.quicklinkId] = $scope.quicklink;
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
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getFloors();
	   else
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getRooms();
   };
   
}]);