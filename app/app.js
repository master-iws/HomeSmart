'use strict';

var app = angular.module("HomeSmart", ["ng", "ui.router", "ui.router.title"]);

app.run(function ($rootScope, $state, $stateParams, $log) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){
			$log.info(new Date(), fromState.name +" -> "+ toState.name);
		});
});

//Debugging events
app.config(['$provide', function ($provide) {
	$provide.decorator('$rootScope', function ($delegate) {
		var _emit = $delegate.$emit;
		var _broadcast = $delegate.$broadcast;

		$delegate.$emit = function () {
			console.debug("[$emit] " + arguments[0], arguments);
			return _emit.apply(this, arguments);
		};

		$delegate.$broadcast = function () {
			console.debug("[$broadcast] " + arguments[0], arguments);
			return _broadcast.apply(this, arguments);
		};

		return $delegate;
	});
}]);

app.config(
	['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");

	$stateProvider.state("index", {
			url: "/",
			resolve: {
				$title: function() { return 'index'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.index.htm"},
				"Content": { templateUrl: "app/views/content/index.htm", controller: 'LandingController'}
			}
		}).state("houses", {
			url: "/houses",
			resolve: {
				$title: function() { return 'Home'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm", controller: 'HousesController'}
			}
		}).state("houses.floors", {
			url: "/floors",
			resolve: {
				$title: function() { return 'Etagen'; }
			},			
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm"}
			}
		}).state("houses.floors.detail", {
			url: "/:floorId",
			resolve: {
				$title: ['$stateParams', function($stateParams) {
					return "Etage: " + $stateParams.floorId;
				}]
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm"}
			}
		}).state("houses.floors.detail.room", {
			url: "/:roomId",
			resolve: {
				$title: ['$stateParams', function($stateParams) {
					return "Raum: " + $stateParams.roomId;
				}]
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm"}
			}
		}).state("settings", {
			url: "/settings/",
			resolve: {
				$title: function() { return 'Einstellungen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.settings.htm"},
				"Content": { templateUrl: "app/views/content/settings.htm"}
			}
		}).state("settings.pin", {
			url: "pin",
			resolve: {
				$title: function() { return 'PIN ändern'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.settings.htm"},
				"SettingsContent": { templateUrl: "app/views/content/changeAdminPin.htm", controller: 'RegistrationController'}
			}
		}).state("settings.houses", {
			url: "houses",
			resolve: {
				$title: function() { return 'Häuser'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.settings.htm"},
				"SettingsContent": { templateUrl: "app/views/content/houseSettings.htm", controller: 'HousesSettingsController'}
			}
		}).state("houseconfiguration", {
			url: "/houseconfiguration/",
			resolve: {
				$title: function() { return 'Hauskonfiguration'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"Content": { templateUrl: "app/views/content/wlan.htm", controller: 'WLANController'}
			}
		}).state("houseconfiguration.wlan", {
			url: "wlan",
			resolve: {
				$title: function() { return 'WLAN'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"Content": { templateUrl: "app/views/content/wlan.htm", controller: 'WLANController'}
			}
		});
	}]
);
