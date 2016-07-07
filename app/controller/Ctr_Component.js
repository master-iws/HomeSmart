'use strict';

app.controller('ComponentController',["$scope", "$rootScope", "$state", "$stateParams","MainService",
                                      function($scope, $rootScope, $state, $stateParams,mainService) {

	mainService.saveHouses($rootScope.houses);
	
    $scope.configureComponent = function($componentId) {

		$state.go("houseconfiguration.house.editComponent", {'componentIdx':$componentId});
   };
   
}]);