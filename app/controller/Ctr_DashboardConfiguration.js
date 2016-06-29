'use strict';

app.controller('DashboardConfigurationController',["$scope", "$rootScope", "$state","dragulaService",	function($scope, $rootScope, $state,dragulaService) {
	
	 dragulaService.options($scope, 'fifth-bag', {
	      copy: true
	 });
	 
	 $scope.deleteQuicklink = function($quicklinkIdx) {
			
			var size = 0;
			$scope.deleteIdx = $quicklinkIdx;
			
			var modalInstance = $uibModal.open({
			      animation: $scope.animationsEnabled,
			      templateUrl: 'app/views/dialog/deleteQuicklinkDialog.htm',
			      controller: 'DeleteQuicklinkController',
			      scope: $scope
			});
	    };
	    
 $scope.deleteControl = function($controlIdx) {
			
			var size = 0;
			$scope.deleteIdx = $quicklinkIdx;
			
			var modalInstance = $uibModal.open({
			      animation: $scope.animationsEnabled,
			      templateUrl: 'app/views/dialog/deleteControlDialog.htm',
			      controller: 'DeleteControlController',
			      scope: $scope
			});
	    };
	 
	 $scope.$on("first-bag.drop-model", function (e, el) {
	    	mainService.saveHouses($rootScope.houses);
	 });
	 
	 $scope.$on("second-bag.drop-model", function (e, el) {
	    	mainService.saveHouses($rootScope.houses);
	      });
	
    $scope.editQuicklink = function($index) {
    	$state.go("houseconfiguration.dashboard.editQuicklink", {quicklinkId: $index});
    };
    
    $scope.addQuicklink = function() {
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

}]);