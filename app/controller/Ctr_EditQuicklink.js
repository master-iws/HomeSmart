'use strict';

app.controller('EditQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams","ComponentService","MainService",
                                      function($scope, $rootScope, $state, $stateParams,componentService,mainService) {
	
	$scope.quicklinkIdx = $stateParams.quicklinkId;
	$scope.types = [];
	$scope.typ;
	
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	
	$scope.quicklink = $rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks[$scope.quicklinkId];//auf rootScope setzen
	
	$scope.typ ;
	
	$scope.save = function() {
		$scope.quicklink.typ.id = $scope.typ.getId();
		$scope.quicklink.typ.name = $scope.typ.getName();
		 $rootScope.houses[$rootScope.houseIdx].getDashboard().quicklinks[$scope.quicklinkId] = $scope.quicklink;
		 mainService.saveHouses($rootScope.houses);
	};
    
    $scope.cancel = function() {
		
   };
   
   $scope.categoryChanged = function()
   {
	   if($scope.quicklink.category == 'Kategorie')
		   $scope.types = componentService.getCategorys();
	   else if($scope.quicklink.category == 'Etage')
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getFloors();
	   else
		   $scope.types = $rootScope.houses[$rootScope.houseIndex].getRooms();
   };
   
   $scope.getTyp = function()
   {
	   for(var t in $scope.types)
	   {
		   if($scope.types[t].getId() == $scope.quicklink.typ.id)
			   $scope.type = $scope.types[t];
	   }
   }
   
   //$scope.categoryChanged();
   //$scope.getTyp();
   
}]);