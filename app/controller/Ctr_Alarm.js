'use strict';

app.controller('AlarmController',["$scope", "$rootScope", "$state", "ngToast",	
                            function($scope, $rootScope, $state,ngToast) {
	
	$scope.$on('clearSelectedResident', function(event, data) {
        console.log('on');
		//$scope.template = 'list.html';
        //angular.copy({}, $scope.selectedResident);
    });
	
	 $scope.$on("washerReady", function(){
		 console.log("Spüle ferig");
			ngToast.create('Spülmaschine ist fertig');
	     });
	 
	
}]);