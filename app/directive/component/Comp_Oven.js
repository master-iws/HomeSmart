app.directive('compOven', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.modus = ['Umluft', 'Oberhitze', 'Unterhitze', 'Ober/Unterhitze', 'Heißluft', 'Grill', 'Selbstreinigung'];

		$timeout(function() {

			if ((scope.component.getSetSettings()[0] == true) || (scope.component.getSetSettings()[0] == 1)) {

				if(scope.component.getSetSettings()[4] > 0) {
					$('#timeLeft-' + scope.componentId).html('<i class="fa fa-warning fa-lg fa-2x text-danger"></i>&nbsp;&nbsp;Verbleibende Zeit:&nbsp;&nbsp;' + scope.component.getSetSettings()[4] + '&nbsp;Minuten').show();
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
		templateUrl: 'app/views/component/oven.htm',
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
				$scope.component.getSetSettings()[4] = $scope.component.getSetSettings()[3];
				$('#timeLeft-' + $scope.componentId).html('<i class="fa fa-warning fa-lg fa-2x text-danger"></i>&nbsp;&nbsp;Verbleibende Zeit:&nbsp;&nbsp;' + $scope.component.getSetSettings()[4] + '&nbsp;Minuten').show();
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