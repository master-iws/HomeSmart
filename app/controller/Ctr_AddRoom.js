'use strict';


app.controller('AddRoomController',["$scope", "$rootScope", "$state", "$stateParams", "fileReader","MainService",
                                      function($scope, $rootScope, $state, $stateParams, fileReader, mainService) {
	$scope.room = new Mod_Room();
	$scope.room.setIcon(undefined);

	$scope.save = function() {

		 $scope.room.setId($rootScope.nextRoomId);
		 $rootScope.nextRoomId++;
		 $scope.floorIdx = $rootScope.houses[$rootScope.houseIndex].getFloors().indexOf($scope.room.getFloor());
		 $rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].addRoom($scope.room);
		 mainService.saveHouses($rootScope.houses);
		 $state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
		
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