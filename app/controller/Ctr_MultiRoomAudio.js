'use strict';
/**
 * @author Matthias Jakob
 */
app.controller('MultiRoomAudioController',
	["$scope", "$rootScope", "$state","vibrator","MainService", "$interval", "$timeout",
	 function($scope, $rootScope, $state,vibrator,mainService, $interval, $timeout) {

		$scope.availableRooms = $rootScope.houses[$rootScope.houseIndex].getAllRoomNames();
		 $scope.types = ["Radio", "Datei"];
		 $scope.albums = ["Album 1", "Album 2", "Album 3"];
		 $scope.radios = ["Radio 1", "Radio 2", "Radio 3", "Radio 4", "Radio 5"];
		 $scope.songs = [
			 ["A1 - Song 1", "A1 - Song 2", "A1 - Song 3", "A1 - Song 4", "A1 - Song 5"],
			 ["A2 - Song 1", "A2 - Song 2", "A2 - Song 3", "A2 - Song 4", "A2 - Song 5"],
			 ["A3 - Song 1", "A3 - Song 2", "A3 - Song 3", "A3 - Song 4", "A3 - Song 5"]
		 ];

		$scope.playLists = [
			{id: 0, settings: [1,1,1,1,2,30,20], rooms: ["Küche", "Wohnzimmer"], timeoutId: null},
			{id: 1, settings: [0,0,1,1,2,35,25], rooms: ["Garten", "Garage"], timeoutId: null}
		];

		 $timeout(function(){
			 for(var playlistIndex in $scope.playLists) {
				var rooms = $scope.playLists[playlistIndex].rooms;
				 for(var room in rooms) {
					 var index = rooms.indexOf(rooms[room]);
					 $scope.availableRooms.splice(index, 1);
				 }
			 }
		 });


		 $scope.playRadio = function($index){
			 $scope.playLists[$index].settings[0] = 0;
		 };

		 $scope.playDatei = function($index){
			 $scope.playLists[$index].settings[0] = 1;
		 };

		 $scope.addPlayList = function(){
			 var id = $scope.playLists.length;
			 var newPlaylist = {id: id, settings: [1,1,1,1,2,30,20], rooms: [], timeoutId: null};
			 $scope.playLists.push(newPlaylist);
		 };

		 $scope.deletePlayList = function($index){
			 $scope.playLists.splice($index, 1);
		 };
	 }]);
