
'use strict';
/**
 * @author Matthias Jakob
 */
app.controller('CentralController',["$scope", "$rootScope", "$state","$uibModal","vibrator",
	function($scope, $rootScope, $state,$uibModal,vibrator) {

		$scope.allComponentsByCategory = $rootScope.houses[$rootScope.houseIndex].getAllHouseComponentsSortByCategory();
}]);