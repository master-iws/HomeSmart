app.directive('compFactory', function($compile) {

	function getComponentTemplate (scope) {

		var type = scope.component.getType();
		var componentName = "";

		switch (type) {
			case 1:
				componentName = "light-normal";
			break;
			case 2:
				componentName = "light-dimmer";
				break;
			case 3:
				componentName = "light-effect";
				break;
			case 4:
				componentName = "light-complete";
				break;
			case 5:
				componentName = "cistern";
				break;
			case 6:
				componentName = "auto-mower";
				break;
			case 7:
				componentName = "sprinkler-system";
				break;
			case 8:
				componentName = "coffee-machine";
				break;
			case 9:
				componentName = "oven";
				break;
			case 10:
				componentName = "dishwasher";
				break;
			case 11:
				componentName = "fridge";
				break;
			case 12:
				componentName = "washing-machine";
				break;
			case 13:
				componentName = "dryer";
				break;
			case 14:
				componentName = "bathtub";
				break;
			case 15:
				componentName = "pool";
				break;
			case 16:
				componentName = "sauna";
				break;
			case 17:
				componentName = "photovoltaic-system";
				break;
			case 18:
				componentName = "tv";
				break;
			case 19:
				componentName = "beamer";
				break;
			case 20:
				componentName = "canvas";
				break;
			case 21:
				componentName = "consumer-active";
				break;
			case 22:
				componentName = "consumer-passive";
				break;
			case 23:
				componentName = "water-consumer";
				break;
			case 24:
				componentName = "temperature";
				break;
			case 25:
				componentName = "precipitation";
				break;
			case 26:
				componentName = "air-pressure";
				break;
			case 27:
				componentName = "wind-speed";
				break;
			case 28:
				componentName = "camera-inside";
				break;
			case 29:
				componentName = "camera-outside";
				break;
			case 30:
				componentName = "motion-detector-inside";
				break;
			case 31:
				componentName = "motion-detector-outside";
				break;
			case 32:
				componentName = "heating";
				break;
			case 33:
				componentName = "alarm-system";
				break;
			case 34:
				componentName = "smoke-detector";
				break;
			case 35:
				componentName = "garage";
				break;
			case 36:
				componentName = "window-contact";
				break;
			case 37:
				componentName = "front-door";
				break;
			case 38:
				componentName = "shading";
				break;
			case 39:
				componentName = "audio";
				break;

		}
		return "comp-" + componentName;
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		terminal: true,
		priority: 1000,
		link: function link(scope,element, attrs) {
			var newComponent = getComponentTemplate(scope);
			element.attr(newComponent, '');
			element.removeAttr("comp-factory");

			$compile(element)(scope);
		}
	};
});