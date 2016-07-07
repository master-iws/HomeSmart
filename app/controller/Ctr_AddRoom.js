'use strict';

/**
 * @author Julia Thüroff
 */
app.controller('AddRoomController',["$scope", "$rootScope", "$state", "$stateParams", "fileReader","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams, fileReader, mainService,vibrator) {
	mainService.saveHouses($rootScope.houses);
	
	$scope.room = new Mod_Room();
	$scope.room.setIcon(undefined);

	$scope.save = function() {
		vibrator.vibrate(10);
		 $scope.room.setId($rootScope.nextRoomId);
		 $rootScope.nextRoomId++;
		 $scope.floorIdx = $rootScope.houses[$rootScope.houseIndex].getFloors().indexOf($scope.room.getFloor());
		 $rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].addRoom($scope.room);
		 mainService.saveHouses($rootScope.houses);
		 $state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	 $state.go("houseconfiguration.rooms");
   };
   
   

   $scope.getFile = function () {

       fileReader.readAsDataUrl($scope.file, $scope)
          .then(function(result) {
              $scope.room.setIcon( result);
              $rootScope.houses[$rootScope.houseIndex].getFloors()[0].getRooms()[0].setIcon(result);
              mainService.saveHouses($rootScope.houses);
           });
   };
   
}]);