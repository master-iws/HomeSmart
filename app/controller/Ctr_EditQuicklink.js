'use strict';

app.controller('EditQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams","ComponentService",
                                      function($scope, $rootScope, $state, $stateParams,componentService) {
	
	$scope.types = [];
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	$scope.quicklink = $rootScope.dashboard.quicklinks[$stateParams.quicklinkId];//auf rootScope setzen
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].dashboard.quicklinks[$stateParams.quicklinkId] = $scope.quicklink;
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