
'use strict';

app.controller('CentralController',["$scope", "$rootScope", "$state","$uibModal","vibrator",
	function($scope, $rootScope, $state,$uibModal,vibrator) {

		$scope.allComponentsByCategory = $rootScope.houses[$rootScope.houseIndex].getAllComponentsByCategory();
}]);