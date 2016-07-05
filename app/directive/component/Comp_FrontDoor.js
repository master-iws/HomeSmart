app.controller('FrontDoorDialogController',["$scope", "$rootScope", "$state", "$stateParams","$uibModalInstance","vibrator","$timeout",
	function($scope, $rootScope, $state, $stateParams,$uibModalInstance,vibrator,$timeout) {

		$timeout(function() {
			if($scope.component.getSetSettings()[0] == 1) {
				$('#openDoor-'+$scope.componentId).prop('disabled', true);
				$('#openDoorModal-'+$scope.componentId).prop('disabled', true);
			}
			if($scope.talkStatus == 1) {
				$('#talkIconModal-'+$scope.componentId).removeClass('fa-microphone-slash').addClass('fa-microphone');
				$('#talkModal-'+$scope.componentId).removeClass('btn-default').addClass('btn-danger');
			} else {
				$('#talkIconModal-'+$scope.componentId).removeClass('fa-microphone').addClass('fa-microphone-slash');
				$('#talkModal-'+$scope.componentId).removeClass('btn-danger').addClass('btn-default');
			}
		});

		$scope.openDoorModal = function() {
			$scope.component.getSetSettings()[0] = 1;
			$('#openDoor-'+$scope.componentId).prop('disabled', true);
			$('#openDoorModal-'+$scope.componentId).prop('disabled', true);
		};

		$scope.talkModal = function() {
			if($scope.talkStatus == 0) {
				$scope.talkStatus = 1;
				$('#talkIconModal-'+$scope.componentId).removeClass('fa-microphone-slash').addClass('fa-microphone');
				$('#talkModal-'+$scope.componentId).removeClass('btn-default').addClass('btn-danger');
				$('#talkIcon-'+$scope.componentId).removeClass('fa-microphone-slash').addClass('fa-microphone');
				$('#talk-'+$scope.componentId).removeClass('btn-primary').addClass('btn-danger');
			} else {
				$scope.talkStatus = 0;
				$('#talkIconModal-'+$scope.componentId).removeClass('fa-microphone').addClass('fa-microphone-slash');
				$('#talkModal-'+$scope.componentId).removeClass('btn-danger').addClass('btn-default');
				$('#talkIcon-'+$scope.componentId).removeClass('fa-microphone').addClass('fa-microphone-slash');
				$('#talk-'+$scope.componentId).removeClass('btn-danger').addClass('btn-primary');
			}
		};

		$scope.cancel = function () {
			vibrator.vibrate(10);
			$uibModalInstance.dismiss('cancel');
		};
	}]
);

app.directive('compFrontDoor', function($timeout) {

	function link(scope, element, attrs) {

		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.talkStatus = 0;

		$timeout(function() {
			if(scope.component.getSetSettings()[0] == 1) {
				$('#openDoor-'+scope.componentId).prop('disabled', true);
				$('#openDoorModal-'+scope.componentId).prop('disabled', true);
			}
		});
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/frontDoor.htm',
		link: link,
		controller: ['$scope', '$uibModal', function($scope, $uibModal) {

			$scope.openView = function() {

				var modalInstance = $uibModal.open({
					animation: true,
					size: 'lg',
					templateUrl: 'app/views/dialog/frontDoorDialog.htm',
					controller: 'FrontDoorDialogController',
					scope: $scope
				});
			};

			$scope.openDoor = function() {
				$scope.component.getSetSettings()[0] = 1;
				$('#openDoor-'+$scope.componentId).prop('disabled', true);
			};

			$scope.talk = function() {
				if($scope.talkStatus == 0) {
					$scope.talkStatus = 1;
					$('#talkIcon-'+$scope.componentId).removeClass('fa-microphone-slash').addClass('fa-microphone');
					$('#talk-'+$scope.componentId).removeClass('btn-primary').addClass('btn-danger');
					$('#talkIconModal-'+$scope.componentId).removeClass('fa-microphone-slash').addClass('fa-microphone');
					$('#talkModal-'+$scope.componentId).removeClass('btn-default').addClass('btn-danger');
				} else {
					$scope.talkStatus = 0;
					$('#talkIcon-'+$scope.componentId).removeClass('fa-microphone').addClass('fa-microphone-slash');
					$('#talk-'+$scope.componentId).removeClass('btn-danger').addClass('btn-primary');
					$('#talkIconModal-'+$scope.componentId).removeClass('fa-microphone').addClass('fa-microphone-slash');
					$('#talkModal-'+$scope.componentId).removeClass('btn-danger').addClass('btn-default');
				}
			};

		}]
	};
});