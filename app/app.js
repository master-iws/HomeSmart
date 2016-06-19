'use strict';
var app = angular.module("HomeSmart", ["ng", "ui.router", "ui.router.title","autocomplete","n3-line-chart","ngToast","ngAnimate","ui.bootstrap","angular-vibrator",angularDragula(angular)]);

app.run(function ($rootScope, $state, $stateParams, $log) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){
			$log.info(new Date(), fromState.name +" -> "+ toState.name);
		});
	
	$rootScope.$on('$stateChangeStart', 
			function(event, toState, toParams, fromState, fromParams){
		
			/*if (toState.authenticate && !$rootScope.loggedIn){
			      // User isn’t authenticated
			      console.log(toState);
					$state.go("login",{name: toState.name});
			      event.preventDefault(); 
		    }*/
				
			/*if (toState.adminArea && (!fromState.adminArea && fromState.name != "loginAdminArea")){
			      // User isn’t authenticated
				  $state.go("loginAdminArea",{name: toState.name});
			      event.preventDefault(); 
		  	}*/
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
	
	//$urlRouterProvider.otherwise("/");

	$stateProvider.state("index", {
			url: "/",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'index'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.index.htm"},
				"Content": { templateUrl: "app/views/content/index.htm", controller: 'LandingController'}
			}
		}).state("houses", {
			url: "/houses",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Home'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm", controller: 'HousesController'}
			}
		}).state("houses.floors", {
			url: "/floors",
			authenticate: true,
			adminArea: false,
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
			authenticate: true,
			adminArea: false,
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
			authenticate: true,
			adminArea: false,
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
			authenticate: true,
			adminArea: true,
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
			authenticate: true,
			adminArea: true,
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
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Häuser'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.settings.htm"},
				"SettingsContent": { templateUrl: "app/views/content/housesSettings.htm", controller: 'HousesSettingsController'}
			}
		}).state("settings.addHouse", {
			url: "addHouse",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Häuser'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.settings.htm"},
				"SettingsContent": { templateUrl: "app/views/content/addHouse.htm", controller: 'AddHouseController'}
			}
		}).state("houseconfiguration", {
			url: "/houseconfiguration/",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Hauskonfiguration'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"Content": { templateUrl: "app/views/content/houseconfiguration.htm"}
			}
		}).state("houseconfiguration.wlan", {
			url: "wlan",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'WLAN'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"HouseConfigurationContent": { templateUrl: "app/views/content/wlan.htm", controller: 'WLANController'}
			}
		}).state("houseconfiguration.floors", {
			url: "floors",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Etagen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"HouseConfigurationContent": { templateUrl: "app/views/content/floorsHouseConfiguration.htm", controller: 'FloorsHouseConfigurationController'}
			}
		}).state("houseconfiguration.floors.addFloor", {
			url: "/addFloor",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Etage anlegen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditFloor": { templateUrl: "app/views/content/editFloor.htm", controller: 'AddFloorController'}
			}
		}).state("houseconfiguration.floors.editFloor", {
			url: "/:floorId",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Etage bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditFloor": { templateUrl: "app/views/content/editFloor.htm", controller: 'EditFloorController'}
			}
		}).state("houseconfiguration.house", {
			url: "/house",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Haus konfigurieren'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"HouseConfigurationContent": { templateUrl: "app/views/content/editHouse.htm", controller: 'EditHouseController'}
			}
		}).state("houseconfiguration.rooms", {
			url: "rooms",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Räume'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"HouseConfigurationContent": { templateUrl: "app/views/content/roomsHouseConfiguration.htm", controller: 'RoomsHouseConfigurationController'}
			}
		}).state("houseconfiguration.rooms.addRoom", {
			url: "/add",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Raum erstellen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditRoom": { templateUrl: "app/views/content/editRoom.htm", controller: 'AddRoomController'}
			}
		}).state("houseconfiguration.rooms.editRoom", {
			url: "/:roomId",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Raum bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditRoom": { templateUrl: "app/views/content/editRoom.htm", controller: 'EditRoomController'}
			}
		}).state("houseconfiguration.dashboard", {
			url: "dashboard",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Dashboard'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"HouseConfigurationContent": { templateUrl: "app/views/content/dashboardHouseConfiguration.htm", controller: 'DashboardConfigurationController'}
			}
		}).state("houseconfiguration.dashboard.editQuicklink", {
			url: "/quicklinks/:quicklinkId",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Quicklink bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"DashboardConfigurationContent": { templateUrl: "app/views/content/editQuicklink.htm", controller: 'EditQuicklinkController'}
			}
		}).state("houseconfiguration.dashboard.addQuicklink", {
			url: "/quicklinks/add",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Quicklink hinzufügen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"DashboardConfigurationContent": { templateUrl: "app/views/content/editQuicklink.htm", controller: 'AddQuicklinkController'}
			}
		}).state("houseconfiguration.dashboard.editControl", {
			url: "/controls/:controls",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Kontrolleinheit bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"DashboardConfigurationContent": { templateUrl: "app/views/content/editControl.htm", controller: 'EditQuicklinkController'}
			}
		}).state("houseconfiguration.dashboard.addControl", {
			url: "/controls/add",
			auhtenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Kontrolleinheit hinzufügen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"DashboardConfigurationContent": { templateUrl: "app/views/content/editControl.htm", controller: 'AddControlController'}
			}
		}).state("login", {
			url: "/:name",
			auhtenticate: false,
			adminArea: false,
			resolve: {
				$title: function() { return 'Login'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Content": { templateUrl: "app/views/content/login.htm", controller: 'LoginController'}
			}
		}).state("loginAdminArea", {
			url: "/:name",
			auhtenticate: false,
			adminArea: false,
			resolve: {
				$title: function() { return 'Login zum Adminbereich'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Content": { templateUrl: "app/views/content/loginAdminArea.htm", controller: 'LoginAdminAreaController'}
			}
		}).state("alarmTest", {
			url: "/alarmTest",
			auhtenticate: false,
			adminArea: false,
			resolve: {
				$title: function() { return 'Testen der Alarme'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Content": { templateUrl: "app/views/content/alarmTest.htm", controller: 'AlarmTestController'}
			}
		});
	}]
);
