'use strict';

app.controller('FloorsHouseConfigurationController',["$scope", "$rootScope", "$state","dragulaService",	function($scope, $rootScope, $state,dragulaService) {
	
	$scope.deleteFloor = function($floorIdx) {
		
		$scope.deleteIdx = $floorIdx;
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteFloorDialog.htm',
		      controller: 'DeleteFlorrController',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });
    };
    
    $scope.addFloor = function() {
    	$state.go("houseconfiguration.floors.addFloor");
    };
    
    $scope.editFloor = function($floorIdx) {
    	$state.go("houseconfiguration.floors.editFloor",{'floorId':$floorIdx});
    };
}]);