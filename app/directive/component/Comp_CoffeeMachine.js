app.directive('compCoffeeMachine', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.drinks = ['Kaffee', 'Cappuccino', 'Espresso', 'Milchkaffee'];

		$timeout(function() {
			$('#statusWait-' + $scope.componentId).hide();
			$('#statusDone-' + $scope.componentId).hide();
			if ((scope.component.getSetSettings()[0] == true) || (scope.component.getSetSettings()[0] == 1)) {
				$('#start-' + scope.componentId).prop('disabled', false);
				$('#select-' + scope.componentId).prop('disabled', false);
			} else {
				$('#start-' + scope.componentId).prop('disabled', true);
				$('#select-' + scope.componentId).prop('disabled', true);
			}
		})
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/coffeeMachine.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};

			$scope.$watch('component.getSetSettings()[0]', function() {
				$('#statusWait-' + $scope.componentId).hide();
				$('#statusDone-' + $scope.componentId).hide();
				if(($scope.component.getSetSettings()[0] == true) || ($scope.component.getSetSettings()[0] == 1)) {
					$('#start-' + $scope.componentId).prop('disabled', false);
					$('#select-' + $scope.componentId).prop('disabled', false);
				} else {
					$('#start-' + $scope.componentId).prop('disabled', true);
					$('#select-' + $scope.componentId).prop('disabled', true);
				}
			});

			$scope.startDrink = function() {
				$('#statusWait-' + $scope.componentId).show();
				$('#statusDone-' + $scope.componentId).hide();
				$('#start-' + $scope.componentId).prop('disabled', true);
				$('#select-' + $scope.componentId).prop('disabled', true);
				setTimeout(function()
					{
						$('#statusWait-' + $scope.componentId).hide();
						$('#statusDone-' + $scope.componentId).show();
						$('#start-' + $scope.componentId).prop('disabled', false);
						$('#select-' + $scope.componentId).prop('disabled', false);
					}, 5000);
			}

		}]
	};
});