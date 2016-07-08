'use strict';
/**
 * @author Julia Thüroff
 */
app.controller('EditRoomController',["$scope", "$rootScope", "$state", "$stateParams","fileReader","MainService","vibrator",
                                      function($scope, $rootScope, $state, $stateParams,fileReader,mainService,vibrator) {
	
	mainService.saveHouses($rootScope.houses);
	
	$scope.roomId = $stateParams.roomId;
	$scope.originalRoom = $rootScope.houses[$rootScope.houseIndex].getRoomById($scope.roomId);
	$scope.room = new Mod_Room();
	$scope.room.setId($scope.originalRoom.getId());
	$scope.room.setFloor($scope.originalRoom.getFloor());
	$scope.room.setName($scope.originalRoom.getName());
	$scope.room.setComponents($scope.originalRoom.getComponents());
	
	$scope.floorId = $scope.originalRoom.getFloor().getId();
	
	$scope.save = function() {
		
		console.log("Image:"+$scope.room.getIcon());
		
		vibrator.vibrate(10);
		$scope.floorIdx = $scope.houses[$rootScope.houseIndex].getFloors().indexOf($scope.room.getFloor());
		$scope.roomIdx = $rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].getRooms().indexOf($scope.originalRoom);
		$rootScope.houses[$rootScope.houseIndex].getFloors()[$scope.floorIdx].getRooms()[$scope.roomIdx] = $scope.room;
		mainService.saveHouses($rootScope.houses);
		$state.go("houseconfiguration.rooms");
    };
    
    $scope.cancel = function() {
    	vibrator.vibrate(10);
    	 
    };
    
    $scope.addComponent = function() {
		$state.go("houseconfiguration.rooms.addComponent",{roomId:$scope.roomId});
   };
   
   $scope.editComponent = function($id) {
		$state.go("houseconfiguration.rooms.editComponent",{componentId:$id});
  };
  
  $scope.getFile = function () {

      fileReader.readAsDataUrl($scope.file, $scope)
         .then(function(result) {
             $scope.room.setIcon( result);
             $rootScope.houses[$rootScope.houseIndex].getFloors()[0].getRooms()[0].setIcon(result);
             mainService.saveHouses($rootScope.houses);
          });
  };
  
  $scope.deleteComponent = function($idx) {
	  $scope.originalRoom.getComponents().splice($idx,1);
		mainService.saveHouses($rootScope.houses);
	    
};
   
}]);