'use strict';

var app = angular.module('HomeSmart', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("index");
	
	$stateProvider.state("index", {
			url: "",
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.index.htm"},
				"Nav2": { templateUrl: "app/views/nav/nav2.index.htm"},
				"Content": { templateUrl: "app/views/content/index.htm"}
			}
		}).state("houses", {
			url: "/houses",
			views: {
				"Nav1": { templateUrl: "app/views/nav/nav1.houses.htm"},
				"Nav2": { templateUrl: "app/views/nav/nav2.houses.htm"},
				"Content": { templateUrl: "app/views/content/houses.htm"}
			}
		});
	}
);
