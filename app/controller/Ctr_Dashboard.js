'use strict';

app.controller('DashboardController',["$scope", "$rootScope", "$state","dragulaService",	
                                      function($scope, $rootScope, $state,dragulaService) {
	   
	
	  $scope.showQuicklink = function($index) {
	    	
		  $quicklink = $rootScope.dashboard.quicklinks[$index];
		  if($quicklink.category() === 'Etage')
			  $state.go('floors.detail',{floorIdx: quicklink.typ});
		  else if($quicklink.category() === 'Raum')
			  $state.go('roomsfloors.detail',{roomIdx: quicklink.typ});
		  else if($quicklink.category() === 'Kategorie')
			  $state.go('categories.detail',{categoryIdx: quicklink.typ});
	   };
}]);