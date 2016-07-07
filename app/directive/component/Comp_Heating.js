app.directive('compHeating', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		console.log("componentName: "+scope.componentId);
		
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/heating.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.modes = ['Autopilot','Manueller Betrieb'];
			
			
			$scope.configureHeatingAutopilot = function()
			{
				console.log("HEatingTest");
				$state.go("heatingAutopilot",{componentId:$scope.componentId});
			}
			
			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};
		}]
	};
});