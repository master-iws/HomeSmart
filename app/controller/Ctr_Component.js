'use strict';

app.controller('ComponentController',["$scope", "$rootScope", "$state", "$stateParams",
                                      function($scope, $rootScope, $state, $stateParams) {

    $scope.configureComponent = function($componentId) {

		$state.go("houseconfiguration.house.editComponent", {'componentIdx':$componentId});
   };
   
}]);