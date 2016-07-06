app.directive('compShading', function($interval) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.timeoutId = null;
		
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/shading.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};

			$scope.down = function() {
				$interval.cancel($scope.timeoutId);
				var index = $scope.component.getSetSettings()[0];
				$scope.timeoutId = $interval(function() {
					if(index <= 10) {
						$scope.component.getSetSettings()[0] = index++;
					} else {
						$interval.cancel($scope.timeoutId);
					}
				}, 1000);
			};

			$scope.up = function() {
				$interval.cancel($scope.timeoutId);
				var index = $scope.component.getSetSettings()[0];
				$scope.timeoutId = $interval(function () {
					if (index >= 0) {
						$scope.component.getSetSettings()[0] = index--;
					} else {
						$interval.cancel($scope.timeoutId);
					}
				}, 1000);
			};

			$scope.stop = function() {
				$interval.cancel($scope.timeoutId);
			};

		}]
	};
});