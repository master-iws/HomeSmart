app.directive('compLightNormal', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();

		console.log('WERT: '+scope.component.getSetSettings()[0]);
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/lightNormal.htm',
		link: link
	};
});