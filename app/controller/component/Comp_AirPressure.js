app.directive('compAirPressure', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.id;
		scope.componentName = scope.component.name;
		
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/airPressure.htm',
		link: link
	};
});