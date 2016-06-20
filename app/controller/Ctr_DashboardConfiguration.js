'use strict';

app.controller('DashboardConfigurationController',["$scope", "$rootScope", "$state","dragulaService",	function($scope, $rootScope, $state,dragulaService) {
	
	 dragulaService.options($scope, 'fifth-bag', {
	      copy: true
	    });
	
    $scope.editQuicklink = function($index) {
    	$state.go("houseconfiguration.dashboard.editQuicklink", {quicklinkId: $index});
    };
    
    $scope.addQuicklink = function() {
    	console.log("addQuicklink");
    	$state.go("houseconfiguration.dashboard.addQuicklink");
    };
    
    $scope.deleteQuicklink = function($houseIdx) {
    	//löschen
    };
    
    $scope.editControl = function($index) {
    	$state.go("houseconfiguration.dashboard.editControl", {quicklinkId: $index});
    };
    
    $scope.addControl = function() {
    	$state.go("houseconfiguration.dashboard.addControl");
    };
    
    $scope.deleteControl = function($houseIdx) {
    	//löschen
    };
    
    $scope.save = function() {
    	console.log($rootScope.dashboard.quicklinks);
    };
}]);