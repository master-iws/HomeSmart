app.directive('compBeamer', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.inputs = ['HDMI 1', 'HDMI 2', 'VGA', 'DVI'];
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/beamer.htm',
		link: link
	};
});