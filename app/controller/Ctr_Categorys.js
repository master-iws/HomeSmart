
'use strict';

app.controller('CategorysController',["$scope", "$rootScope", "$state","$uibModal","vibrator","MainService",
	function($scope, $rootScope, $state,$uibModal,vibrator,mainService) {

		$scope.showCategory = function($categoryIdx) {
			$state.go("categorys.detail", {'categoryId':$categoryIdx});
		};
}]);