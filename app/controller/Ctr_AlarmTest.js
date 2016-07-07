
/**
 * @author Julia Thüroff
 */
app.controller('AlarmTestController', function($scope, $rootScope,ngToast, $state,$uibModal,ngAudio,vibrator) {
  
	//mainService.saveHouses($rootScope.houses);
	
   $scope.$on('washerReady', function(event, data) {
	   vibrator.vibrate(1000);
	   $scope.sound = ngAudio.play("app/sounds/notificationSound.mp3"); 
	   $scope.date = moment();
		$scope.notification = $scope.date.format("DD.MM.YYYY HH:mm")+': Spülmaschine fertig.'
		$rootScope.notifications.push($scope.notification);
   	 	ngToast.create({content:'Spülmaschine ist fertig', animation:'slide'});
   });
   
   $scope.$on('herdReady', function(event, data) {
	   vibrator.vibrate(1000);
	   $scope.sound = ngAudio.play("app/sounds/notificationSound.mp3"); 
	   $scope.date = moment();
		$scope.notification = $scope.date.format("DD.MM.YYYY HH:mm")+': Herd fertig.'
		$rootScope.notifications.push($scope.notification);
  	 	ngToast.create({content:'Herd ist fertig', animation:'slide'});
  });
   
   $scope.$on('washingmaschineReady', function(event, data) {
	   vibrator.vibrate(1000);
	   $scope.sound = ngAudio.play("app/sounds/notificationSound.mp3"); 
	   $scope.date = moment();
		$scope.notification = $scope.date.format("DD.MM.YYYY HH:mm")+': Waschmaschine fertig.'
		$rootScope.notifications.push($scope.notification);
  	 	ngToast.create({content:'Waschmaschine ist fertig', animation:'slide'});
  });
   
   $scope.$on('washingmaschineReady', function(event, data) {
	   vibrator.vibrate(1000);
	   $scope.sound = ngAudio.play("app/sounds/notificationSound.mp3"); 
	   $scope.date = moment();
		$scope.notification = $scope.date.format("DD.MM.YYYY HH:mm")+': Waschmaschine fertig.'
		$rootScope.notifications.push($scope.notification);
  	 	ngToast.create({content:'Waschmaschine ist fertig', animation:'slide'});
  });
   
   $scope.$on('frontDoor', function(event, data) {
	   vibrator.vibrate(1000);
	   $scope.sound = ngAudio.play("app/sounds/notificationSound.mp3"); 
	   var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/frontDoorDialog.htm',
		      controller: 'InfoDialogController',
		      scope: $scope
		    });
  });
   
   $scope.$on('cameraOutside', function(event, data) {
	   vibrator.vibrate(1000);
	   $scope.sound = ngAudio.play("app/sounds/notificationSound.mp3"); 
	   var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/cameraOutsideDialog.htm',
		      controller: 'InfoDialogController',
		      scope: $scope
		    });
  });
   
   $scope.$on('cameraInside', function(event, data) {
	   vibrator.vibrate(1000);
	   $scope.sound = ngAudio.play("app/sounds/notificationSound.mp3"); 
	   var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'app/views/dialog/cameraInsideDialog.htm',
		      controller: 'InfoDialogController',
		      scope: $scope
		    });
  });
	
});
