'use strict';

app.controller('ActivityController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.period = {};
	$scope.period.typ = "year";
	$scope.period.startDate = moment().startOf('year');
	
	$scope.showChart = false;
	
	$scope.start =  moment().subtract(7,'hour');
	
	$scope.lastActivitys = [];
	$scope.names = ['Anna','Max','Robert','Katrin'];
	$scope.doorType =['betreten','verlassen'];
	
	for(var i=0; i < 4; i++)
	{
		var activity = {};
		activity.ts = ($scope.start.add(1,'hour')).format('DD.MM.YYYY HH:mm.ss');
		activity.text = $scope.names[i] +" hat das Haus "+$scope.doorType[i%2]+".";
		$scope.lastActivitys.push(activity);
	}
	
	$scope.lastActivity =$scope.start.format('DD.MM.YYYY HH:mm.ss');
	
	$scope.nextTab = function()
	{
		$state.go("pv");
	}
	
	
    
		
}]);