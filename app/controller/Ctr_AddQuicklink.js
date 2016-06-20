'use strict';

app.controller('AddQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {
	
	$scope.types = [];
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	$scope.quicklink = {category:'',typ:''};//auf rootScope setzen
	
	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].dashboard.quicklinks.push($scope.quicklink);
    };
    
    $scope.cancel = function() {
		$state.go("houseconfiguration.dashboard");
   };
   
   $scope.categoryChanged = function()
   {
	   console.log($rootScope.houses[$rootScope.houseIndex].getRooms());
	   if($scope.quicklink.category == 'Kategorie')
		   $scope.types = componentService.getCategories();
	   else if($scope.quicklink.category == 'Etage')
	   {
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getFloors();
	   }
	   else
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getRooms();
   };
   
}]);