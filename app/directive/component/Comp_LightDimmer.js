app.directive('compLightDimmer', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();

		scope.updateIstTemp = function ($event, value) {
			$('ist-temp-' + scope.componentId).html('&nbsp;&nbsp;' + value + ' %');
		};

	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/lightDimmer.htm',
		link: link,
		controller: ['$scope', function($scope) {

			$scope.updateIstTemp = function ($event, value) {
				$('ist-temp-' + $scope.componentId).html('&nbsp;&nbsp;' + value + ' %');
			};
		}]
	};
});