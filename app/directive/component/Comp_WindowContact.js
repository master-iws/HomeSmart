/**
 * @author Matthias Jakob
 */
app.directive('compWindowContact', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();

		$timeout(function() {
			if(scope.component.getSetSettings()[0] == 0){
				$('#statusOpen-' + scope.componentId).show();
				$('#statusClose-' + scope.componentId).hide();
			} else {
				$('#statusOpen-' + scope.componentId).hide();
				$('#statusClose-' + scope.componentId).show();
			}
		})
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/windowContact.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};
		}]
	};
});