app.directive('compAlarmSystem', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/alarmSystem.htm',
		link: link,
		controller: ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};
			
			$scope.$watch('component.getSetSettings()[0]', function() {
				var change = $rootScope.houses[$rootScope.houseIndex].changeComponentsByAlarmSystemStatus($scope.component.getSetSettings()[0]);
			});
		}]
	};
});