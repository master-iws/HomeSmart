'use strict';

app.controller('CategorysController',["$scope", "$rootScope", "$state","dragulaService","$uibModal","ComponentService",	
                                                     function($scope, $rootScope, $state,dragulaService,$uibModal,componentService) {
    
	$scope.categorys = componentService.getCategorys();
}]);