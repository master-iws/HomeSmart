/**
 * @author Matthias Jakob
 */
app.directive('compCentral', function() {
	
	return {
		templateUrl: 'app/views/component/central.htm',
		controller: ['$scope', '$rootScope', 'vibrator', function($scope, $rootScope, vibrator) {

			$scope.lightOff = function() {
				vibrator.vibrate(1000);
				$rootScope.houses[$rootScope.houseIndex].setLight(0);
			};

			$scope.consumerOff = function() {
				vibrator.vibrate(1000);
				$rootScope.houses[$rootScope.houseIndex].setConsumer(0);
			};

			$scope.setShadowing = function($value) {
				vibrator.vibrate(1000);
				$rootScope.houses[$rootScope.houseIndex].setShadowing($value);
			};
		}]
	};
});