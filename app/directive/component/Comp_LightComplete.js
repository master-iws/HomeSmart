app.directive('compLightComplete', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();

		$timeout(function() {
			var input = $('#color-' + scope.componentId);
			input.css('background-color', scope.component.getSetSettings()[2]).css('color', scope.component.getSetSettings()[2]);
		});
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/lightComplete.htm',
		link: link,
		controller: ['$scope', function($scope) {

			$scope.$watch('component.getSetSettings()[2]', function(){
				var input = $('#color-' + $scope.componentId);
				input.css('background-color', $scope.component.getSetSettings()[2]).css('color', $scope.component.getSetSettings()[2]);
			});
		}]
	};
});