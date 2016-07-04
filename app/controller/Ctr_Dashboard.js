'use strict';

app.controller('DashboardController',["$scope", "$rootScope", "$state","dragulaService",	
                                      function($scope, $rootScope, $state,dragulaService) {
	   
	
$scope.controls = [];
	
	for(var c  in $rootScope.houses[$rootScope.houseIndex].getDashboard().controls)
	{
		var control = $rootScope.houses[$rootScope.houseIndex].getDashboard().controls[c];
		
		var room = $rootScope.houses[$rootScope.houseIndex].getRoomById(control.roomId);
		var component = room.getComponentById(control.componentId);
		
		$scope.controls.push(component);
	}
	

	    $scope.quicklink = {};//auf rootScope setzen
		$scope.quicklink.category='Raum';
		$scope.quicklink.typ={};
		$scope.quicklink.typ.id = 0;
		$scope.quicklink.typ.name = "Küche";
		$rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks.push($scope.quicklink);
	
	  $scope.showQuicklink = function($index) {
	    	
		  $scope.quicklink = $rootScope.houses[$rootScope.houseIndex].getDashboard().quicklinks[$index];
		  if( $scope.quicklink.category === 'Etage')
			  $state.go('floors.detail',{floorId:  $scope.quicklink.typ.id});
		  else if( $scope.quicklink.category === 'Raum')
			  $state.go('rooms.detail',{roomId:  $scope.quicklink.typ.id});
		  else if( $scope.quicklink.category === 'Kategorie')
			  $state.go('categories.detail',{categoryId:  $scope.quicklink.typ.id});
	   };
}]);