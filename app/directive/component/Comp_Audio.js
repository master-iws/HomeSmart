/**
 * @author Matthias Jakob
 */
app.directive('compAudio', function($timeout, $interval) {

	function link(scope, element, attrs) {

		scope.timeoutId = null;
		scope.isOpenAccordion = false;
		scope.titlePlayed = "";
		scope.componentId = scope.component.getId();
		scope.componentName = scope.component.getName();
		scope.volume = scope.component.getSetSettings()[6];
		scope.types = ["Radio", "Datei"];
		scope.albums = ["Album 1", "Album 2", "Album 3"];
		scope.radios = ["Radio 1", "Radio 2", "Radio 3", "Radio 4", "Radio 5"];
		scope.songs = [
			["A1 - Song 1", "A1 - Song 2", "A1 - Song 3", "A1 - Song 4", "A1 - Song 5"],
			["A2 - Song 1", "A2 - Song 2", "A2 - Song 3", "A2 - Song 4", "A2 - Song 5"],
			["A3 - Song 1", "A3 - Song 2", "A3 - Song 3", "A3 - Song 4", "A3 - Song 5"]
		];

		$timeout(function() {
			// Select
			if(scope.component.getSetSettings()[1] == 0) {
				$('#selectAlbum-' + scope.componentId).hide();
				$('#selectSong-' + scope.componentId).hide();
				$('#songLength-' + scope.componentId).hide();
				$('#selectRadio-' + scope.componentId).show();
			} else {
				$('#selectAlbum-' + scope.componentId).show();
				$('#selectSong-' + scope.componentId).show();
				$('#songLength-' + scope.componentId).show();
				$('#selectRadio-' + scope.componentId).hide();
			}

			// Play pause button
			if(scope.component.getSetSettings()[0] == 0) {
				$('#statusInfo-' + scope.componentId).hide();
				$('#iconPlayPause-' + scope.componentId).removeClass("fa-pause").addClass("fa-play");
				$('#playPauseButton-' + scope.componentId).removeClass("btn-success").addClass("btn-primary");
			} else {
				if(scope.component.getSetSettings()[1] == 0) {
					scope.titlePlayed = scope.radios[scope.component.getSetSettings()[2]];
				} else {
					scope.titlePlayed = scope.albums[scope.component.getSetSettings()[3]] + " : " + scope.songs[scope.component.getSetSettings()[3]][scope.component.getSetSettings()[4]];
				}
				$('#statusInfo-' + scope.componentId).html("Es läuft gerade: \"" + scope.titlePlayed + "\"");
				$('#iconPlayPause-' + scope.componentId).removeClass("fa-play").addClass("fa-pause");
				$('#playPauseButton-' + scope.componentId).removeClass("btn-primary").addClass("btn-success");

			}

			// Time
			var time = scope.component.getSetSettings()[5];
			var seconds = time % 60;
			var minutes = (time - seconds) / 60;
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			var text = "&nbsp;&nbsp;" + minutes + ":" + seconds + " / 3:00";
			$('#time-' + scope.componentId).html(text);

			// TimeIntervall
			if(scope.component.getSetSettings()[0] == 1 && scope.component.getSetSettings()[1] == 1) {
				scope.timeoutId = $interval(function () {
					scope.component.getSetSettings()[5]++;
				}, 1000);
			}
		});
	}

	return {
		scope: {
			component: '=component'
		},
		transclude: true,
		templateUrl: 'app/views/component/audio.htm',
		link: link,
		controller: ['$scope', '$state', function($scope, $state) {

			$scope.startInterfal = function() {
				$scope.timeoutId = $interval(function() {
					$scope.component.getSetSettings()[5]++;
				}, 1000);
			};

			$scope.stopInterval = function() {
				$interval.cancel($scope.timeoutId);
			};

			$scope.configureComponent = function () {
				$state.go("houseconfiguration.house.editComponent", {'componentIdx':$scope.componentId});
			};

			$scope.$watch('component.getSetSettings()[1]', function(){
				if($scope.component.getSetSettings()[1] == 0) {
					$('#selectAlbum-' + $scope.componentId).hide();
					$('#selectSong-' + $scope.componentId).hide();
					$('#songLength-' + $scope.componentId).hide();
					$('#selectRadio-' + $scope.componentId).show();
				} else {
					$scope.stopInterval();
					$scope.component.getSetSettings()[0] = 0;
					$('#iconPlayPause-' + $scope.componentId).removeClass("fa-pause").addClass("fa-play");
					$('#playPauseButton-' + $scope.componentId).removeClass("btn-success").addClass("btn-primary");
					$('#selectAlbum-' + $scope.componentId).show();
					$('#selectSong-' + $scope.componentId).show();
					$('#songLength-' + $scope.componentId).show();
					$('#selectRadio-' + $scope.componentId).hide();
				}
				$scope.updateTitlePlayed();
			});

			// Time
			$scope.$watch('component.getSetSettings()[5]', function(){
				if($scope.component.getSetSettings()[5] == 180) {
					$scope.nextAudio();
				} else {
					var time = $scope.component.getSetSettings()[5];
					var seconds = time % 60;
					var minutes = (time - seconds) / 60;
					if (seconds < 10) {
						seconds = "0" + seconds;
					}
					var text = "&nbsp;&nbsp;" + minutes + ":" + seconds + " / 3:00";
					$('#time-' + $scope.componentId).html(text);
				}
			});

			$scope.previousAudio = function () {
				if($scope.component.getSetSettings()[1] == 0) { //Radio
					if($scope.component.getSetSettings()[2] > 0) {
						$scope.component.getSetSettings()[2]--;
					} else {
						$scope.component.getSetSettings()[2] = $scope.radios.length-1;
					}
				} else { //Song
					$scope.component.getSetSettings()[5] = 0;
					if($scope.component.getSetSettings()[4] > 0) {
						$scope.component.getSetSettings()[4]--;
					} else {
						if($scope.component.getSetSettings()[3] > 0) { // Check Album
							$scope.component.getSetSettings()[3]--;
							$scope.component.getSetSettings()[4] = $scope.songs[$scope.component.getSetSettings()[3]].length-1;
						}
					}
				}
				$scope.updateTitlePlayed();
			};

			$scope.nextAudio = function () {
				if($scope.component.getSetSettings()[1] == 0) { //Radio
					if($scope.component.getSetSettings()[2] < $scope.radios.length-1) {
						$scope.component.getSetSettings()[2]++;
					} else {
						$scope.component.getSetSettings()[2] = 0;
					}
				} else { //Song
					$scope.component.getSetSettings()[5] = 0;
					if($scope.component.getSetSettings()[4] < $scope.songs[$scope.component.getSetSettings()[3]].length-1) {
						$scope.component.getSetSettings()[4]++;
					} else {
						if($scope.component.getSetSettings()[3] < $scope.albums.length-1) { // Check Album
							$scope.component.getSetSettings()[3]++;
							$scope.component.getSetSettings()[4] = 0;
						} else {
							$scope.component.getSetSettings()[3] = 0;
							$scope.component.getSetSettings()[4] = 0;
						}
					}
				}
				$scope.updateTitlePlayed();
			};

			$scope.selectType = function () {
				if($scope.component.getSetSettings()[1] == 0) {
					$scope.stopInterval();
				} else {
					if($scope.component.getSetSettings()[0] == 1) {
						$scope.startInterfal();
					}
				}
				$scope.updateTitlePlayed();
			};

			$scope.selectAlbum = function () {
				$scope.component.getSetSettings()[5] = 0;
				$scope.component.getSetSettings()[4] = 0;
				$scope.updateTitlePlayed();
			};

			$scope.selectSong = function () {
				$scope.component.getSetSettings()[5] = 0;
				$scope.updateTitlePlayed();
			};

			// Play pause
			$scope.playPause = function(){
				if($scope.component.getSetSettings()[0] == 0) {
					$scope.component.getSetSettings()[0] = 1;
					$scope.startInterfal();
					$('#iconPlayPause-' + $scope.componentId).removeClass("fa-play").addClass("fa-pause");
					$('#playPauseButton-' + $scope.componentId).removeClass("btn-primary").addClass("btn-success");
				} else {
					$scope.stopInterval();
					$scope.component.getSetSettings()[0] = 0;
					$('#iconPlayPause-' + $scope.componentId).removeClass("fa-pause").addClass("fa-play");
					$('#playPauseButton-' + $scope.componentId).removeClass("btn-success").addClass("btn-primary");
				}
				$scope.updateTitlePlayed();
			};

			$scope.mute = function() {
				if($scope.component.getSetSettings()[6] == 0) {
					$("#mute-"+ $scope.componentId).css('background-color', 'white');
					$scope.component.getSetSettings()[6] = $scope.volume;
				} else {
					$scope.volume = $scope.component.getSetSettings()[6];
					$("#mute-"+ $scope.componentId).css('background-color', 'red');
					$scope.component.getSetSettings()[6] = 0;
				}
			};

			$scope.updateTitlePlayed = function() {
				if($scope.component.getSetSettings()[0] == 0) {
					$('#statusInfo-' + $scope.componentId).hide();
				} else {
					if($scope.component.getSetSettings()[1] == 0) {
						$scope.titlePlayed = $scope.radios[$scope.component.getSetSettings()[2]];
					} else {
						$scope.titlePlayed = $scope.albums[$scope.component.getSetSettings()[3]] + " : " + $scope.songs[$scope.component.getSetSettings()[3]][$scope.component.getSetSettings()[4]];
					}
					$('#statusInfo-' + $scope.componentId).html("Es läuft gerade: \"" + $scope.titlePlayed + "\"").show();
				}
			};
		}]
	};
});