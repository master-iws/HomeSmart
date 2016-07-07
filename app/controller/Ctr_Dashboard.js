'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('DashboardController',["$scope", "$rootScope", "$state","dragulaService","MainService",	
                                      function($scope, $rootScope, $state,dragulaService,mainService) {
	mainService.saveHouses($rootScope.houses);
	
	$scope.controls = [];
	console.log($rootScope.houses[$rootScope.houseIndex].getDashboard().controls)
	
	for(var c  in $rootScope.houses[$rootScope.houseIndex].getDashboard().controls)
	{
		var control = $rootScope.houses[$rootScope.houseIndex].getDashboard().controls[c];
		
		console.log(control);
		
		var room = $rootScope.houses[$rootScope.houseIndex].getRoomById(control.roomId);
		console.log(room);
		var component = room.getComponentById(control.componentId);
		console.log(component);
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