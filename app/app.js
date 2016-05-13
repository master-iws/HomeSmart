'use strict';

var app = angular.module("HomeSmart", ["ng", "ui.router", "ui.router.title"]);

//Debugging events
app.config(['$provide', function ($provide) {
	$provide.decorator('$rootScope', function ($delegate) {
		var _emit = $delegate.$emit;
		var _broadcast = $delegate.$broadcast;

		$delegate.$emit = function () {
			console.log("[$emit] " + arguments[0], arguments);
			return _emit.apply(this, arguments);
		};

		$delegate.$broadcast = function () {
			console.log("[$broadcast] " + arguments[0], arguments);
			return _broadcast.apply(this, arguments);
		};

		return $delegate;
	});
}]);

app.config(
	['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("index");
	
	$stateProvider.state("index", {
			url: "/",
			resolve: {
				title: function() { return 'index'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.index.htm"},
				"Nav2": { templateUrl: "app/views/nav/nav2.index.htm"},
				"Content": { templateUrl: "app/views/content/index.htm", controller: 'LandingController'}
			}
		}).state("houses", {
			url: "/houses",
			resolve: {
				$title: function() { return 'houses'; }
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.houses.htm"},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm", controller: 'HousesController'}
			}
		}).state("houses.floors", {
			url: "/floors",
			resolve: {
				$title: function() { return 'Floors'; }
			},			
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.houses.htm"},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm"}
			}
		}).state("houses.floors.detail", {
			url: "/:floorId",
			resolve: {
				$title: ['$stateParams', function($stateParams) {
					return "Floor: " + $stateParams.floorId;
				}]
			},
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.houses.htm"},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm"}
			}
		});
	}]
);
