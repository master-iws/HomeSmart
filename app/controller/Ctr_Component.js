'use strict';

app.controller('ComponentController',["$scope", "$rootScope", "$state", "$stateParams","MainService",
                                      function($scope, $rootScope, $state, $stateParams,mainService) {

	 $scope.configureComponent = function($componentId) {

		$state.go("houseconfiguration.house.editComponent", {'componentIdx':$componentId});
   };
   
}]);