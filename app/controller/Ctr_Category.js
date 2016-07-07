'use strict';

app.controller('CategoryController',["$scope", "$rootScope", "$state", "$stateParams","MainService",
                                      function($scope, $rootScope, $state, $stateParams,mainService) {

	mainService.saveHouses($rootScope.houses);
	
	$scope.categoryId = $stateParams.categoryId;
	$scope.allCategories = $rootScope.houses[$rootScope.houseIndex].getAllCategories();
	$scope.allComponentsByCategorySortByRoom = $rootScope.houses[$rootScope.houseIndex].getAllComponentsByCategorySortByRoom($scope.categoryId);

	$scope.showCategory = function($categoryIdx) {
		$state.go("categorys.detail", {'categoryId':$categoryIdx});
	};

	$scope.nextCategory = function($event) {
		var element = $event.toElement || $event.srcElement;
		if(shouldSwipe(element)) {
			var index = $rootScope.houses[$rootScope.houseIndex].getAllCategories().indexOf($rootScope.houses[$rootScope.houseIndex].getCategoryById($scope.categoryId));
			if ((index + 1) >= $scope.allCategories.length) {
				$state.go("categorys.detail", {'categoryId': (parseInt($scope.allCategories[0].getId()))});
			} else {
				$state.go("categorys.detail", {'categoryId': (parseInt($scope.allCategories[index + 1].getId()))});
			}
		}
	};
	
	$scope.prevCategory = function($event) {
		var element = $event.toElement || $event.srcElement;
		if(shouldSwipe(element)) {
			var index = $rootScope.houses[$rootScope.houseIndex].getAllCategories().indexOf($rootScope.houses[$rootScope.houseIndex].getCategoryById($scope.categoryId));
			if ((index - 1) >= 0) {
				$state.go("categorys.detail", {'categoryId': (parseInt($scope.allCategories[index - 1].getId()))});
			} else {
				$state.go("categorys.detail", {'categoryId': (parseInt($scope.allCategories[$scope.allCategories.length - 1].getId()))});
			}
		}
	};
	
	// $scope.heatingMode=1;
}]);