app.directive('compCanvas', function($interval) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/canvas.htm',
		link: link,
		controller: ['$scope', function($scope) {
			var timeoutId;

			$scope.down = function() {
				$interval.cancel(timeoutId);
				var index = $scope.component.getSetSettings()[0];
				timeoutId = $interval(function() {
					if(index <= 10) {
						$scope.component.getSetSettings()[0] = index++;
					} else {
						$interval.cancel(timeoutId);
					}
				}, 1000);
			};

			$scope.up = function() {
				$interval.cancel(timeoutId);
				var index = $scope.component.getSetSettings()[0];
				timeoutId = $interval(function () {
					if (index >= 0) {
						$scope.component.getSetSettings()[0] = index--;
					} else {
						$interval.cancel(timeoutId);
					}
				}, 1000);
			};

			$scope.stop = function() {
				$interval.cancel(timeoutId);
			};

		}]
	};
});