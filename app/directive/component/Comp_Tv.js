app.directive('compTv', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.sender = ['Das Erste', 'ZDF', 'RTL', 'SAT1', 'Pro7', 'DMAX'];
		scope.volume = scope.component.getSetSettings()[1];
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/tv.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};

			$scope.down = function() {
				if($scope.component.getSetSettings()[2] > 0) {
					$("#select-"+ $scope.componentId +" select").val($scope.component.getSetSettings()[2]--);
					$scope.component.getSetSettings()[2] = $scope.component.getSetSettings()[2]--;
				}
			};

			$scope.up = function() {
				if($scope.component.getSetSettings()[2] < $scope.sender.length-1) {
					$("#select-"+ $scope.componentId +" select").val($scope.component.getSetSettings()[2]++);
					$scope.component.getSetSettings()[2] = $scope.component.getSetSettings()[2]++;
				}
			};
			
			$scope.mute = function() {
				if($scope.component.getSetSettings()[1] == 0) {
					$("#mute-"+ $scope.componentId).css('background-color', 'white');
					$scope.component.getSetSettings()[1] = $scope.volume;
				} else {
					$scope.volume = $scope.component.getSetSettings()[1];
					$("#mute-"+ $scope.componentId).css('background-color', 'red');
					$scope.component.getSetSettings()[1] = 0;
				}
			};

		}]
	};
});