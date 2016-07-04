app.directive('compDishwasher', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.modus = 5;
		console.log("Komponente: "+scope.component.getSettings());
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/dishwasher.htm',
		link: link,
		controller: ['$scope', function($scope) {

			$scope.updateModus = function() {
				if($scope.modus > 0) {
					$('#start-' + $scope.componentId).prop('disabled', false);
				} else {
					$('#start-' + $scope.componentId).prop('disabled', true);
				}
			};

			$scope.start = function() {
				console.log("HALLO");

				$('#timeLeft-' + $scope.componentId).show();
			}

		}]
	};
});