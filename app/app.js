'use strict';
var app = angular.module("HomeSmart", ["ng", "ui.router", "ui.router.title","autocomplete",
					"n3-line-chart","ngToast","ngAnimate","ui.bootstrap",
					"angular-vibrator","ngAudio",angularDragula(angular),
					"ngTouch"]);

app.run(function ($rootScope, $state, $stateParams, $log) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	
	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){
			$log.info(new Date(), fromState.name +" -> "+ toState.name);
		});
	
	$rootScope.$on('$stateChangeStart', 
			function(event, toState, toParams, fromState, fromParams){
			    
			    $rootScope.previousState = fromState;
			    $rootScope.currentState = toState;
			    $rootScope.previousState.params = fromParams;
			    $rootScope.currentState.params = toParams;
		
			if(toState.name === 'settings')
			{
				$state.go("settings.pin");
				event.preventDefault();
			}
			
			if(toState.name === 'houseconfiguration')
			{
				$state.go("houseconfiguration.house");
				event.preventDefault();
			}
			
			if(toState.name === 'statistic')
			{
				$state.go("activities");
				event.preventDefault();
			}
		
			if (toState.authenticate && !$rootScope.loggedIn){
			      // User isn’t authenticated
				$state.go("login",{name: toState.name});
				event.preventDefault();
		    }
			
			if(toState.name === "login" && $rootScope.loggedIn){
				$state.go(toParams.name);
				event.preventDefault();
			}
				
			/*if((toState.name === "houses" || toState.name === "index") && $rootScope.houses.length == 1)
			{
				$state.go("dashboard");
				event.preventDefault();
			}*/
			
			/*console.log("adminarea:"+toState.adminArea+"from"+fromState.adminArea+"from"+fromState.name);
			if (toState.adminArea && (!fromState.adminArea && fromState.name !== "loginAdminArea")){
			      // User isn’t authenticated
				console.log("gotoadmin");
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
	
	$urlRouterProvider.otherwise("/");

	$stateProvider.state("index", {
			url: "/",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Home'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.index.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm", controller: 'MainController'}
			}
		}).state("houses", {
			url: "/houses",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Home'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.index.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm", controller: 'MainController'}
			}
		}).state("floors", {
			url: "/floors",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Etagen'; }
			},			
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/floors.htm", controller: 'FloorsController'}
			}
		}).state("floors.detail", {
			url: "/:floorId",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: ['$stateParams','$rootScope', function($stateParams,$rootScope) {
					var name = $rootScope.houses[$rootScope.houseIndex].getFloorById($stateParams.floorId).getName();
					return "Etage: " + name;
				}]
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"FloorContent": { templateUrl: "app/views/content/rooms.htm", controller: 'RoomsController'}
			}
		}).state("rooms", {
			url: "/rooms",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Räume'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/rooms.htm",controller: 'RoomsController'}
			}
		}).state("rooms.detail", {
			url: "/:roomId",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: ['$stateParams','$rootScope', function($stateParams,$rootScope) {
					var name = $rootScope.houses[$rootScope.houseIndex].getRoomById($stateParams.roomId).getName();
					return "Raum: " + name;
				}]
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"DetailsContent": { templateUrl: "app/views/content/room.htm", controller: 'RoomController'}
			}
		}).state("rooms.detail.heatingAutopilot", {
			url: "/heatingAutopilot/:componentId",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Autoppilot Heizung'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": {templateUrl: "app/views/nav/nav2.houses.htm"},
				"AutopilotContent": { templateUrl: "app/views/content/heatingAutopilot.htm", controller: 'HeatingAutopilotController'}
			}
		}).state("rooms.detail.coolingAutopilot", {
			url: "/coolingAutopilot/:componentId",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Autoppilot Heizung'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": {templateUrl: "app/views/nav/nav2.houses.htm"},
				"AutopilotContent": { templateUrl: "app/views/content/coolingAutopilot.htm", controller: 'CoolingAutopilotController'}
			}
		}).state("rooms.detail.addTimePeriod", {
			url: "/addTimePeriod",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Autoppilot Heizung'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": {templateUrl: "app/views/nav/nav2.houses.htm"},
				"AutopilotContent": { templateUrl: "app/views/content/addTimePeriod.htm", controller: 'AddTimePeriodController'}
			}
		}).state("dashboard", {
			url: "/dashboard",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Dashboard'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/dashboard.htm",controller: 'DashboardController'}
			}
		}).state("categorys", {
			url: "/categorys",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Kategorien'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/categorys.htm",controller: 'CategorysController'}
			}
		}).state("weather", {
			url: "/weather",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Kategorien'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/weather.htm",controller: 'WeatherController'}
			}
		}).state("statistic", {
			url: "/statistic",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Kategorien'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/statistic.htm",controller: 'StatisticController'}
			}
		}).state("activities", {
			url: "/activities",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Aktivitäten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/activity.htm",controller: 'ActivityController'}
			}
		}).state("powerconsumption", {
			url: "/powerconsumption",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Stromverbrauch'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/powerconsumption.htm",controller: 'PowerConsumptionController'}
			}
		}).state("pv", {
			url: "/pv",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'PV-Anlage'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/pvconsumption.htm",controller: 'PVController'}
			}
		}).state("water", {
			url: "/water",
			authenticate: true,
			adminArea: false,
			resolve: {
				$title: function() { return 'Wasserverbrauch'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/waterconsumption.htm",controller: 'WaterConsumptionController'}
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
				$title: function() { return 'Haus anlegen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.settings.htm"},
				"SettingsContent": { templateUrl: "app/views/content/addHouse.htm", controller: 'AddHouseController'}
			}
		}).state("houseconfiguration", {
			url: "/houseconfiguration",
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
			url: "/wlan",
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
			url: "/floors",
			authenticate: true,
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
			authenticate: true,
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
			authenticate: true,
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
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Haus konfigurieren'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"HouseConfigurationContent": { templateUrl: "app/views/content/editHouse.htm", controller: 'EditHouseController'}
			}
		}).state("houseconfiguration.house.addComponent", {
			url: "/component/add",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Komponente hinzufügen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"ComponentContent": { templateUrl: "app/views/content/addComponent.htm", controller: 'AddHouseComponentController'}
			}
		}).state("houseconfiguration.house.editComponent", {
			url: "/component/edit/:componentIdx",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Komponente bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"ComponentContent": { templateUrl: "app/views/content/editComponent.htm", controller: 'EditHouseComponentController'}
			}
		}).state("houseconfiguration.rooms", {
			url: "/rooms",
			authenticate: true,
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
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Raum erstellen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditRoom": { templateUrl: "app/views/content/addRoom.htm", controller: 'AddRoomController'}
			}
		}).state("houseconfiguration.rooms.editRoom", {
			url: "/edit/:roomId",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Raum bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditRoom": { templateUrl: "app/views/content/editRoom.htm", controller: 'EditRoomController'}
			}
		}).state("houseconfiguration.rooms.addComponent", {
			url: "/component/add/:roomId",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Komponente hinzufügen'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditRoom": { templateUrl: "app/views/content/addComponent.htm", controller: 'AddRoomComponentController'}
			}
		}).state("houseconfiguration.rooms.editComponent", {
			url: "/component/edit/:componentId",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Komponente bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"EditRoom": { templateUrl: "app/views/content/editComponent.htm", controller: 'EditRoomComponentController'}
			}
		}).state("houseconfiguration.dashboard", {
			url: "/dashboard",
			authenticate: true,
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
			url: "/quicklinks/edit/:quicklinkId",
			authenticate: true,
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
			authenticate: true,
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
			url: "/controls/edit/:controlId",
			authenticate: true,
			adminArea: true,
			resolve: {
				$title: function() { return 'Kontrolleinheit bearbeiten'; }
			},
			views: {
				"Nav1": {templateUrl: "app/views/nav/nav1.index.htm", controller: 'NavigationController'},
				"Nav2": { templateUrl: "app/views/nav/nav2.houseconfiguration.htm"},
				"DashboardConfigurationContent": { templateUrl: "app/views/content/editControl.htm", controller: 'EditControlController'}
			}
		}).state("houseconfiguration.dashboard.addControl", {
			url: "/controls/add",
			authenticate: true,
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
			authenticate: false,
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
			authenticate: false,
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
			authenticate: false,
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
