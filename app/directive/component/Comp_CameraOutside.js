/**
 * @author Matthias Jakob
 */
app.controller('CameraOutsideDialogController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","vibrator",
	function($scope, $rootScope, $state, $stateParams,$uibModalInstance,vibrator) {

		$scope.cancel = function () {
			vibrator.vibrate(10);
			$uibModalInstance.dismiss('cancel');
		};
	}]
);

app.directive('compCameraOutside', function() {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/cameraOutside.htm',
		link: link,
		controller: ['$scope', '$uibModal', '$state', function($scope, $uibModal, $state) {

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};
			
			$scope.openView = function() {

				var modalInstance = $uibModal.open({
					animation: true,
					size: 'lg',
					templateUrl: 'app/views/dialog/cameraOutsideDialog.htm',
					controller: 'CameraOutsideDialogController',
					scope: $scope
				});
			};

		}]
	};
});