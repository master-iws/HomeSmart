/**
 * @author René Lottes
 */

'use strict';

app.factory("Mod_House",["Mod_Abstract_Entity","$injector",
    function (Mod_Abstract_Entity,$injector) {
	
//	var Mod_Component = $injector.get("Mod_Component");
//	var Mod_Floor = $injector.get("Mod_Floor");
	
    return Mod_House;
}]);
    function Mod_House() {

	Mod_Abstract_Entity.call(this);

	var _zip='',
	    _city='',
	    _components = [],
	    _floors = [],
	    _dashboard={},
	    _wlan={};
	this.city='';
	
	_wlan.ssid='';
	_wlan.password = '';
	_dashboard.quicklinks = [];
	_dashboard.controls = [];

	/*
	 * getter
	 */

	this.getZip = function() {
	    return _zip;
	};

	this.getCity = function() {
	    return this.city;
	};
	
	this.getWlan = function() {
	    return _wlan;
	};

	this.getComponents = function() {
	    return _components;
	};

	this.getFloors = function() {
	    return _floors;
	};
	
	this.getDashboard = function() {
	    return _dashboard;
	};
	
	this.getRooms = function() {
	    var rooms = []
	    for (var f in _floors) {
		rooms = rooms.concat(_floors[f].getRooms());
	    }
	    return rooms;
	};

	/*
	 * setter
	 */

	this.setZip = function(zip) {
	    if(this.checkStr(zip)) {
		_zip = zip;
	    } else {
		throw new TypeError();
	    }
	};

	this.setCity = function(city) {
		this.city = city;
	    if(this.checkStr(city)) {
		_city = city;
	    } else {
		throw new TypeError();
	    }
	};
	
	this.setDashboard = function(dashboard) {
	    _dashboard = dashboard;
	};
	
	this.setWlan = function(wlan) {
	    _wlan = wlan;
	};

	this.addComponent = function(component) {
	    if(!(component instanceof Mod_Component)) {
		throw new TypeError();
	    }
	    _components.push(component);
	};

	//TODO: remove dosen't work!
	this.removeComponent = function(component) {
	    if(!(component instanceof Mod_Component || this.checkNum(component))) {
		throw new TypeError();
	    }
	    _components = _components.splice(_components.indexOf(component),1);
	};

	this.addFloor = function(floor) {
	    if(!(floor instanceof Mod_Floor)) {
		throw new TypeError();
	    }
	    _floors.push(floor);
	};

	//TODO: remove dosen't work!
	this.removeFloor = function(floor) {
	    if(!(floor instanceof Mod_Floor || this.checkNum(floor))) {
		throw new TypeError();
	    }
	    _floors = _floors.splice(_floors.indexOf(floor),1);
	};

	this.toJSON = function() {
	    var json = {
		"id":this.getId(),
		"name":this.getName(),
		"description":this.getDescription(),
		"zip":this.getZip(),
		"city":this.getCity(),
		"components":this.getComponents(),
		"floors":this.getFloors(),
		"dashboard": this.getDashboard(),
		"wlan": this.getWlan()
	    };

	    return json;
	};
	
	this.parseJSON = function(json,serv_components) {
	    if(serv_components === undefined || serv_components === null) {
		throw new Error("This function cannot be called independently!");
	    }
	    
	    this.setId(json["id"]);
	    this.setName(json["name"]);
	    this.setDescription(json["description"]);
	    
	    this.setZip(json["zip"]);
	    this.setCity(json["city"]);
	    
	    this.setDashboard(json["dashboard"]);
	    
	    this.setWlan(json["wlan"]);
	    
	    for(var id in json["components"]){
		var comp = serv_components.getComponentById(json["components"][id].id);
		comp.setHouse(this);
		comp.setRoom(null);
		this.addComponent(comp);
	    }
	    
	    for(var id in json["floors"]){
		var floor = new Mod_Floor();
		floor.parseJSON(json["floors"][id],this,serv_components);
		this.addFloor(floor);
	    }
	    
	};

	/**
	 * @author Julia Thüroff
	 */
	this.getSetName= function (value) {
		  if (angular.isDefined(value)) {
		    this.setName(value);
		  } else {        
		    return this.getName();
		  }
	
    };
    /**
	 * @author Julia Thüroff
	 */
	this.getSetCity= function (value) {
		  if (angular.isDefined(value)) {
		    _city=value;
		  } else {        
		    return _city;
		  }
	
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.getUsedCategorys= function () {
		  
		var categorys = []
	    for (var f in _floors) {
	    	var rooms = _floors[f].getRooms();
	    	for(var r in rooms)
	    	{
	    		var components = rooms[r].getComponents();
	    		for(var c in components)
	    		{
	    			if(categorys.indexOf(components[c].getCategory()) == -1)
	    				categorys.push(components[c].getCategory());
	    		}
	    	}
	    }
		
		for(var c in this.getComponents())
	    {
			if(categorys.indexOf(components[c].getCategory()) == -1)
				categorys.push(components[c].getCategory());
	    }
		
		
	    return categorys;
	
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setLight= function (value) {
		  
		this.setComponentsOfCategoryToValu("Beleuchtung", value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setShadowing= function (value) {
		  
		this.setComponentsOfCategoryToValu("Beschattung", value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setConsumer= function (value) {
		  
		this.setComponentsOfCategoryToValu("Verbraucher", value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setComponentsOfCategoryToValue= function (category, value) {
		  
		var categorys = []
	    for (var f in _floors) {
	    	var rooms = _floors[f].getRooms();
	    	for(var r in rooms)
	    	{
	    		var components = rooms[r].getComponents();
	    		for(var c in components)
	    		{
	    			if(components[c].getCategory().getName() === category )
	    				components[c].getSettings()[0]=value;
	    		}
	    	}
	    }
		
		for(var c in this.getComponents())
	    {
			if(components[c].getCategory().getName() === category )
				components[c].getSettings()[0]=value;
	    }	
	};
	
    }

