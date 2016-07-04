'use strict';

app.controller('DashboardConfigurationController',["$scope", "$rootScope", "$state","dragulaService","$uibModal",	
                                                   function($scope, $rootScope, $state,dragulaService,$uibModal) {
	
	$scope.controls = [];
	
	for(var c  in $rootScope.houses[$rootScope.houseIndex].getDashboard().controls)
	{
		var control = $rootScope.houses[$rootScope.houseIndex].getDashboard().controls[c];
		
		var room = $rootScope.houses[$rootScope.houseIndex].getRoomById(control.roomId);
		var component = room.getComponentById(control.componentId);
		
		$scope.controls.push(component);
	}
	
	 dragulaService.options($scope, 'fifth-bag', {
	      copy: true
	 });
	 
	 $scope.deleteQuicklink = function($quicklinkIdx) {
			console.log("qucjlink");
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
			$scope.deleteIdx = $controlIdx;
			
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
    
    $scope.deleteQuicklink = function($quicklinkIdx) {
    	$scope.deleteIdx = $quicklinkIdx;
		
		var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/deleteQuicklinkDialog.htm',
		      controller: 'DeleteQuicklinkController',
		      scope: $scope
		 });
    };
    
    $scope.editControl = function($index) {
    	$state.go("houseconfiguration.dashboard.editControl", {controlId: $index});
    };
    
    $scope.addControl = function() {
    	$state.go("houseconfiguration.dashboard.addControl");
    };
   

}]);