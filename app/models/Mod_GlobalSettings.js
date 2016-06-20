/**
 * @author René Lottes
 */

'use strict';

app.factory("Mod_GlobalSettings",function () {
    return Mod_GlobalSettings;
});
    function Mod_GlobalSettings() {

	var _adminPin;
	var _user;
	var _dashboard;
	var _server;


	/*
	 * getter
	 */

	this.getAdminPin = function() {
	    return _adminPin;
	};

	this.getUser = function() {
	    return _user;
	};

	this.getDashboard = function() {
	    return _dashboard;
	};
	
	this.getServer = function() {
	    return _server;
	};

	/*
	 * setter
	 */

	this.setAdminPin = function(adminPin) {
	    _adminPin = adminPin;
	    
	};

	this.setUser = function(user) {
	    _user = user;
	};

	this.setDashboard = function(dashboard) {
	    _dashboard = dashboard;
	};
	
	this.setServer = function(server) {
	    _server = server;
	};
	
	

	this.toJSON = function() {
	    var json = {
		"adminPin":this.getAdminPin(),
		"user":this.getUser(),
		"dashboard":this.getDashboard(),
		"server":this.getServer()
	    };

	    return json;
	};
	
	this.parseJSON = function(json) {
	    this.setAdminPin(json["adminPin"]);
	    this.setUser(json["user"]);
	    this.setDashboard(json["dashboard"]);
	    this.setServer(json["server"]);
	};

    }
    