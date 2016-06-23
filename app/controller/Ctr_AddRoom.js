'use strict';


app.controller('AddRoomController',["$scope", "$rootScope", "$state", "$stateParams", "fileReader","MainService",
                                      function($scope, $rootScope, $state, $stateParams, fileReader, mainService) {
	$scope.room = new Mod_Room();
	$scope.room.setIcon(undefined);

	$scope.save = function() {
		
		 $rootScope.houses[$rootScope.houseIdx].floors[$stateParams.floorId].push($scope.room);
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