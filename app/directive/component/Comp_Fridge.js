app.directive('compFridge', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/fridge.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};
		}]
	};
});