app.directive('compCoffeeMachine', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();

		$timeout(function(){
			scope.slider = new Slider('#slider-' + scope.componentId, {
				formatter: function (value) {
					$('#coffeeStrength-' + scope.componentId).html('&nbsp;&nbsp;' + value);
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
		templateUrl: 'app/views/component/coffeeMachine.htm',
		link: link
	};
});