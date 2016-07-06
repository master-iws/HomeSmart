
'use strict';

app.controller('CategorysController',["$scope", "$rootScope", "$state","$uibModal","vibrator",
	function($scope, $rootScope, $state,$uibModal,vibrator) {

		$scope.showCategory = function($categoryIdx) {
			$state.go("categorys.detail", {'categoryId':$categoryIdx});
		};
}]);