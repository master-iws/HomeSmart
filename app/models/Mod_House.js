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

	
	this.getRoomById = function(roomId) {
		var rooms = this.getRooms();
		
		for(var r in rooms)
		{
			if(rooms[r].getId() == roomId)
				return rooms[r];
		}
		return undefined;
	};
	
	this.getComponentById = function(componentId) {
		
		var rooms = this.getRooms();
		
		for(var r in rooms)
		{
			var room = rooms[r];
			
			for(var c in room.getComponents())
			{
				var component = room.getComponents()[c];
				
				if(component.getId() == componentId)
					return component;
			}
		}
		
		for(var c in this.getComponents())
		{
			var component = this.getComponents()[c];
			
			if(component.getId() == componentId)
				return component;
		}
		
		return undefined;
	}
	
	this.setRoomById = function(roomId,room) {
		var rooms = this.getRooms();
		
		for(var r in rooms)
		{
			if(rooms[r].getId() == roomId)
				rooms[r]=room;
		}
	}
	
	this.getFloorById = function(floorId) {
		var floors = this.getFloors();
		
		for(var f in floors)
		{
			if(floors[f].getId() == floorId)
				return floors[f];
		}
		return undefined;
	}
	
	this.updateRoom = function(roomId, room) {
		var rooms = this.getRooms();
		
		for(var r in rooms)
		{
			if(rooms[r].getId() == roomId)
				rooms[r] = room;
		}
	}
	
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

	this.removeComponent = function(component) {
	    if(!(component instanceof Mod_Component || this.checkNum(component))) {
		throw new TypeError();
	    }
	    for(var comp in _components){
		if(_components[comp].getId() === component || _components[comp].getId() === component.getId()){
		    _components = _components.splice(comp,1);
		}
	    }
	};

	this.addFloor = function(floor) {
	    if(!(floor instanceof Mod_Floor)) {
		throw new TypeError();
	    }
	    _floors.push(floor);
	};

	this.removeFloor = function(floor) {
	    if(!(floor instanceof Mod_Floor || this.checkNum(floor))) {
		throw new TypeError();
	    }
	    for(var f in _floors){
		if(_floors[f].getId() === floor || _floors[f].getId() === floor.getId()){
		    _floors = _floors.splice(f,1);
		}
	    }
	};
	
	this.setFloors = function(floors) {
	    this._floors = floors;
	};
	
	this.setComponents = function(components) {
	    this._components = components;
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
		var comp = new Mod_Component();
		comp.parseJSON(json["components"][id],this,serv_components);
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
	this.isConfigured= function () {
		  
		if(this.getFloors().length == 0)
			return false;
		
		for(var f in this.getFloors())
		{
			if(!this.getFloors()[f].isConfigured())
				return false;
		}
		
		return true;
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
	this.getSetDescription= function (value) {
		  if (angular.isDefined(value)) {
		    this.setDescription(value);
		  } else {        
		    return this.getDescription();
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
		  
		var categorys = [];
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
     * @author Matthias Jakob
     */
    this.getAllCategories = function() {
	    var categories = [];
	    var floors = this.getFloors();
	    for (var f in floors) {
		    var rooms = floors[f].getRooms();
		    for(var r in rooms)
		    {
			    var components = rooms[r].getComponents();
			    for(var c in components)
			    {
				    if(categories.indexOf(components[c].getCategory()) == -1) {
					    categories.push(components[c].getCategory());
				    }
			    }
		    }
	    }
	    var houseComponents = this.getComponents();
	    for(var ch in houseComponents)
	    {
		    if(categories.indexOf(houseComponents[ch].getCategory()) == -1) {
			    categories.push(houseComponents[ch].getCategory());
		    }
	    }
	    return categories;
    };

    /**
     * @author Matthias Jakob
     */
    this.getAllComponentsByCategorySortByRoom = function(categoryId) {
	    var allComponents = {};
	    var floors = this.getFloors();
	    for (var f in floors) {
		    var rooms = floors[f].getRooms();
		    for(var r in rooms)
		    {
			    var components = rooms[r].getComponents();
			    for(var c in components)
			    {
				    if(components[c].getCategory().getId() == categoryId) {
					   /* if (allComponents.indexOf(components[c].getRoom().getName()) == -1) {
						    allComponents.push(components[c].getRoom().getName());
					    }
					    allComponents[components[c].getRoom().getName()].push(components[c]);*/
					    var roomName = components[c].getRoom().getName();
					    if(!allComponents.hasOwnProperty(roomName)) {
						    allComponents[roomName] = [];
					    }
					    allComponents[roomName].push(components[c]);
				    }
			    }
		    }
	    }
	    var houseComponents = this.getComponents();
	    for(var ch in houseComponents)
	    {
		    if(houseComponents[ch].getCategory().getId() == categoryId) {
			    if(!allComponents.hasOwnProperty('Haus')) {
				    allComponents['Haus'] = [];
			    }
			    allComponents['Haus'].push(houseComponents[ch]);
		    }
	    }
	    return allComponents;
    };

    /**
     * @author Matthias Jakob
     */
    this.getAllComponentsByCategory = function() {
	    var allComponents = {};
	    var components = this.getComponents();
	    for(var c in components)
	    {
		    var categoryName = components[c].getCategory().getName();
		    if(!allComponents.hasOwnProperty(categoryName)) {
			    allComponents[categoryName] = [];
		    }
		    allComponents[categoryName].push(components[c]);
	    }
	    return allComponents;
    };
	    
    /**
     * @author Matthias Jakob
     */
    this.getCategoryById = function(categoryId) {
	    var categories = this.getAllCategories();

	    for(var c in categories)
	    {
		    if(categories[c].getId() == categoryId)
			    return categories[c];
	    }
	    return undefined;
    };
	
	/**
	 * @author Julia Thüroff
	 */
	this.setLight= function (value) {
		  
		this.setComponentsOfCategoryToValue("Beleuchtung", value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setShadowing= function (value) {
		  
		this.setComponentsOfTypeToValue(37, value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setConsumer= function (value) {
		  
		this.setComponentsOfTypeToValue(21, value);
		this.setComponentsOfTypeToValue(14, value);
		this.setComponentsOfTypeToValue(15, value);
		this.setComponentsOfTypeToValue(16, value);
		this.setComponentsOfTypeToValue(18, value);
		this.setComponentsOfTypeToValue(19, value);
		this.setComponentsOfTypeToValue(8, value);
		
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setComponentsOfTypeToValue= function (typ, value) {
		  
		var categorys = []
	    for (var f in _floors) {
	    	var rooms = _floors[f].getRooms();
	    	for(var r in rooms)
	    	{
	    		var components = rooms[r].getComponents();
	    		for(var c in components)
	    		{
	    			if(components[c].getType() === type )
	    				components[c].getSettings()[0]=value;
	    		}
	    	}
	    }
		
		var components = this.getComponents();
		for(var c in components)
	    {
			if(components[c].getType() === type )
				components[c].getSettings()[0]=value;
	    }	
		
		//
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
		
		var components = this.getComponents();
		for(var c in components)
	    {
			if(components[c].getCategory().getName() === category )
				components[c].getSettings()[0]=value;
	    }	
	};
	
	this.getDataset = function(typ,startDate)
	{
		var response = {};
		response.dataset = [];
		response.label = [];
		
		// je nach typ generieren lassen
		if(typ === 'year')
		{
			response.dataset.push({x: new Date(startDate.year(),startDate.month(),startDate.date(),startDate.minute(),startDate.second(),startDate.millisecond())});
			for(var i=0; i < 11; i++)
			{
				var date = startDate.add(1,'month');
				if(date <= moment())
					response.dataset.push({x: new Date(date.year(),date.month(),date.date(),0,0,0,0)});
			}
		}
		
		if(typ === 'month')
		{
			response.dataset.push({x: new Date(startDate.year(),startDate.month(),startDate.date(),startDate.minute(),startDate.second(),startDate.millisecond())});
			var beginMonth = startDate.month();
			for(var i=0; i < 31; i++)
			{
				var date = startDate.add(1,'days');
				if(date.month() === beginMonth && date <= moment())
					response.dataset.push({x: new Date(date.year(),date.month(),date.date(),0,0,0,0)});
				
			}
		}
		
		if(typ === 'day')
		{
			response.dataset.push({x: new Date(startDate.year(),startDate.month(),startDate.date(),startDate.minute(),startDate.second(),startDate.millisecond())});
			for(var i=0; i < 24; i++)
			{
				var date = startDate.add(1,'hours');
				console.log(date.format());
				if(date <= moment())
				{
					console.log("Added:"+date.format())
					response.dataset.push({x: new Date(date.year(),date.month(),date.date(),date.hour(),0,0,0)});
				}
			}
		}
		return response;
	}
	
	this.getEnergyData = function(typ, startDate)
	{
		var response = this.getDataset(typ,startDate);
		for(var r in this.getRooms())
		{
			var roomCount =0;
			var room = this.getRooms()[r];
			var cCount = 0;
			
			for(var c in room.getComponents())
			{
				if(room.getComponents()[c].getType() == 21 || room.getComponents()[c].getType() == 22 )
					cCount++;
			}
			
			for(var d in response.dataset)
			{
				var name = "series_"+r;
				//if(response.dataset[d].x <= new Date())
				//{
				if(typ === "year")
					response.dataset[d][name] = Math.round((Math.random() * (125 - 120) + 120)*cCount);
				else if(typ === "month")
					response.dataset[d][name] = Math.round((Math.random() * (4 - 3.5) + 3.5)*100*cCount)/100;
				else if(typ === "day")
					response.dataset[d][name] = Math.round((Math.random() * (170 - 150) + 150)*100*cCount)/100;
				//}	;
			}
			response.label.push(room.getName());
			
		}
		return response;
	};
	
	this.getPvData = function(typ, startDate)
	{
		var response = this.getDataset(typ,startDate);
		
		
			for(var d in response.dataset)
			{
				var name = "series_0";
				//if(response.dataset[d].x <= new Date())
				//{
				if(typ === "year")
					response.dataset[d][name] = Math.round((Math.random() * (5 - 3.5) + 3.5));
				else if(typ === "month")
					response.dataset[d][name] = Math.round((Math.random() * (140 - 120) + 120)*100)/100;
				else if(typ === "day")
					response.dataset[d][name] = Math.round((Math.random() * (6 - 5) + 5)*100)/100;
				//}	
			}
			response.label.push("PV-Anlage");
			
		return response;
	};
	
	this.getWaterData = function(typ, startDate)
	{
		var response = this.getDataset(typ,startDate);
		
		for(var r in this.getRooms())
		{
			var roomCount =0;
			var room = this.getRooms()[r];
			var cCount = 0;
			
			for(var c in room.getComponents())
			{
				if(room.getComponents()[c].getType() == 23 )
					cCount++;
			}
			
			for(var d in response.dataset)
			{
				var name = "series_"+r;
				//if(response.dataset[d].x <= new Date())
				//{
				if(typ === "year")
					response.dataset[d][name] = Math.round((Math.random() * (125 - 120) + 120)*cCount);
				else if(typ === "month")
					response.dataset[d][name] = Math.round((Math.random() * (4 - 3.5) + 3.5)*100*cCount)/100;
				else if(typ === "day")
					response.dataset[d][name] = Math.round((Math.random() * (170 - 150) + 150)*100*cCount)/100;
				//}	
			}
			response.label.push(room.getName());
			
		}
		return response;
	};
	
    }

