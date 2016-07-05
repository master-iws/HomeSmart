app.directive('compLightEffect', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();

		$timeout(function() {
			var input = $('#color-' + scope.componentId);
			input.css('background-color', scope.component.getSetSettings()[1]).css('color', scope.component.getSetSettings()[1]);
		});
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/lightEffect.htm',
		link: link,
		controller: ['$scope', function($scope) {

			$scope.$watch('component.getSetSettings()[1]', function(){
				var input = $('#color-' + $scope.componentId);
				input.css('background-color', $scope.component.getSetSettings()[1]).css('color', $scope.component.getSetSettings()[1]);
			});
		}]
	};
});