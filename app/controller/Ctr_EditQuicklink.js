'use strict';

app.controller('EditQuicklinkController',["$scope", "$rootScope", "$state", "$stateParams","ComponentService","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,componentService,mainService,vibrator) {
	
	$scope.quicklinkIdx = $stateParams.quicklinkId;
	
	$scope.types = [];
	$scope.categories = ['Kategorie', 'Etage', 'Raum'];
	

	$scope.originalQuicklink = $rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks[$scope.quicklinkIdx];//auf rootScope setzen
	
	
	$scope.quicklink = {};
	$scope.quicklink.category=$scope.originalQuicklink.category;
	$scope.quicklink.typ={};
	$scope.quicklink.typ.id=$scope.originalQuicklink.typ.id;
	$scope.quicklink.typ.name=$scope.originalQuicklink.typ.name;
	
	
	$scope.typ;
	
	$scope.save = function() {
		vibrator.vibrate(10);
		$scope.quicklink.typ.id = $scope.typ.getId();
		$scope.quicklink.typ.name = $scope.typ.getName();
		 $rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks[$scope.quicklinkIdx] = $scope.quicklink;
		 mainService.saveHouses($rootScope.houses);
		 $state.go("houseconfiguration.dashboard");
	};
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	$state.go("houseconfiguration.dashboard")
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
			   $scope.typ = $scope.types[t];
	   }
   }
   
   $scope.categoryChanged();
   $scope.getTyp();
   
}]);