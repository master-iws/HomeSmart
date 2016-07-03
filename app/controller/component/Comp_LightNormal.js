app.directive('compBathtub', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.id;
		scope.componentName = scope.component.name;

		$timeout(function(){
			scope.slider = new Slider('#slider-' + scope.componentId, {
				formatter: function (value) {
					$('#ist-temp-' + scope.componentId).html('&nbsp;&nbsp;' + value + ' °C');
					return 'Gewünschte Temperatur: ' + value + ' °C';
				}
			});
		});
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/bathtub.htm',
		link: link
	};
});