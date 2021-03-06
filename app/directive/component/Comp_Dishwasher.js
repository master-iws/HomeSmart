/**
 * @author Matthias Jakob
 */
app.directive('compDishwasher', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.modus = ['Automatik', 'Hygiene-Funktion', 'Multi-Tab', 'Beschleunigung', 'Halbe Beladung'];

		$timeout(function() {

			if ((scope.component.getSetSettings()[0] == true) || (scope.component.getSetSettings()[0] == 1)) {

				if(scope.component.getSetSettings()[2] > 0) {
					$('#timeLeft-' + scope.componentId).show();
					$('#start-' + scope.componentId).prop('disabled', true);
					$('#select-' + scope.componentId).prop('disabled', true);
					$('#stop-' + scope.componentId).prop('disabled', false);
				} else {
					$('#timeLeft-' + scope.componentId).hide();
					$('#start-' + scope.componentId).prop('disabled', false);
					$('#select-' + scope.componentId).prop('disabled', false);
					$('#stop-' + scope.componentId).prop('disabled', true);
				}
			} else {
				$('#timeLeft-' + scope.componentId).hide();
				$('#select-' + scope.componentId).prop('disabled', true);
				$('#start-' + scope.componentId).prop('disabled', true);
				$('#stop-' + scope.componentId).prop('disabled', true);
			}
		})
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/dishwasher.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};

			$scope.$watch('component.getSetSettings()[0]', function() {
				if(($scope.component.getSetSettings()[0] == true) || ($scope.component.getSetSettings()[0] == 1)) {
					$('#timeLeft-' + $scope.componentId).hide();
					$('#start-' + $scope.componentId).prop('disabled', false);
					$('#select-' + $scope.componentId).prop('disabled', false);
					$('#stop-' + $scope.componentId).prop('disabled', true);
				} else {
					$('#timeLeft-' + $scope.componentId).hide();
					$('#start-' + $scope.componentId).prop('disabled', true);
					$('#select-' + $scope.componentId).prop('disabled', true);
					$('#stop-' + $scope.componentId).prop('disabled', true);
				}
			});

			$scope.start = function() {
				$scope.component.getSetSettings()[2] = 60;
				$('#timeLeft-' + $scope.componentId).show();
				$('#start-' + $scope.componentId).prop('disabled', true);
				$('#select-' + $scope.componentId).prop('disabled', true);
				$('#stop-' + $scope.componentId).prop('disabled', false);
			};

			$scope.stop = function() {
				$('#timeLeft-' + $scope.componentId).hide();
				$('#start-' + $scope.componentId).prop('disabled', false);
				$('#select-' + $scope.componentId).prop('disabled', false);
				$('#stop-' + $scope.componentId).prop('disabled', true);
			};

		}]
	};
});