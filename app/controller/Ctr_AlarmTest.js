

app.controller('AlarmTestController', function($scope, $rootScope,ngToast, $state,$uibModal,ngAudio,vibrator) {
  
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
	
});
